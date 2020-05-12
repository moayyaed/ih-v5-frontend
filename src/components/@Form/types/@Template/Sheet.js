import React, { Component } from 'react';
import core from 'core';

import { ContextMenu } from "@blueprintjs/core";

import Paper from '@material-ui/core/Paper';
import Draggable from 'components/Draggable';

import Element from './Element';
import Menu from 'components/Menu';

import elemets from 'components/@Elements';
import getDefaultParamsElement from 'components/@Elements/default';

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    // perspective: 1000,
    // WebkitPerspective: 1000,
  },
  sheet: {
    transformOrigin: '0 0',
    position: 'absolute',
    borderRadius: 0,
    backgroundSize: '50px 50px',
    // backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogPGxpbmUgeDE9IjEwMCIgeTE9IjAiIHgyPSIxMDAiIHkyPSIxMDAiIHN0cm9rZT0iIzc1NzU3NSIgLz4NCiA8bGluZSB4MT0iMCIgeTE9IjEwMCIgeDI9IjEwMCIgeTI9IjEwMCIgc3Ryb2tlPSIjNzU3NTc1IiAvPg0KPC9zdmc+')",
  },
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getAllElementsByGroup(list, elements) {
  return list
    .reduce((p, c) => {
      if (elements[c].type === 'group') {
        return {
          ...p,
          [c]: true,
          ...getAllElementsByGroup(elements[c].elements, elements)
        };
      }
      return {
        ...p,
        [c]: true,
      };
    }, {});
} 

function getIdElement(index, prefix, elements) {
  if (elements[`${prefix}_${index + 1}`] === undefined) {
    return `${prefix}_${index + 1}`;
  }
  return getIdElement(index + 1, prefix, elements);
}


