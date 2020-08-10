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

function getIdState(index, prefix, state) {
  if (state[`${prefix}${index + 1}`] === undefined) {
    return `${prefix}${index + 1}`;
  }
  return getIdState(index + 1, prefix, state);
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
      splitPercentage: 35,
    },
    splitPercentage: 75,
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
            selectOne: null,
            selects: {},
            settings: {
              x: { value: 10 }, 
              y: { value: 10 }, 
              w: { value: 250 }, 
              h: { value: 250 }, 
              scale: { value: 1 }, 
              grid: { value: 10 },
              backgroundColor: { 
                type: 'fill', 
                value: 'rgba(255,255,255,1)', 
                fill: 'rgba(255,255,255,1)',
                angle: 90,
                shape: 'circle',
                positionX: 50,
                positionY: 50,
                extent: 'closest-side',
                palette: [{ offset: '0.00', color: '#4A90E2', opacity: 1 }, { offset: '1.00', color: '#9013FE', opacity: 1 }]
              },
              backgroundImage: { value: 'unset' },
              overlayColor: { 
                type: 'fill', 
                value: 'transparent', 
                fill: 'transparent',
                angle: 90,
                shape: 'circle',
                positionX: 50,
                positionY: 50,
                extent: 'closest-side',
                palette: [{ offset: '0.00', color: '#4A90E2', opacity: 1 }, { offset: '1.00', color: '#9013FE', opacity: 1 }]
              },
            },
            list: [],
            listState: ['state1', 'state2'],
            state: {
              master: { hide: false, curent: 0, values: { 0: {} } },
              state1: { hide: false, curent: 0, values: {}, title: 'state' },
              state2: { hide: false, curent: 0, values: {}, title: 'error', },
            },
            elements: {}
          });
    }
    core.transfer.sub('template', this.handleTransferData);
  }

  componentWillUnmount() {
    core.transfer.unsub('template', this.handleTransferData);
    this.isSave = null;
    this.dragSelectContainer = null;
  }

  handleTransferData = (button, save, reset) => {
    if (button === 'save') {
      this.isSave = null;
      const store = core.store.getState().apppage.data[this.props.id][this.props.options.prop];
      save({
        [this.props.id]: {
          [this.props.options.prop]: store,
        }
      })
    } else {
      this.isSave = null;
      reset();
    }
  }

  save = () => {
    if (!this.isSave) {
      this.isSave = true;
      core.actions.apppage.data({ save: 'template' })
    }
  }

  handleChangeWindows = (data) => {
    this.setState(state => {
      return { ...state, windows: data };
    });
  }

  renderButtons = (id) => {
    if (id === 'property') {
      const toolbar = this.props.data.toolbarType || 'tree';

      if (toolbar === 'events') {
        const select = this.props.data.propertyType || 'actions';
        return [
          <Button 
            key="1"
            minimal
            active={select === 'actions'} 
            icon="hand-up"  
            onClick={() => this.handleChangeProperty('actions')} 
          />,
          <Separator key="2" />,
          <Button 
            key="3"
            minimal 
            active={select === 'move'} 
            icon="move"  
            onClick={() => this.handleChangeProperty('move')}
          />,
        ];
      }
      const select = this.props.data.propertyType || 'main';
      return [
        <Button 
          key="1"
          minimal
          active={select === 'main'} 
          icon="style"  
          onClick={() => this.handleChangeProperty('main')} 
        />,
        <Separator key="4" />,
        <Button 
          key="13"
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
        <Separator key="4" />,
        <Button 
          key="5"
          minimal
          icon="changes" 
          active={select === 'vars'}
          onClick={() => this.handleChangeToolbar('vars')} 
        />,
        <Separator key="6" />,
        <Button 
          key="7"
          minimal
          icon="widget-button" 
          active={select === 'events'}
          onClick={() => this.handleChangeToolbar('events')} 
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
    if (toolbarId === 'tree') {
      core.actions.template
        .setModeMaster(this.props.id, this.props.options.prop);
    }

    if (toolbarId === 'vars') {
      core.actions.template
        .setModeVars(this.props.id, this.props.options.prop);
    }

    if (toolbarId === 'events') {
      core.actions.template
        .setModeEvents(this.props.id, this.props.options.prop);
    }
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

  handleChangeTitleState = (stateId, value) => {
    core.actions.template
      .changeTitleState(
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
    const toolbar = this.props.data.toolbarType || 'tree';

    if (toolbar === 'tree' || toolbar === 'events') {
      if (this.props.data.selectOne === 'content') {
        core.actions.template
          .settings(
            this.props.id, this.props.options.prop,
            { [key]: value }
          );
      } else {
        if (key === 'w2' || key === 'h2') {
          const item = this.props.data.elements[this.props.data.selectOne];

          const prop1 = key === 'w2' ? 'x': 'y';
          const prop2 = key === 'w2' ? 'w': 'h';
  
          const curentValue = value.value;
          const delta = curentValue - item[prop2].value;
        
          
          const data = { 
            [prop1]: { ...item[prop1], value: item[prop1].value - delta },
            [prop2]: { ...item[prop2], value: value.value },
            [key]: value 
          };

          core.actions.template
            .editStateMaster(
              this.props.id, this.props.options.prop,
              'master', this.props.data.state[stateId].curent,
              this.props.data.selectOne, data,
            );
        } else if (key === 'x' || key === 'y' || key === 'w' || key === 'h') {
          const item = this.props.data.elements[this.props.data.selectOne];
          const prop1 = (key === 'x' || key === 'w') ? 'w2': 'h2';
          
          const data = { 
            [prop1]: { ...item[prop1], value: value.value },
            [key]: value 
          };

          core.actions.template
            .editStateMaster(
              this.props.id, this.props.options.prop,
              'master', this.props.data.state[stateId].curent,
              this.props.data.selectOne, data,
            );
        } else {
          core.actions.template
            .editStateMaster(
              this.props.id, this.props.options.prop,
              'master', this.props.data.state[stateId].curent,
              this.props.data.selectOne, { [key]: value },
            );
        }
      }
    }
    if (toolbar === 'vars' && stateId !== 'master') {
      if (key === 'w2' || key === 'h2') {
        const item = this.props.data.elements[this.props.data.selectOne];

        const prop1 = key === 'w2' ? 'x': 'y';
        const prop2 = key === 'w2' ? 'w': 'h';

        const curentValue = value.value;
        const delta = curentValue - item[prop2].value;
      
        
        const data = { 
          [prop1]: { ...item[prop1], value: item[prop1].value - delta },
          [prop2]: { ...item[prop2], value: value.value },
          [key]: value 
        };

        core.actions.template
          .editState(
            this.props.id, this.props.options.prop,
            stateId, this.props.data.state[stateId].curent,
            this.props.data.selectOne, data,
          );
      } else if (key === 'x' || key === 'y' || key === 'w' || key === 'h') {
        const item = this.props.data.elements[this.props.data.selectOne];
        const prop1 = (key === 'x' || key === 'w') ? 'w2': 'h2';
        
        const data = { 
          [prop1]: { ...item[prop1], value: value.value },
          [key]: value 
        };

        core.actions.template
          .editState(
            this.props.id, this.props.options.prop,
            stateId, this.props.data.state[stateId].curent,
            this.props.data.selectOne, data,
          );
      } else {
        core.actions.template
          .editState(
            this.props.id, this.props.options.prop,
            stateId, this.props.data.state[stateId].curent,
            this.props.data.selectOne, { [key]: value },
          );
      }
    }
    this.save();
  }

  handleGetStyleProperty = (params) => {
    const stateId = this.props.data.selectState || 'master';
    if (stateId !== 'master' && params.cache) {
      return COLOR_STYLE
    }
    return EMPTY_STYLE;
  }

  handleClickTreeElement = (elementId) => {
    core.actions.template
      .select(
        this.props.id, this.props.options.prop,
        elementId
      );
  }

  handleClickAddState = () => {
    const stateId = getIdState(0, 'state', this.props.data.state);
    core.actions.template
      .addState(
        this.props.id, this.props.options.prop,
        stateId,
      );
  }

  handleClickDeleteState = (stateId) => {
    core.actions.template
      .deleteState(
        this.props.id, this.props.options.prop,
        stateId,
      );
  }

  handleClickEditIdState = (stateId, value) => {
    core.actions.template
      .editIdState(
        this.props.id, this.props.options.prop,
        stateId, value,
      );
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
          selectToolbar={this.props.data.toolbarType}
          selectState={this.props.data.selectState}
          save={this.save}
        />
      );
    }
    if (id === 'property' && this.props.data.elements) {

      const selectState = this.props.data.selectState || 'master';
      const state = this.props.data.state[selectState];
      const masterData = this.props.data.state.master.values[0][this.props.data.selectOne];
      const stateData = state.values[state.curent] ? state.values[state.curent][this.props.data.selectOne] : {};
      const curentData = this.props.data.elements[this.props.data.selectOne];
      const toolbar = this.props.data.toolbarType || 'tree';

      const elementData = this.props.data.selectOne === 'content' ? 
      { ...this.props.data.settings , type: 'content' } : 
      { ...curentData, ...masterData, ...stateData };

      return (
        <Property
          disabled={toolbar === 'vars' && !this.props.data.listState.length}
          type={this.props.data.propertyType || 'main'}
          selectType={this.props.data.selectType}
          elementId={this.props.data.selectOne}
          elementData={elementData}
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
          onSortState={this.handleSortState}
          onChangeState={this.handleChangeState}
          onChangeValueState={this.handleChangeValueState}
          onChangeVisibilityState={this.handleChangeVisibilityState}
          onChangeTitleState={this.handleChangeTitleState}
          onClickAddState={this.handleClickAddState}
          onClickDeleteState={this.handleClickDeleteState}
          onClickEditIdState={this.handleClickEditIdState}
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


export default Template;