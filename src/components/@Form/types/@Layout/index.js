import React, { PureComponent } from 'react';
import core from 'core';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import Canvas from './Canvas';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
}

const EMPTY_ARRAY = [];

const TITLES = {
  canvas: 'Canvas',
  toolbar: 'Toolbar',
  toolbar1: 'Toolbar1',
  toolbar2: 'Toolbar2',

}

const state = {
  windows: {
    mode: 0,
    direction: 'row',
    first: "canvas",
    second: {
      direction: 'column',
      first: "toolbar1",
      second: "toolbar2",
    },
    splitPercentage: 80,
  },
}

const list = [ 's1', 's2', 's3', 's4']

const sections = {
  's1': { height: 50, hover: false, columns: ['c1', 'c2', 'c3'] },
  's2': { height: 75, hover: false, columns: ['c1', 'c2', 'c3'] },
  's3': { height: 100, hover: false, columns: ['c1'] },
  's4': { height: 150, hover: false, columns: ['c1', 'c2', 'c3'] },
}


const columns = {
  's1': {
    'c1': {},
    'c2': {},
    'c3': {},
  },
  's2': {
    'c1': {},
    'c2': {},
    'c3': {},
  },
  's3': {
    'c1': {},
  },
  's4': {
    'c1': {},
    'c2': {},
    'c3': {},
  },
}


class Layout extends PureComponent {
  state = state;

  handleChangeWindows = (data) => {
    this.setState(state => {
      return { ...state, windows: data };
    });
  }

  renderButtons = (id) => {
    return [];
  }

  renderDownToolbar = (id) => {
    return null;
  }

  renderComponent = (id) => {
    if (id === 'canvas') {
      return (
        <Canvas 
          list={list}
          sections={sections}
          columns={columns}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div style={styles.root}>
        <Mosaic
          className="mosaic-blueprint-theme"
          value={this.state.windows}
          onChange={this.handleChangeWindows}
          renderTile={(id, path) => {
            return (
              <MosaicWindow
                key={id}
                draggable={false}
                title={TITLES[id]}
                additionalControls={EMPTY_ARRAY}
                path={path}
                renderToolbar={null}
                toolbarControls={this.renderButtons(id)}
                renderPreview={() => this.renderDownToolbar(id)}
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

export default Layout;