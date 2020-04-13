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
  canvas: 'Layout',
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


class Layout extends PureComponent {
  state = state;

  componentDidMount() {
    core.actions.form.valueBasic(this.props.id, this.props.options.prop, {
      isDragging: false,
      select: {
        section: null,
        column: null,
      },
      list: [ 's1', 's2', 's3', 's4'],
      sections: {
        's1': { height: 50, hover: false, columns: ['s1_c1', 's1_c2', 's1_c3'] },
        's2': { height: 75, hover: false, columns: ['s2_c1', 's2_c2', 's2_c3'] },
        's3': { height: 100, hover: false, columns: ['s3_c1'] },
        's4': { height: 150, hover: false, columns: ['s4_c1', 's4_c2', 's4_c3'] },
      },
      columns: {
        's1_c1': { hover: false },
        's1_c2': { hover: false },
        's1_c3': { hover: false },
        's2_c1': { hover: false },
        's2_c2': { hover: false },
        's2_c3': { hover: false },
        's3_c1': { hover: false },
        's4_c1': { hover: false },
        's4_c2': { hover: false },
        's4_c3': { hover: false },
      },
    });
  }

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

  handleClickBody = () => {
    core.actions.layout
    .select(
      this.props.id, this.props.options.prop, 
      { section: null, column: null },
    )
  }

  renderComponent = (id) => {
    if (id === 'canvas') {
      return (
        <Canvas
          id={this.props.id}
          prop={this.props.options.prop}
          isDragging={this.props.data.isDragging}
          select={this.props.data.select || {}} 
          list={this.props.data.list || []}
          sections={this.props.data.sections}
          columns={this.props.data.columns}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div style={styles.root} onClick={this.handleClickBody}>
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