class Sheet extends Component {

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
      save({
        [this.props.id]: {
          [this.props.prop]: {
            settings: this.props.settings,
            list: this.props.list,
            elements: this.props.elements,
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
      core.actions.apppage.data({ save: 'template' })
    }
  }

  handleMouseUpContainer = (e) => {

  }

  handleMouseDownContainer = (e) => {

  }

  handleMouseWhellContainer = (e) => {
    const isTouchPad = e.nativeEvent.wheelDeltaY ? 
    e.nativeEvent.wheelDeltaY === -3 * e.nativeEvent.deltaY : e.nativeEvent.deltaMode === 0;

    const offset = this.container.getBoundingClientRect();

    let x = this.props.settings.x;
    let y = this.props.settings.y;
    let s = this.props.settings.scale;

    const px = e.pageX - offset.left;
    const py = e.pageY - offset.top;

    const tx = (px - (x * s)) / s;
    const ty = (py - (y * s)) / s;

    if (isTouchPad) {
      if (e.deltaY > 0) {
        s -= (e.deltaY * 1 / 450)
      } else {
        s += (e.deltaY * -1 / 450)
      }
    } else {
      s += Math.max(-1, Math.min(1, e.deltaY)) * -0.1 * s;
    } 

    if (s > 8) {
      s = 8;
    }
    if (s < 0.1 ) {
      s = 0.1;
    }
  
    x = (-tx * s + px) / s
    y = (-ty * s + py) / s

    core.actions.template
      .settings(
        this.props.id, this.props.prop,
        { x, y, scale: s }
      );
  }

  handleMouseWhellContainer2 = (e) => {
    const isTouchPad = e.nativeEvent.wheelDeltaY ? 
    e.nativeEvent.wheelDeltaY === -3 * e.nativeEvent.deltaY : e.nativeEvent.deltaMode === 0;

    const offset = this.container.getBoundingClientRect();

    let x = this.props.settings.x;
    let y = this.props.settings.y;
    let s = this.props.settings.scale;

    const px = e.pageX - offset.left;
    const py = e.pageY - offset.top;

    const tx = (px - x) / s;
    const ty = (py - y) / s;

    if (isTouchPad) {
      if (e.deltaY > 0) {
        s -= (e.deltaY * 1 / 450)
      } else {
        s += (e.deltaY * -1 / 450)
      }
    } else {
      s += Math.max(-1, Math.min(1, e.deltaY)) * -0.1 * s;
    }

    if (s > 8) {
      s = 8;
    }
    if (s < 0.1 ) {
      s = 0.1;
    }

    x = -tx * s + px
    y = -ty * s + py

    core.actions.template
      .settings(
        this.props.id, this.props.prop,
        { x, y, scale: s }
      );
  }

  handleClickSheet = (e) => {

  }

  handleContextMenuSheet = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.persist();

    const pos = { left: e.clientX, top: e.clientY };
    const scheme = {
      main: [
        { id: '1', 
          title: 'Add Element', 
          click: () => this.handleAddElement(e) 
        },
      ]
    }

    ContextMenu.show(<Menu scheme={scheme} />, pos);
  }

  handleMoveSheet = (e) => {
 
  }

  handleStopMoveSheet = (e, data) => {
    core.actions.template
      .settings(
        this.props.id, this.props.prop,
        { x: data.x, y: data.y }
      );
    this.save();
  }

  handleStartMoveElement = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleAddElement = (e, type) => {
    const elementId = getIdElement(0, type, this.props.elements);

    const rect = this.sheet.getBoundingClientRect();
    
    const x = (e.pageX - (rect.left * this.props.settings.scale)) / this.props.settings.scale // (e.clientX - rect.left) / this.props.settings.scale;
    const y = (e.pageY - (rect.top * this.props.settings.scale)) / this.props.settings.scale  // (e.clientY - rect.top) / this.props.settings.scale;
    
    const data = {
      [elementId]: {
        type,
        x: Math.round(x * 1e2 ) / 1e2, 
        y: Math.round(y * 1e2 ) / 1e2,
        w: 70, h: 70,
        ...getDefaultParamsElement(type),
      }
    };
    
    core.actions.template
      .data(
        this.props.id, this.props.prop,
        { 
          list: this.props.list.concat(elementId), 
          elements: {
            ...this.props.elements,
            ...data,
          },
          state: {
            ...this.props.elements,
            Master: {
              ...this.props.elements.Master,
              ...data,
            }
          }
        }
      );
    this.save();
  }

  handleDeleteElement = () => {
    core.actions.template
      .data(
        this.props.id, this.props.prop,
        {
          selectType: null,
          selectOne: null,
          selectContainer: null,
          selects: {},
          list: this.props.list.filter(i => !this.props.selects[i]),
          elements: Object
            .keys(this.props.elements)
            .reduce((p, c) => {
              if (this.props.selects[c] || this.props.selects[this.props.elements[c].groupId]) {
                return p;
              }
              return { ...p, [c]: this.props.elements[c] }
            }, {})
        });
  }

  handleMoveElement = (e, elementId, data) => {

  }

  handleStopMoveElement = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.template
      .editElement(
        this.props.id, this.props.prop,
        elementId, { x: data.x, y: data.y }
      );
    this.save();
  }

  handleChangeSizeElement = (e, elementId, position, type) => {
    e.preventDefault();
    e.stopPropagation();

    const element = this.props.elements[elementId];

    if (element.type === 'group') {
      const childs = getAllElementsByGroup(element.elements, this.props.elements);
      core.actions.template
        .resizeGroupElement(
          this.props.id, this.props.prop,
          elementId, position, childs,
        );
    } else {
      core.actions.template
        .editElement(
          this.props.id, this.props.prop,
          elementId, position
        );
    }
    this.save();
  }

