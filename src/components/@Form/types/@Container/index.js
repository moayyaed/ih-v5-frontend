import React, { PureComponent } from 'react';
import core from 'core';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import Sheet from './Sheet';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
}

const EMPTY_ARRAY = [];

const TITLES = {
  sheet: 'Container',
  properties: 'Toolbar1',
  toolbar2: 'Toolbar2',

}

const state = {
  windows: {
    mode: 0,
    direction: 'row',
    first: "sheet",
    second: {
      direction: 'column',
      first: "properties",
      second: "toolbar2",
      splitPercentage: 32,
    },
    splitPercentage: 80,
  },
}


class Container extends PureComponent {
  state = state;

  componentDidMount() {
    core.actions.container
      .data(
        this.props.id, this.props.options.prop, { 
          settings: {
            x: 300,
            y: 150,
            scale: 1,
          }
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

  }

  renderComponent = (id) => {
    if (id === 'sheet') {
      return (
        <Sheet
          id={this.props.id}
          prop={this.props.options.prop}
          settings={this.props.data.settings} 
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


export default Container;