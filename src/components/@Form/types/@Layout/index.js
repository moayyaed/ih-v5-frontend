import React, { PureComponent } from 'react';
import core from 'core';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';


import Canvas from './Canvas';
import Properties from './Properties';

const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
}

const EMPTY_ARRAY = [];

const TITLES = {
  canvas: 'Layout',
  properties: 'Toolbar1',
  toolbar2: 'Toolbar2',

}

const state = {
  windows: {
    mode: 0,
    direction: 'row',
    first: "canvas",
    second: {
      direction: 'column',
      first: "properties",
      second: "toolbar2",
      splitPercentage: 60,
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
      hover: {
        sections: {},
        columns: {},
      },
      drag: {
        section: null,
        column: null,
      },
      
      list: ['s1', 's2', 's3'],
      sections: {
        s1: { height: 50, direction: 'row', columns: ['s1_c1'] },
        s2: { height: 370, direction: 'row', columns: ['s2_c1', 's2_c2'] },
        s3: { height: 50, direction: 'row', columns: ['s3_c1'] },
        s4: { height: '100%', direction: 'column', columns: ['s4_c1', 's4_c2', 's4_c3', 's4_c4'] },
        s5: { height: '100%', direction: 'column', columns: ['s5_c1', 's5_c2'] },
      },
      columns: {
        s1_c1: { type: null, size: 100 },
        s2_c1: { type: 'SECTION', size: 30, sectionId: 's4' },
        s2_c2: { type: 'SECTION', size: 70, sectionId: 's5'  },
        s3_c1: { type: null, size: 100 },
        s4_c1: { type: null, size: 25 },
        s4_c2: { type: null, size: 25 },
        s4_c3: { type: null, size: 25 },
        s4_c4: { type: null, size: 25 },
        s5_c1: { type: null, size: 50 },
        s5_c2: { type: null, size: 50 },
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

  handleClickBody = (e) => {
    if (this.props.data.isDragging) {
      /* core.actions.layout
        .hover(
          this.props.id, this.props.options.prop, 
          { 
            ...this.props.data.hover,
            check: { x: e.clientX, y: e.clientY }, 
          }); */
    } else {
      core.actions.layout
        .data(
          this.props.id, this.props.options.prop, 
          { 
            hover: { sections: {}, columns: {} },
            select: { section: null, column: null },
            drag: { section: null, column: null },
          },
        )
    }
  }

  renderComponent = (id) => {
    if (id === 'canvas') {
      return (
        <Canvas
          id={this.props.id}
          prop={this.props.options.prop}
          isDragging={this.props.data.isDragging}
          isDraggingToolbar={this.props.data.isDraggingToolbar}
          isHoverStub={this.props.data.isHoverStub}
          select={this.props.data.select || {}} 
          hover={this.props.data.hover || {}}
          drag={this.props.data.drag || {}}
          list={this.props.data.list || []}
          sections={this.props.data.sections}
          columns={this.props.data.columns}
        />
      );
    }
    
    if (id === 'properties') {
      return (
        <Properties
          id={this.props.id}
          prop={this.props.options.prop}
          select={this.props.data.select ? this.props.data.sections[this.props.data.select.section] && this.props.data.select.section : null}
          section={this.props.data.select && this.props.data.sections[this.props.data.select.section] || {}}
        />
      )
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