  handleClickElement = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.shiftKey && this.props.selectType !== null) {
      if (this.props.selects[elementId] === undefined) {
        const data = { x: Infinity, y: Infinity, w: 0, h: 0 };
        Object
          .keys({ ...this.props.selects, [elementId]: true })
          .forEach(key => {
            const element = this.props.elements[key];
            data.x = Math.min(data.x, element.x);
            data.y = Math.min(data.y, element.y); 
            data.w = Math.max(data.w, element.x + element.w); 
            data.h = Math.max(data.h, element.y + element.h); 
          });
        data.w = data.w - data.x;
        data.h = data.h - data.y;
        core.actions.template
          .selectSome(
            this.props.id, this.props.prop,
            elementId, data
          );
      }
    } else {
      core.actions.template
        .select(
          this.props.id, this.props.prop,
          elementId
        );
    }
  }

  handleContextMenuElement = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();

    e.persist();

    const disabled = {
      '4': Object.keys(this.props.selects).length === 0,
    }

    const pos = { left: e.clientX, top: e.clientY };
    const list = [
      { id: '0', title: 'Block', click: () => this.handleAddElement(e, 'block') },
      { id: '1', title: 'Text', click: () => this.handleAddElement(e, 'text') },
      { id: '2', title: 'Image', click: () => this.handleAddElement(e, 'image') },
    ]
    const scheme = {
      main: [
        { id: '0', title: 'Add Element', children: list },
        { id: '-', type: 'divider' },
        { id: '1', check: '4', title: 'Group', click: this.handleClickGroupElements },
        { id: '2', check: '4', title: 'Ungroup', click: () => this.handleClickUnGroupElement(elementId) },
        { id: '3', type: 'divider' },
        { id: '4', check: '4', title: 'Delete', click: () => this.handleDeleteElement(elementId) }
      ]
    }

    ContextMenu.show(<Menu disabled={disabled} scheme={scheme} />, pos);
  }

  handleClickGroupElements = () => {
    if (this.props.selectType === 'some') {
      const list = [];
      const groupId = getIdElement(0, 'group', this.props.elements);
      let x = Infinity, y = Infinity, w = 0, h = 0;
      Object
        .keys(this.props.selects)
        .forEach(key => {
          const element = this.props.elements[key];
          x = Math.min(x, element.x);
          y = Math.min(y, element.y); 
          w = Math.max(w, element.x + element.w); 
          h = Math.max(h, element.y + element.h); 
          list.push(key) 
        });
      const groupData = { 
        x, y, 
        w: w - x, 
        h: h - y, 
        type: 'group',
        elements: list, 
      };
      core.actions.template
        .groupElements(
          this.props.id, this.props.prop,
          groupId, groupData,
        );
    }
  }

  handleClickUnGroupElement = (elementId) => {
    const list = [];
    const data = { x: Infinity, y: Infinity, w: 0, h: 0 };
    Object
      .keys(this.props.selects)
      .forEach(key => {
        const element = this.props.elements[key];
        data.x = Math.min(data.x, element.x);
        data.y = Math.min(data.y, element.y); 
        data.w = Math.max(data.w, element.x + element.w); 
        data.h = Math.max(data.h, element.y + element.h); 
        if (element.type === 'group') {
          list.push(key);
        }
      });
    data.w = data.w - data.x;
    data.h = data.h - data.y;

    core.actions.template
      .unGroupElements(
        this.props.id, this.props.prop,
        list, data,
      );
  }

  handleRenderElement = (elementId, item) => {
    if (item.type === 'group') {
      return (
        <div
          style={{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            outline: item.groupId ? 'unset' : `1px dashed #6d7882`, 
          }}
        >
          {item.elements.map(id => 
            <Element 
              key={id}
              id={id}
              isGroup
              scale={this.props.settings.scale}
              item={this.props.elements[id]}
              select={this.props.selects[id]}
              selectType={this.props.selectType}  
              onStartMove={this.handleStartMoveElement}
              onMove={this.handleMoveElement}
              onStopMove={this.handleStopMoveElement}
              onChangeSize={this.handleChangeSizeElement}
              onClick={this.handleClickElement}
              onContextMenu={this.handleContextMenuElement} 
              onRenderElement={this.handleRenderElement}
            />
          )}
        </div>
      )
    }
    return elemets(elementId, item)
  }

  handleStartMoveSelectContainer = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();
    
  }

  handleMoveSelectContainer = (e, elementId, data) => {
    if (!this.dragSelectContainer) {
      this.dragSelectContainer = true;
    }
    core.actions.template
      .moveSelectContainer(
        this.props.id, this.props.prop,
        data.x, data.y,
      );
  }

  handleStopMoveSelectContainer = (e, elementId, data) => {
    core.actions.template
      .moveSelectContainer(
        this.props.id, this.props.prop,
        data.x, data.y,
      );
    this.save();
  }

  handleClickBody = (e) => {
    core.actions.template
      .clearSelects(this.props.id, this.props.prop);
  }

  handleClickSelectContainer = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.dragSelectContainer) {
      this.dragSelectContainer = null;
    } else {
      if (e.shiftKey) {
        const elements = window.document.elementsFromPoint(e.clientX, e.clientY);
        let elementId = null;
        
        elements.forEach(i => {
          const attribute = i.getAttribute('elementid');
         
          if (elementId === null && attribute && attribute !== 'select') {
            if (this.props.elements[attribute].groupId) {
              elementId = this.props.elements[attribute].groupId;
            } else {
              elementId = attribute;
            }
          }
        });
    
        if (elementId) {
          this.handleClickElement(e, elementId)
        }
      }
    }
  }

  handleChangeSizeSelectContainer = (e, elementId, position) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.dragSelectContainer) {
      this.dragSelectContainer = true;
    }

    const childs = getAllElementsByGroup(Object.keys(this.props.selects), this.props.elements)
    core.actions.template
      .resizeSelectContainer(
        this.props.id, this.props.prop,
        position, childs,
      );
    this.save();
  }

  handleRenderContentSelectContainer = () => {
    return null;
  }

  handleRenderSelectContainer = () => {
    if (this.props.selectType === 'some') {
      return (
        <Element 
          key="select"
          id="select"
          select
          scale={this.props.settings.scale}
          item={this.props.selectContainer}
          onStartMove={this.handleStartMoveSelectContainer}
          onMove={this.handleMoveSelectContainer}
          onStopMove={this.handleStopMoveSelectContainer}
          onChangeSize={this.handleChangeSizeSelectContainer}
          onClick={this.handleClickSelectContainer}
          onContextMenu={this.handleContextMenuElement} 
          onRenderElement={this.handleRenderContentSelectContainer}
        />
      )
    }
    return null;
  }
  
  linkContainer = (e) => {
    this.container = e;
  } 

  linkSheet = (e) => {
    this.sheet = e;
  } 

  render({ selects, settings, list, elements } = this.props) {
    return (
      <div style={styles.root} onClick={this.handleClickBody}>
        <div 
          ref={this.linkContainer}
          style={styles.container}
          onMouseUp={this.handleMouseUpContainer}
          onMouseDown={this.handleMouseDownContainer}
          onWheel={this.handleMouseWhellContainer}
        >
          <Draggable
            scale={settings.scale} 
            position={settings}
            onDrag={this.handleMoveSheet}
            onStop={this.handleStopMoveSheet}
          >
            <Paper
              ref={this.linkSheet}
              elevation={2} 
              className="parent2" 
              style={{ 
                ...styles.sheet, 
                width: settings.w, 
                height: settings.h,
              }}
              onClick={(e) => this.handleClickSheet(e)}
              onContextMenu={(e) => this.handleContextMenuElement(e, null)}
            >
              {list.map(id => 
                <Element 
                  key={id}
                  id={id}
                  scale={settings.scale}
                  item={elements[id]}
                  select={selects[id]}
                  selectType={this.props.selectType} 
                  onStartMove={this.handleStartMoveElement}
                  onMove={this.handleMoveElement}
                  onStopMove={this.handleStopMoveElement}
                  onChangeSize={this.handleChangeSizeElement}
                  onClick={this.handleClickElement}
                  onContextMenu={this.handleContextMenuElement} 
                  onRenderElement={this.handleRenderElement}
                />
              )}
              {this.handleRenderSelectContainer()}
            </Paper>
          </Draggable>
        </div>
      </div>
    )
  }
}


export default Sheet