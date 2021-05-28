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

import { IconMove, IconState, IconAction } from 'components/@Form/types/@Layout/icons';


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

function cloneObject(i) {
  if ((!!i) && (i.constructor === Object)) {
    return Object
      .keys(i)
      .reduce((p, c) => {
        return { ...p, [c]: cloneObject(i[c]) }
      }, {});
  }
  if (Array.isArray(i)) {
    return i.map(cloneObject);
  }
  return i;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}


class Template extends PureComponent {
  state = state;

  componentDidMount() {
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
      const mode = this.props.data.mode || 'tree';

      if (mode === 'events') {
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
            icon={IconMove}
            onClick={() => this.handleChangeProperty('move')}
          />,
        ];
      }
      const select = this.props.data.propertyType || 'element';
      return [
        <Button 
          key="1"
          minimal
          active={select === 'element'} 
          icon="highlight"
          onClick={() => this.handleChangeProperty('element')} 
        />,
        <Separator key="2" />,
        <Button 
          key="3"
          minimal
          active={select === 'main'} 
          icon="style"  
          onClick={() => this.handleChangeProperty('main')} 
        />,
        <Separator key="4" />,
        <Button 
          key="5"
          minimal 
          active={select === 'move'} 
          icon={IconMove}  
          onClick={() => this.handleChangeProperty('move')}
        />,
      ];
    }
    if (id === 'toolbar') {
      const select = this.props.data.toolbarType || 'tree';
      const mode = this.props.data.mode || 'tree';
      return [
        <Button 
          key="3"
          minimal
          icon="diagram-tree" 
          active={select === 'tree'}
          onClick={() => this.handleChangeToolbar('tree')} 
          rightIcon={mode === 'tree' ? 'symbol-circle' : null}
        />,
        <Separator key="4" />,
        <Button 
          key="5"
          minimal
          icon={IconState}
          active={select === 'vars'}
          onClick={() => this.handleChangeToolbar('vars')} 
          rightIcon={mode === 'vars' ? 'symbol-circle' : null}
        />,
        <Separator key="6" />,
        <Button 
          key="7"
          minimal
          icon={IconAction}
          active={select === 'events'}
          onClick={() => this.handleChangeToolbar('events')} 
          rightIcon={mode === 'events' ? 'symbol-circle' : null}
        />,
        <Separator key="8" />,
        <Button 
          key="9"
          minimal
          icon="settings" 
          active={select === 'settings'}
          onClick={() => this.handleChangeToolbar('settings')}
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

    if (toolbarId === 'settings') {
      core.actions.container
        .data(
          this.props.id, this.props.options.prop,
          { toolbarType: toolbarId }
        );
    }
  }

  handleSortState = (list) => {
    core.actions.template
      .sortListState(
        this.props.id, this.props.options.prop,
        list,
      );
    this.save();
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

  handleClickOptionToolbarMenu = (command, type, props, value) => {
    const selectState = this.props.data.selectState;
    const valueState = this.props.data.state[selectState].curent;
    
    if (type === 'value') {
      core.actions.template
        .deleteStateByValue(
          this.props.id, this.props.options.prop,
          props.s, props.v, props.i, props.p
        );
      core.actions.template
        .changeValueState(
          this.props.id, this.props.options.prop,
          selectState, valueState
        );
    }
    if (type === 'id') {
      core.actions.template
        .deleteStateByElement(
          this.props.id, this.props.options.prop,
          props.s, props.v, props.i, props.p
        );
      core.actions.template
        .changeValueState(
          this.props.id, this.props.options.prop,
          selectState, valueState
        );
    }
    if (type === 'property') {
      core.actions.template
        .deleteStateByProperty(
          this.props.id, this.props.options.prop,
          props.s, props.v, props.i, props.p
        );
      core.actions.template
        .changeValueState(
          this.props.id, this.props.options.prop,
          selectState, valueState
        );
    }
    if (type === 'element') {
      if (command === 'delete') {
        core.actions.template
        .deleteElement(this.props.id, this.props.options.prop);
      }
      if (command === 'edit') {
        core.actions.template
          .editElement(
            this.props.id, this.props.options.prop,
            props.nodeId, { _label: value },
          )
      }
    }
    this.save();
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
    const toolbar = this.props.data.mode || 'tree';

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

  handleChangeValueProperty2 = (key, value) => {
    core.actions.template
      .settings(
        this.props.id, this.props.options.prop,
        { [key]: value }
      );
    this.save();
  }

  handleGetStyleProperty = (params) => {
    const stateId = this.props.data.selectState || 'master';
    if (stateId !== 'master' && params.cache) {
      return COLOR_STYLE
    }
    return EMPTY_STYLE;
  }

  handleClickTreeElement = (e, elementId) => {
    const selects = { ...this.props.data.selects };
    if ((e.ctrlKey || e.metaKey) && this.props.data.selectType !== null && this.props.data.selectOne !== 'content' && elementId !== 'content') {
      if (this.props.data.selects[elementId] === undefined) {
        selects[elementId] = true;
      } else {
        delete selects[elementId];
      }
      const selectsList = Object.keys(selects);

      if (selectsList.length === 0) {
        core.actions.template
          .clearSelects(this.props.id, this.props.options.prop);
      } else if (selectsList.length === 1) {
        core.actions.template
          .select(this.props.id, this.props.options.prop, selectsList[0]);
      } else {
        const data = { 
          x: { value: Infinity }, 
          y: { value: Infinity }, 
          w: { value: 0 }, 
          h: { value: 0 }, 
          zIndex: { value: 0 } 
        };
  
        selectsList
          .forEach(key => {
            const element = this.props.data.elements[key];
            data.x.value = Math.min(data.x.value, element.x.value);
            data.y.value = Math.min(data.y.value, element.y.value); 
            data.w.value = Math.max(data.w.value, element.x.value + element.w.value); 
            data.h.value = Math.max(data.h.value, element.y.value + element.h.value); 
            data.zIndex.value = Math.max(data.zIndex.value, element.zIndex.value); 
          });
        data.w.value = data.w.value - data.x.value;
        data.h.value = data.h.value - data.y.value;
  
        core.actions.template
          .selectMB(this.props.id, this.props.options.prop, selects, data);
      }
    } else {
      core.actions.template
        .select(this.props.id, this.props.options.prop, elementId);
    }
  }

  handleClickAddState = () => {
    const stateId = getIdState(0, 'state', this.props.data.state);
    core.actions.template
      .addState(
        this.props.id, this.props.options.prop,
        stateId,
      );
    this.save();
  }

  handleClickDeleteState = (stateId) => {
    core.actions.template
      .deleteState(
        this.props.id, this.props.options.prop,
        stateId,
      );
    this.save();
  }

  handleClickMergeToState = (sourceId, tragetId) => {
    const source = this.props.data.state[sourceId].values;
    const target = this.props.data.state[tragetId].values;

    core.actions.template
      .data(
        this.props.id, this.props.options.prop,
        {
          selectState: sourceId,
          listState: this.props.data.listState.filter(i => i !== tragetId),
          state: Object
            .keys(this.props.data.state)
            .reduce((p, c) => {
              if (c === sourceId) {
                return { ...p, [c]: { ...this.props.data.state[c], values: cloneObject(mergeDeep(source, target)) } }
              }
              if (c === tragetId) {
                return p;
              }
              return { ...p, [c]: this.props.data.state[c] }
            }, {})
        }
      );
    core.actions.template
      .changeValueState(
        this.props.id, this.props.options.prop,
        sourceId, this.props.data.state[sourceId].curent,
      );
    this.save();
  }

  handleClickEditIdState = (stateId, value) => {
    core.actions.template
      .editIdState(
        this.props.id, this.props.options.prop,
        stateId, value,
      );
    this.save();
  }

  getTitleSelect = () => {
    if (this.props.data.selectOne) {
      if (this.props.data.selectOne === 'content') {
        return 'Шаблон';
      }
      if (this.props.data.mode === 'vars') {
        return `Переменная - ${this.props.data.state[this.props.data.selectState].title}: ${this.props.data.state[this.props.data.selectState].curent}, Элемент - ${this.props.data.elements[this.props.data.selectOne]._label}`
      }
      return this.props.data.elements[this.props.data.selectOne]._label;
    }
    if (!this.props.data.selectOne) {
      if (this.props.data.mode === 'vars') {
        if (this.props.data.selectType === 'some') {
          const temp = Object
          .keys(this.props.data.selects)
          .map(i => this.props.data.elements[i]._label)
          .join(', ');
          return `Переменная - ${this.props.data.state[this.props.data.selectState].title}: ${this.props.data.state[this.props.data.selectState].curent}, Элементы - ${temp}`
        }
        return `Переменная - ${this.props.data.state[this.props.data.selectState].title}: ${this.props.data.state[this.props.data.selectState].curent}`
      }
      if (this.props.data.mode === 'events') {
        return `Действия`
      }
    }

    return Object
      .keys(this.props.data.selects)
      .map(i => this.props.data.elements[i]._label)
      .join(', ');
  }

  getTitle = (id) => {
    if (id === 'sheet') {
      return this.getTitleSelect();
    }
    return TITLES[id];
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
          selectToolbar={this.props.data.mode}
          selectState={this.props.data.selectState}
          save={this.save}
        />
      );
    }
    if (id === 'property' && this.props.data.elements) {
      const mode = this.props.data.mode || 'tree';
      const selectState = this.props.data.selectState || 'master';
      const state = this.props.data.state[selectState];
      const masterData = this.props.data.state.master.values[0][this.props.data.selectOne];
      const stateData = state.values[state.curent] ? state.values[state.curent][this.props.data.selectOne] : {};
      const curentData = this.props.data.elements[this.props.data.selectOne];
      const toolbar = this.props.data.mode || 'tree';

      const elementData = this.props.data.selectOne === 'content' ? 
      { ...this.props.data.settings , type: 'content4' } : 
      { ...curentData, ...masterData, ...stateData };

      return (
        <Property
          mode={mode}
          disabled={toolbar === 'vars' && !this.props.data.listState.length}
          type={this.props.data.propertyType || 'element'}
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
          data={this.props.data.settings}
          elements={this.props.data.elements || {}}
          onSortState={this.handleSortState}
          onChangeState={this.handleChangeState}
          onChangeValueState={this.handleChangeValueState}
          onChangeVisibilityState={this.handleChangeVisibilityState}
          onChangeTitleState={this.handleChangeTitleState}
          onClickMenu={this.handleClickOptionToolbarMenu}
          onClickAddState={this.handleClickAddState}
          onClickDeleteState={this.handleClickDeleteState}
          onClickMergeTo={this.handleClickMergeToState}
          onClickEditIdState={this.handleClickEditIdState}
          onClickElement={this.handleClickTreeElement}
          onChange={this.handleChangeValueProperty2}
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
                title={this.getTitle(id)}
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