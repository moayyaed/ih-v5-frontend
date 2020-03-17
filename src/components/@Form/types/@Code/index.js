import React, { Component } from 'react';
import core from 'core';

import AceEditor from 'react-ace';
import ReactResizeDetector from 'react-resize-detector';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, MosaicButton 
} from 'react-mosaic-component';




import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-text';

import 'react-mosaic-component/react-mosaic-component.css';
import './code.css';

const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
}


const scheme = {
  direction: 'row',
  first: {
    direction: 'column',
    first: 'code',
    second: 'console',
    splitPercentage: 70,
  },
  second: {
    direction: 'column',
    first: 'debug',
    second: 'inspector',
    splitPercentage: 50,
  },
  splitPercentage: 80,
}

const TITLES = {
  code: 'Code',
  console: 'Console',
  toolbar: 'Toolbar',
  debug: 'Debug',
  inspector: 'Inspector'
}

const EMPTY_ARRAY = [];

function buttons(id) {
  if (id === 'code') {
    return (
      [
        <div data-tip="Expand" key="expand">
          <ExpandButton />
        </div>
      ]
    )
  }
  return (
    [
      <div data-tip="Expand" key="expand">
        <ExpandButton />
      </div>,
      <div data-tip="Remove" key="remove">
        <RemoveButton />
      </div>,
    ]
  )
}


function component(props, state, id) {
  if (id === 'code') {
    return (
      <ReactResizeDetector handleWidth handleHeight>
        {({ width, height }) => 
          <AceEditor
            mode="javascript"
            theme="tomorrow"
            width={width || '100%'}
            height={height || '100%'}
            name={id}
            fontSize={14}
            value={props.data}
            setOptions={{ useWorker: false }}
            onChange={(value) => props.onChange(props.id, props.options, null, value)}
          />}
      </ReactResizeDetector>
    )
  }
  if (id === 'console') {
    return (
      <ReactResizeDetector handleWidth handleHeight>
        {({ width, height }) => 
          <AceEditor
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


class Code extends Component {
  state = { consoleValue: '' }

  componentDidMount() {
    core.tunnel.sub('debug', this.handleRealTimeDataConsole);
  }

  componentWillUnmount() {
    core.tunnel.unsub('debug', this.handleRealTimeDataConsole);
  }


  handleRealTimeDataConsole = (value) => {
    this.setState(state => {
      return { ...state, consoleValue: state.consoleValue + value + '\r\n' };
    });
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
                draggable={true}
                title={TITLES[id]}
                additionalControls={EMPTY_ARRAY}
                path={path}
                renderToolbar={null}
                toolbarControls={buttons(id)}
              >
                {component(this.props, this.state, id)}
              </MosaicWindow>
            )
          }}
        />
      </div>
    )
  }    
}


export default Code;