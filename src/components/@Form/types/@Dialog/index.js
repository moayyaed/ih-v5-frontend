import React, { PureComponent } from 'react';
import core from 'core';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import { Button } from '@blueprintjs/core';

import { IconMove } from 'components/@Form/types/@Layout/icons';

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
  sheet: 'Dialog',
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


class Dialog extends PureComponent {
  state = state;

  componentDidMount() {
    core.transfer.sub('container', this.handleTransferData);
  }

  componentWillUnmount() {
    core.transfer.unsub('container', this.handleTransferData);
    this.isSave = null;
    this.dragSelectContainer = null;
  }

  handleTransferData = (button, save, reset) => {
    if (button === 'save') {
      this.isSave = null;
      const store = core.store.getState().apppage.data[this.props.id][this.props.options.prop];
      save({
        [this.props.id]: {
          [this.props.options.prop]: {
            settings: store.settings,
            list: store.list,
            elements: store.elements,
            selects: store.selects,
            selectContainer: store.selectContainer,
            selectType: store.selectType,
            selectOne: store.selectOne,
            propertyType: store.propertyType,
          }
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
      core.actions.apppage.data({ save: 'container' })
    }
  }

  handleChangeWindows = (data) => {
    this.setState(state => {
      return { ...state, windows: data };
    });
  }

  handleChangeToolbar = (toolbarId) => {
    core.actions.dialog
      .data(
        this.props.id, this.props.options.prop,
        { toolbarType: toolbarId }
      );
  }

  handleChangeValueProperty = (key, value) => {
  
    if (this.props.data.selectOne === 'content') {
      core.actions.dialog
        .settings(
          this.props.id, this.props.options.prop,
          { [key]: value }
        );
    } else {
      const propertyType = this.props.data.propertyType || 'element';
      const item = this.props.data.elements[this.props.data.selectOne];
      if (item.type === 'template' && propertyType === 'link') {
        const name = value.result !== undefined ? 'links' : 'actions';
       
        core.actions.dialog
          .changeTemplate(
            this.props.id, this.props.options.prop,
            this.props.data.selectOne, name, name === 'links' ? { [key]: value.result } : { [key]: value },
          )
      }  else if (item.type === 'template' && (key === 'w' || key === 'h')) {
        core.actions.dialog
          .editElement(
            this.props.id, this.props.options.prop,
            this.props.data.selectOne, { w: { ...item.w, value: value.value }, h: { ...item.h, value: value.value } }
          );
      } else if (item.widget && propertyType === 'link') {
        core.actions.dialog
          .editElement(
            this.props.id, this.props.options.prop,
            this.props.data.selectOne, { widgetlinks: { [key]: value }},
          )
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

          core.actions.dialog
            .editElement(
              this.props.id, this.props.options.prop,
              this.props.data.selectOne, data
            );
        } else if (key === 'x' || key === 'y' || key === 'w' || key === 'h') {
          const item = this.props.data.elements[this.props.data.selectOne];
          const prop1 = (key === 'x' || key === 'w') ? 'w2': 'h2';
          
          const data = { 
            [prop1]: { ...item[prop1], value: value.value },
            [key]: value 
          };

          core.actions.dialog
            .editElement(
              this.props.id, this.props.options.prop,
              this.props.data.selectOne, data
            );
        } else {
          core.actions.dialog
            .editElement(
              this.props.id, this.props.options.prop,
              this.props.data.selectOne, { [key]: value }
            );
        }
      }
    }
    this.save();
  }

  handleChangeValueProperty2 = (key, value) => {
    core.actions.dialog
      .settings(
        this.props.id, this.props.options.prop,
        { [key]: value }
      );
    this.save();
  }

  handleGetStyleProperty = (params) => {
    return EMPTY_STYLE;
  }

  handleChangeProperty = (propertyId) => {
    core.actions.dialog
      .data(
        this.props.id, this.props.options.prop,
        { propertyType: propertyId }
      );
  }

  renderButtons = (id) => {
    if (id === 'property') {
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
        <Separator key="6" />,
        <Button 
          key="7"
          minimal
          active={select === 'link'} 
          icon="link"  
          onClick={() => this.handleChangeProperty('link')} 
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
          icon="settings" 
          active={select === 'settings'}
          onClick={() => this.handleChangeToolbar('settings')} 
        />,
      ];
    }
    return [];
  }

  renderDownToolbar = (id) => {
    return null;
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
        core.actions.dialog
          .clearSelects(this.props.id, this.props.options.prop);
      } else if (selectsList.length === 1) {
        core.actions.dialog
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
  
        core.actions.dialog
          .selectMB(this.props.id, this.props.options.prop, selects, data);
      }
    } else {
      core.actions.dialog
        .select(this.props.id, this.props.options.prop, elementId);
    }
  }

  handleClickOptionToolbarMenu = (command, type, props, value) => {
    if (type === 'element') {
      if (command === 'delete') {
        core.actions.dialog
        .deleteElement(this.props.id, this.props.options.prop);
      }
      if (command === 'edit') {
        core.actions.dialog
          .editElement(
            this.props.id, this.props.options.prop,
            props.nodeId, { _label: value },
          )
      }
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
      { ...this.props.data.settings , type: 'content3' } : 
      this.props.data.elements[this.props.data.selectOne];
      const templateData = elementData && elementData.type === 'template' ? this.props.data.templates[elementData.templateId] : null;
      return (
        <Property
          type={this.props.data.propertyType || 'element'}
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


export default Dialog;