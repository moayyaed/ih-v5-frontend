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
          toolbarType: 'state',
          propertyType: 'main',
          selectState: 'Master',
          selectType: null,
          selectContainer: null,
          selects: {}, 
          settings: { x: 270, y: 120, w: 250, h: 250, scale: 1 },
          list: [],
          listState: ['Master', 'State', 'Error'],
          valueState: { Master: 0, State: 0, Error: 0 },
          state: {
            Master: {},
            State: {},
            Error: {},
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
      const select = this.props.data.toolbarType || 'state';
      return [
        <Button 
          key="1"
          minimal
          icon="git-branch" 
          active={select === 'state'}
          onClick={() => this.handleChangeToolbar('state')} 
        />,
        <Separator key="2" />,
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
            disabled={this.props.data.selectState === 'Master'} 
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

  handleChangeState = (stateId) => {
    core.actions.template
      .data(
        this.props.id, this.props.options.prop,
        { selectState: stateId }
      );
  }

  handleChangeValueState = (key, value) => {
    core.actions.template
      .changeValueState(
        this.props.id, this.props.options.prop,
        key, value
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
    core.actions.template
      .editElement(
        this.props.id, this.props.options.prop,
        this.props.data.selectOne, { [key]: value }
      );
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
      return (
        <Property
          type={this.props.data.propertyType || 'main'}
          selectType={this.props.data.selectType}
          elementId={this.props.data.selectOne}
          elementData={this.props.data.elements[this.props.data.selectOne]}
          onChange={this.handleChangeValueProperty} 
        />
      )
    }

    if (id === 'toolbar') {
      return (
        <Toolbar
          type={this.props.data.toolbarType || 'state'}
          selectState={this.props.data.selectState || 'Master'}
          list={this.props.data.list || []}
          listState={this.props.data.listState || []}
          valueState={this.props.data.valueState || {}}
          elements={this.props.data.elements || {}}
          selects={this.props.data.selects || {} }
          onClickElement={this.handleClickTree}
          onChangeState={this.handleChangeState}
          onChangeValueState={this.handleChangeValueState}
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