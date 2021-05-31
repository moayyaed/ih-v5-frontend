import React, { Component } from 'react';
import core from 'core';

import shortid from 'shortid';

import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

import 'xterm/css/xterm.css'

const isWindows = ['Windows', 'Win16', 'Win32', 'WinCE'].indexOf(navigator.platform) >= 0;

class Webconsole extends Component {

  componentDidMount() {
    this.uuid = shortid.generate();
    this.init = true;

    core.tunnel.sub({
      method: 'sub',
      uuid: this.uuid,
      unit: 'webconsole',
      type: 'transferdata',
    }, this.handleData);

    this.term = new Terminal({
      windowsMode: isWindows,
      fontSize: 15,
      fontFamily: 'Fira Code, courier-new, courier, monospace',
    });

    this.term.onResize((size) => {
      if (this.init) {
        this.init = null;
        this.send({ type: 'start', size })
      }
    });

    this.term.prompt = () => {
      this.term.write('\r\n$ ');
    };

    this.term.attachCustomKeyEventHandler(e => {
      if (e.key === 'v' && e.ctrlKey || e.key === 'v' && e.metaKey) {
        return false;
      }
    });

    const fitAddon = new FitAddon();
    this.term.loadAddon(fitAddon);
    this.term.loadAddon(new WebLinksAddon());

    this.term.onData((data) => {
      this.send({ type: 'data', body: data })
    });

    this.term.open(this.link);
    fitAddon.fit();

    this.term.focus(); 
  }

  componentWillUnmount() {
    this.send({ type: 'end' })

    core.tunnel.unsub({
      method: 'unsub',
      uuid: this.uuid,
      unit: 'webconsole',
      type: 'transferdata',
    }, this.handleData);

    this.uuid = null;

    this.term.clear();
    this.term = null;
  }

  handleData = (msg) => {
    if (msg.payload && msg.payload.type === 'data') {
      this.term.write(msg.payload.body);
    }
    
  }

  send = (payload) => {
    core.tunnel.command({
      method: 'transferdata',
      uuid: this.uuid,
      unit: 'webconsole',
      payload,
    })
  }

  linked = (e) => {
    this.link = e;
  }

  render() {
    return (
      <div ref={this.linked} style={{ width: '100%', height: '100%' }} />
    );
  }
}


export default Webconsole;