import React from 'react';

import AceEditor from 'react-ace';
import ReactResizeDetector from 'react-resize-detector';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, MosaicButton 
} from 'react-mosaic-component';



import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-tomorrow';

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
  second: 'toolbar',
  splitPercentage: 80,
}

const TITLES = {
  code: 'Code',
  console: 'Console',
  toolbar: 'Toolbar'

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

function component(props, id) {
  if (id === 'code') {
    return (
      <ReactResizeDetector handleWidth handleHeight>
        {({ width, height }) => 
          <AceEditor
          mode="javascript"
          theme="tomorrow"
          width={width}
          height={height}
          name={id}
          fontSize={14}
          value={props.data}
          onChange={(value) => props.onChange(props.id, props.options, null, value)}
        />}
      </ReactResizeDetector>
    )
  }
  return null;
}


function Code(props) {
  return (
    <div style={styles.root}>
      <Mosaic
        className="mosaic-blueprint-theme"
        initialValue={scheme}
        renderTile={(id, path, x) => {
          return (
            <MosaicWindow
              draggable={false}
              title={TITLES[id]}
              additionalControls={EMPTY_ARRAY}
              path={path}
              renderToolbar={null}
              toolbarControls={buttons(id)}
            >
              {component(props, id)}
            </MosaicWindow>
          )
        }}
      />
    </div>
  )
}


export default Code;