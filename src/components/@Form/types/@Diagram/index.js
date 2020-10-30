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

import { IconMove } from 'components/@Form/types/@Layout/icons';

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
  sheet: 'Diagram',
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
      splitPercentage: 35,
    },
    splitPercentage: 75,
  },
}


class Diagram extends PureComponent {
  state = state;

  componentDidMount() {
    core.transfer.sub('diagram', this.handleTransferData);
  }

  componentWillUnmount() {
    core.transfer.unsub('diagram', this.handleTransferData);
    this.isSave = null;
  }

  handleTransferData = (button, save, reset) => {
    if (button === 'save') {
      this.isSave = null;
      const store = core.store.getState().apppage.data[this.props.id][this.props.options.prop];
    } else {
      this.isSave = null;
      reset();
    }
  }

  save = () => {
    if (!this.isSave) {
      this.isSave = true;
      core.actions.apppage.data({ save: 'diagram' })
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
    this.save();
  }

  handleChangeValueProperty2 = (key, value) => {
    this.save();
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
          icon="properties"  
          onClick={() => this.handleChangeProperty('main')} 
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

  handleClickOptionToolbarMenu = (command, type, props) => {
    if (type === 'element') {
      core.actions.container
        .select(
          this.props.id, this.props.options.prop,
          props.nodeId
        );
      core.actions.container
        .deleteElement(this.props.id, this.props.options.prop);
    }
    this.save();
  }

  renderComponent = (id) => {
    if (id === 'sheet' && this.props.data.settings) {
      return (
        <Sheet
          id={this.props.id}
          prop={this.props.options.prop}
          selectType={this.props.data.selectType}
          selectOne={this.props.data.selectOne}
          selectContainer={this.props.data.selectContainer}
          selects={this.props.data.selects}
          list={this.props.data.list} 
          settings={this.props.data.settings} 
          elements={this.props.data.elements}
          templates={this.props.data.templates}
          save={this.save}
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
          onClickMenu={this.handleClickOptionToolbarMenu}
          onChange={this.handleChangeValueProperty2}
          data={this.props.data.settings}
          getStyle={this.handleGetStyleProperty}
        />
      )
    }
    if (id === 'property' && this.props.data.elements) {
      const elementData = this.props.data.selectOne === 'content' ? 
      { ...this.props.data.settings , type: 'content2' } : 
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


export default Diagram;