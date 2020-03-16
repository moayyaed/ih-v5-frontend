import React from 'react';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, MosaicButton 
} from 'react-mosaic-component';

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


function Window(id, path) {
  return (
    <MosaicWindow
      draggable={false}
      title={TITLES[id]}
      additionalControls={EMPTY_ARRAY}
      path={path}
      renderToolbar={null}
      toolbarControls={buttons(id)}
    >
      <div className="example-window">
        <h1>{`Window ${id}`}</h1>
      </div>
    </MosaicWindow>
  )
}

function Code(props) {
  return (
    <div style={styles.root}>
      <Mosaic
        className="mosaic-blueprint-theme"
        initialValue={scheme}
        renderTile={Window}
      />
    </div>
  )
}


export default Code;