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
  downToolbar: {
    display: 'flex',
    height: 24,
    alignItems: 'center',
    borderTop: '1px solid rgba(16, 22, 26, 0.15)',
  },
}

const EMPTY_ARRAY = [];
const EMPTY_STYLE = {};
const COLOR_STYLE = { color: '#2196F3' };

const TITLES = {
  sheet: 'Template',
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


class Template extends PureComponent {
  state = state;

  componentDidMount() {
    if (this.props.data.settings === undefined) {
      core.actions.template
      .data(
        this.props.id, this.props.options.prop, {
          toolbarType: 'tree',
          propertyType: 'main',
          selectState: 'master',
          selectType: null,
          selectContainer: null,
          selects: {}, 
          settings: { x: 270, y: 120, w: 250, h: 250, scale: 1 },
          list: [],
          listState: ['state', 'error'],
          state: {
            master: { hide: false, curent: 0, values: { 0: {} } },
            state: { hide: false, curent: 0, values: {} },
            error: { hide: false, curent: 0, values: {} },
          },
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
      const select = this.props.data.propertyType || 'main';
      return [
        <Button 
          key="1"
          minimal
          active={select === 'main'} 
          icon="highlight"  
          onClick={() => this.handleChangeProperty('main')} 
        />,
        <Separator key="2" />,
        <Button 
          key="3"
          minimal 
          active={select === 'text'} 
          icon="font"  
          onClick={() => this.handleChangeProperty('text')} 
        />,
        <Separator key="4" />,
        <Button 
          key="5"
          minimal 
          active={select === 'image'} 
          icon="media"  
          onClick={() => this.handleChangeProperty('image')}
        />,
      ];
    }
    if (id === 'toolbar') {
      const select = this.props.data.toolbarType || 'tree';
      /*
        <Button 
          key="1"
          minimal
          icon="git-branch" 
          active={select === 'state'}
          onClick={() => this.handleChangeToolbar('state')} 
        />,
        <Separator key="2" />,
      */
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
    if (id === 'toolbar' && this.props.data.toolbarType === 'state') {
      return (
        <div style={styles.downToolbar} >
          <Button icon="plus" minimal />
          <Button
            minimal
            disabled={this.props.data.selectState === 'master'} 
            icon="minus"  
            onClick={() => {}} 
          />
        </div>
      )
    }
    return null;
  }

  handleChangeToolbar = (toolbarId) => {
    core.actions.template
      .data(
        this.props.id, this.props.options.prop,
        { toolbarType: toolbarId }
      );
  }

  handleSortState = (list) => {
    core.actions.template
      .sortListState(
        this.props.id, this.props.options.prop,
        list,
      );
  }

  handleChangeState = (stateId) => {
    core.actions.template
      .changeState(
        this.props.id, this.props.options.prop,
        stateId,
      );
  }

  handleChangeValueState = (stateId, value) => {
    core.actions.template
      .changeValueState(
        this.props.id, this.props.options.prop,
        stateId, value
      );
  }

  handleChangeVisibilityState = (stateId, value) => {
    core.actions.template
    .changeVisibilityState(
      this.props.id, this.props.options.prop,
      stateId, value
    );
  }
  
  handleChangeProperty = (propertyId) => {
    core.actions.template
      .data(
        this.props.id, this.props.options.prop,
        { propertyType: propertyId }
      );
  }

  handleChangeValueProperty = (key, value) => {
    const stateId = this.props.data.selectState || 'master';
    core.actions.template
      .editState(
        this.props.id, this.props.options.prop,
        stateId, this.props.data.state[stateId].curent,
        this.props.data.selectOne, { [key]: value },
      );
  }

  handleGetStyleProperty = (params) => {
    const stateId = this.props.data.selectState || 'master';

    if (stateId !== 'master' && params.cache) {
      return COLOR_STYLE
    }
    return EMPTY_STYLE;
  }

  handleClickTree = (elementId) => {
    core.actions.template
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
        />
      );
    }
    if (id === 'property' && this.props.data.elements) {

      const selectState = this.props.data.selectState || 'master';
      const state = this.props.data.state[selectState];
      const masterData = this.props.data.state.master.values[0][this.props.data.selectOne];
      const stateData = state.values[state.curent] ? state.values[state.curent][this.props.data.selectOne] : {};
      const curentData = this.props.data.elements[this.props.data.selectOne];

      return (
        <Property
          type={this.props.data.propertyType || 'main'}
          selectType={this.props.data.selectType}
          elementId={this.props.data.selectOne}
          elementData={{ ...curentData, ...masterData, ...stateData }}
          stateData={stateData}
          onChange={this.handleChangeValueProperty}
          getStyle={this.handleGetStyleProperty}
        />
      )
    }

    if (id === 'toolbar') {
      return (
        <Toolbar
          type={this.props.data.toolbarType || 'tree'}
          selectState={this.props.data.selectState || 'master'}
          selectElements={this.props.data.selects || {} }
          listElements={this.props.data.list || []}
          listState={this.props.data.listState || []}
          state={this.props.data.state || {}}
          elements={this.props.data.elements || {}}
          onClickElement={this.handleClickTree}
          onSortState={this.handleSortState}
          onChangeState={this.handleChangeState}
          onChangeValueState={this.handleChangeValueState}
          onChangeVisibilityState={this.handleChangeVisibilityState}
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