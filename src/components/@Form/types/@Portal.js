import React, { Component } from 'react';
import core from 'core';


const styles = {
  frame: {
    width: '100%',
    height: '100%',
    border: 'unset',
  },
}

function getUrl() {
  if (core.cache.conf === 1) {
    return 'portal.intrahouse.ru';
  }
  if (core.cache.conf === 2) {
    return 'portal.intrascada.com';
  }
  return 'portal.intrahouse.ru';
}

class Portal extends Component {
  componentDidMount() {
    window.onmessage = (e) => {
      console.log('root:', e.data);
    };
    this.link.contentWindow.postMessage('hello', '*');
  }

  linked = (e) => {
    this.link = e;
  }

  render() {
    return <iframe ref={this.linked} style={styles.frame} src={`${window.location.protocol}//${getUrl()}/ru_changelog`} />
  }
}


export default Portal;