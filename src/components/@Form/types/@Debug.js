import React, { PureComponent } from 'react';
import core from 'core';

import AceEditor from 'react-ace';
import ReactResizeDetector from 'react-resize-detector';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import { Button } from '@blueprintjs/core';

import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/mode-text';
import { TramRounded } from '@material-ui/icons';


const scheme = 'script'


const EMPTY_ARRAY = [];


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  }
}



class Debug extends PureComponent { 

  state = {
    start: false,
    consoleValue: '', 
    consoleAutoScroll: true,
    scrollTop: 0,
  };


  componentWillUnmount() {
    if (this.state.start === true) {
      core.tunnel.unsub({
        method: 'unsub',
        type: 'debug',
        id: 'plugin',
        nodeid: this.nodeid,
        uuid: `plugin_${this.nodeid}`
      }, this.handleRealTimeDataConsole);
      this.nodeid = null;
    }
  }

  handleStart = () => {
    if (this.state.start === false) { 
      this.nodeid = this.props.route.nodeid;
      core.tunnel.sub({
        method: 'sub',
        type: 'debug',
        id: 'plugin',
        nodeid: this.nodeid,
        uuid: `plugin_${this.nodeid}`
      }, this.handleRealTimeDataConsole);
      this.setState({ start: true })
    }
  }

  handleStop = () => {
    if (this.state.start === true) {
      core.tunnel.unsub({
        method: 'unsub',
        type: 'debug',
        id: 'plugin',
        nodeid: this.nodeid,
        uuid: `plugin_${this.nodeid}`
      }, this.handleRealTimeDataConsole);
      this.nodeid = null;
      this.setState({ start: false })
    }
  }

  handleRealTimeDataConsole = (value) => {
    this.setState(state => {
      if (this.state.consoleValue.length > 50 * 5000) {
        return { 
          ...state, 
          consoleValue: state.consoleValue
            .split('\r\n')
            .slice(1500)
            .join('\r\n') + value + '\r\n' 
        };
      }
      return { ...state, consoleValue: state.consoleValue + value + '\r\n' };
    }, () => {
      if (this.console && this.state.consoleAutoScroll) {
        const index = this.console.editor.session.getLength() - 1;
        this.console.editor.scrollToRow(index);
      }
    });
  }

  handleChangeAutoScroll = () => {
    this.setState(state => {
      return { ...state, consoleAutoScroll: !state.consoleAutoScroll };
    });
  }

  handleClearConsole = () => {
    this.setState(state => {
      return { ...state, consoleValue: '' };
    });
  }

  renderButtons = (id) => {
    return (
      [
        this.state.start ? <Button key="1" icon="stop" minimal onClick={this.handleStop} /> :
        <Button key="2" icon="play" minimal onClick={this.handleStart} />,
        <Separator key="3" />,
        this.state.consoleAutoScroll ? 
          <Button key="4" icon="git-commit" minimal onClick={this.handleChangeAutoScroll} /> : 
          <Button key="5" icon="bring-data" minimal onClick={this.handleChangeAutoScroll} />,
          <Button key="6" icon="trash" minimal onClick={this.handleClearConsole} />,
      ]
    )
  }

  renderComponent = (id) => {
    const { props, state } = this;
    const disabled = typeof props.options.disabled === 'function' ? props.options.disabled(props.global) : props.options.disabled;
    if (id === 'script') {
      return (
        <ReactResizeDetector key={id} handleWidth handleHeight>
          {({ width, height }) => 
            <AceEditor
              ref={this.linkConsole}
              mode="text"
              theme="tomorrow"
              width={width || '100%'}
              height={height || '100%'}
              name={id}
              fontSize={12}
              value={state.consoleValue}
              showPrintMargin={false}
              showGutter={false}
              setOptions={{ useWorker: false }}
              readOnly
            />}
        </ReactResizeDetector>
      )
    }
    return null;
  }


  linkConsole = (e) => {
    this.console = e;
  }

  render() {
    return (
      <div style={styles.root}>
        <Mosaic
          className="mosaic-blueprint-theme"
          initialValue={scheme}
          renderTile={(id, path, x) => {
            return (
              <MosaicWindow
                key={id}
                draggable={true}
                title="Консоль"
                additionalControls={EMPTY_ARRAY}
                path={path}
                renderToolbar={null}
                toolbarControls={this.renderButtons(id)}
              >
                {this.renderComponent(id)}
              </MosaicWindow>
            )
          }}
        />
      </div>
    )
  }   
}


export default Debug;