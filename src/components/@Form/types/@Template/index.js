import React, { PureComponent } from 'react';
import core from 'core';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import Sheet from './Sheet';
import Property, { PROPERTY_BUTTONS } from './Property';

import './main.css';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
}

const EMPTY_ARRAY = [];

const TITLES = {
  sheet: 'Template',
  toolbar1: 'Toolbar1',
  property: '',

}

const state = {
  windows: {
    mode: 0,
    direction: 'row',
    first: "sheet",
    second: {
      direction: 'column',
      first: "toolbar1",
      second: "property",
      splitPercentage: 32,
    },
    splitPercentage: 70,
  },
}


class Template extends PureComponent {
  state = state;

  componentDidMount() {
    if (this.props.data.settings === undefined) {
      core.actions.template
      .data(
        this.props.id, this.props.options.prop, {
          selectType: null,
          selectContainer: null,
          selects: {}, 
          settings: { x: 270, y: 120, w: 250, h: 250, scale: 1 },
          list: [],
          elements: {}
        });
    }
  }

  handleChangeWindows = (data) => {
    this.setState(state => {
      return { ...state, windows: data };
    });
  }

  renderButtons = (id) => {
    if (id === 'property') {
      return PROPERTY_BUTTONS;
    }
    return [];
  }

  renderDownToolbar = (id) => {
    return null;
  }

  handleChangeProperty = (key, value) => {
    core.actions.template
    .editElement(
      this.props.id, this.props.options.prop,
      this.props.data.selectOne, { [key]: value }
    );
  }

  renderComponent = (id) => {
    if (id === 'sheet') {
      return (
        <Sheet
          id={this.props.id}
          prop={this.props.options.prop}
          selectType={this.props.data.selectType}
          selectOne={this.props.data.selectOne}
          selectContainer={this.props.data.selectContainer}
          selects={this.props.data.selects || {}}
          list={this.props.data.list || []} 
          settings={this.props.data.settings || {}} 
          elements={this.props.data.elements || {}} 
        />
      );
    }
    if (id === 'property' && this.props.data.elements) {
      return (
        <Property
          type={this.props.data.selectType}
          elementId={this.props.data.selectOne}
          elementData={this.props.data.elements[this.props.data.selectOne]}
          onChange={this.handleChangeProperty} 
        />
      )
    }
    return null;
  }

  render() {
    return (
      <div style={styles.root} >
        <Mosaic
          className="mosaic-blueprint-theme"
          value={this.state.windows}
          onChange={this.handleChangeWindows}
          renderTile={(id, path) => {
            return (
              <MosaicWindow
                key={id}
                className={id}
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


export default Template;