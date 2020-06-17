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
  },
}

const EMPTY_STYLE = {};
const EMPTY_ARRAY = [];

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
 
  }

  handleChangeWindows = (data) => {
    this.setState(state => {
      return { ...state, windows: data };
    });
  }

  handleChangeToolbar = (toolbarId) => {
    core.actions.layout
      .data(
        this.props.id, this.props.options.prop,
        { toolbarType: toolbarId }
      );
  }

  handleChangeProperty = (propertyId) => {
    core.actions.layout
      .data(
        this.props.id, this.props.options.prop,
        { propertyType: propertyId }
      );
  }

  handleClickTreeElement = (elementId, type, content) => {
    if (type === 'section') {
      core.actions.layout
        .select(
          this.props.id, this.props.options.prop, 
          { column: null, section: elementId, content: null },
        )
    } 
    if (type === 'column') {
      core.actions.layout
        .select(
          this.props.id, this.props.options.prop, 
          { column: elementId, section: null, content: null },
        )
    }

    if (type === 'content') {
      core.actions.layout
        .select(
          this.props.id, this.props.options.prop, 
          { column: elementId, section: null, content },
        )
    }
  }

  handleChangeValueProperty = (key, value) => {
    const select = this.props.data.select;
    const selectType = select.content ? 'column' : select.column ? 'column': 'section';
    const elementId = select.content ? select.column : select.column ? select.column : select.section;

    if (selectType === 'section') {
      core.actions.layout
        .editSection(
          this.props.id, this.props.options.prop, 
          elementId, { [key]: value },
        )
    } else {

    }
    /*
    core.actions.container
      .editElement(
        this.props.id, this.props.options.prop,
        this.props.data.selectOne, { [key]: value }
      );
      */
  }

  renderButtons = (id) => {
    if (id === 'property') {
      const select = this.props.data.propertyType || 'main';
      return [
        <Button 
          key="3"
          minimal
          active={select === 'main'} 
          icon="grid-view"  
          onClick={() => this.handleChangeProperty('main')} 
        />,
        <Separator key="4" />,
        <Button 
          key="5"
          minimal 
          active={select === 'style'} 
          icon="style"  
          onClick={() => this.handleChangeProperty('style')} 
        />,
        <Separator key="6" />,
        <Button 
          key="7"
          minimal 
          active={select === 'ext'} 
          icon="properties"  
          onClick={() => this.handleChangeProperty('ext')}
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
        <Button 
          key="4"
          minimal
          icon="inbox" 
          active={select === 'elements'}
          onClick={() => this.handleChangeToolbar('elements')} 
        />,
      ];
    }
    return [];
  }

  handleGetStyleProperty = (params) => {
    return EMPTY_STYLE;
  }

  renderDownToolbar = (id) => {
    return null;
  }

  renderComponent = (id) => {
    if (id === 'sheet') {
      return (
        <Sheet
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
    
    if (id === 'property' && this.props.data.sections) {
      const select = this.props.data.select;
      const selectType = select.content ? select.content : select.column ? 'column': 'section';
      const elementId = select.content ? select.column : select.column ? select.column : select.section;
      const elementData = this.props.data.sections[elementId] || this.props.data.columns[elementId]
      return (
        <Property
          type={this.props.data.propertyType || 'main'}
          selectType={selectType}
          elementId={elementId}
          elementData={elementData}
          onChange={this.handleChangeValueProperty}
          getStyle={this.handleGetStyleProperty}
        />
      )
    }

    if (id === 'toolbar') {
      return (
        <Toolbar
          id={this.props.id}
          prop={this.props.options.prop}
          type={this.props.data.toolbarType || 'tree'}
          selectElements={this.props.data.select || {} }
          listElements={this.props.data.list || []}
          sections={this.props.data.sections || {}}
          columns={this.props.data.columns || {}}
          onClickElement={this.handleClickTreeElement}
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