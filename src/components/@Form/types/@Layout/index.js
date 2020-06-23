import React, { PureComponent } from 'react';
import core from 'core';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import { Button } from '@blueprintjs/core';

import Sheet from './Sheet';

import Property from './Property/index.js';
import Toolbar from './Toolbar/index.js';

import './main.css';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
}

const EMPTY_ARRAY = [];
const EMPTY_STYLE = {};
const TITLES = {
  sheet: 'Layout',
  toolbar: '',
  property: '',

}

const state = {
  windows: {
    mode: 0,
    direction: 'row',
    first: "sheet",
    second: {
      direction: 'column',
      first: "toolbar",
      second: "property",
      splitPercentage: 42,
    },
    splitPercentage: 70,
  },
}


class Layout extends PureComponent {
  state = state;

  componentDidMount() {
    if (this.props.data.settings === undefined) {
      core.actions.container
      .data(
        this.props.id, this.props.options.prop, {
          selectType: null,
          selectContainer: null,
          selects: {}, 
          settings: { x: 95, y: 50, w: 650, h: 400, scale: 1 },
          list: [],
          containers: {},
          templates: {},
          elements: {},
          
        });
    }
  }

  handleChangeWindows = (data) => {
    this.setState(state => {
      return { ...state, windows: data };
    });
  }

  handleChangeToolbar = (toolbarId) => {
    core.actions.container
      .data(
        this.props.id, this.props.options.prop,
        { toolbarType: toolbarId }
      );
  }

  handleChangeValueProperty = (key, value) => {
    if (this.props.data.selectOne === 'content') {
      core.actions.container
        .settings(
          this.props.id, this.props.options.prop,
          { [key]: value }
        );
    } else {
      core.actions.container
        .editElement(
          this.props.id, this.props.options.prop,
          this.props.data.selectOne, { [key]: value }
        );
    }
  }

  handleGetStyleProperty = (params) => {
    return EMPTY_STYLE;
  }

  handleChangeProperty = (propertyId) => {
    core.actions.container
      .data(
        this.props.id, this.props.options.prop,
        { propertyType: propertyId }
      );
  }

  renderButtons = (id) => {
    if (id === 'property') {
      const select = this.props.data.propertyType || 'main';
      return [
        <Button 
          key="3"
          minimal
          active={select === 'main'} 
          icon="highlight"  
          onClick={() => this.handleChangeProperty('main')} 
        />,
        <Separator key="4" />,
        <Button 
          key="5"
          minimal 
          active={select === 'text'} 
          icon="font"  
          onClick={() => this.handleChangeProperty('text')} 
        />,
        <Separator key="6" />,
        <Button 
          key="7"
          minimal 
          active={select === 'image'} 
          icon="media"  
          onClick={() => this.handleChangeProperty('image')}
        />,
        <Separator key="8" />,
        <Button 
          key="9"
          minimal 
          active={select === 'move'} 
          icon="move"  
          onClick={() => this.handleChangeProperty('move')}
        />,
      ];
    }

    if (id === 'toolbar') {
      const select = this.props.data.toolbarType || 'tree';
      return [
        <Button 
          key="3"
          minimal
          icon="diagram-tree" 
          active={select === 'tree'}
          onClick={() => this.handleChangeToolbar('tree')} 
        />,
      ];
    }
    return [];
  }

  renderDownToolbar = (id) => {
    return null;
  }

  handleClickTreeElement = (elementId) => {
    core.actions.container
      .select(
        this.props.id, this.props.options.prop,
        elementId
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
          templates={this.props.data.templates || {}} 
        />
      );
    }
    if (id === 'toolbar') {
      return (
        <Toolbar
          type={this.props.data.toolbarType || 'tree'}
          selectElements={this.props.data.selects || {} }
          listElements={this.props.data.list || []}
          elements={this.props.data.elements || {}}
          onClickElement={this.handleClickTreeElement}
        />
      )
    }
    if (id === 'property' && this.props.data.elements) {
      const elementData = this.props.data.selectOne === 'content' ? 
      { ...this.props.data.settings , type: 'content' } : 
      this.props.data.elements[this.props.data.selectOne];
      const templateData = elementData && elementData.type === 'template' ? this.props.data.templates[elementData.templateId] : null;
      return (
        <Property
          type={this.props.data.propertyType || 'main'}
          selectType={this.props.data.selectType}
          elementId={this.props.data.selectOne}
          elementData={elementData}
          templateData={templateData}
          onChange={this.handleChangeValueProperty}
          getStyle={this.handleGetStyleProperty}
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


export default Layout;