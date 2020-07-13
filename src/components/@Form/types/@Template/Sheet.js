import React, { Component } from 'react';
import core from 'core';

import { ContextMenu } from "@blueprintjs/core";

import Paper from '@material-ui/core/Paper';
import Draggable from 'libs/Draggable';

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
  hiddenZone: {
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 9999,
    background: 'rgba(255, 255, 255, 0.9)',
    outline: '2px solid rgba(255, 255, 255, 0.9)',
  }
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
          [c]: { ...elements[c] },
          ...getAllElementsByGroup(elements[c].elements, elements)
        };
      }
      return {
        ...p,
        [c]: { ...elements[c] },
      };
    }, {});
}

function cloneNewStructElements(list, elements, targetElements, state) {
  const l = [];
  const e = {};
  const o = {};


  function group(newId, oldId, check) {
    const gl = [];
    elements[oldId].elements
      .forEach(cid => {
        const mergeElements = { ...targetElements, ...e }
        const id = getIdElement(0, elements[cid].type, mergeElements);
        e[id] = { ...elements[cid], groupId: newId };
        o[id] = cid;
        gl.push(id)
        if (elements[cid].type === 'group') {
          group(id, cid);
        }
      });
      e[newId].elements = gl;
  }

  list.forEach(key => {
    const mergeElements = { ...targetElements, ...e }
    const id = mergeElements[key] === undefined ? key : getIdElement(0, targetElements[key].type, mergeElements);

    l.push(id);
    e[id] = { ...elements[key] };
    o[id] = key;

    if (elements[key].type === 'group') {
      group(id, key);
    }

  });
  return { list: l, elements: e, old: o }
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
      const store = core.store.getState().apppage.data[this.props.id][this.props.prop];
      save({
        [this.props.id]: {
          [this.props.prop]: store,
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

    s = Math.round(s * 1e2 ) / 1e2;

    if (s > 8) {
      s = 8;
    }
    if (s < 0.1 ) {
      s = 0.1;
    }
  
    x = Math.round((-tx * s + px) / s)
    y = Math.round((-ty * s + py) / s)

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

    s = Math.round(s * 1e2 ) / 1e2;
    
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
    
    const defaultData = getDefaultParamsElement(type);

    const data = {
      type,
      x: Math.round(x * 1e2 ) / 1e2, 
      y: Math.round(y * 1e2 ) / 1e2,
      w: 70, h: 70,
      ...defaultData
    }

    const masterData = {
      x: Math.round(x * 1e2 ) / 1e2, 
      y: Math.round(y * 1e2 ) / 1e2,
      w: 70, h: 70,
      ...defaultData,
    }
    
    core.actions.template
      .addElement(
        this.props.id, this.props.prop,
        elementId, data, masterData,
      );
    this.save();
  }

  handleClickCopyElements = () => {
    const list = [];
    const store = core.store.getState().apppage.data[this.props.id][this.props.prop];
    let x = Infinity, y = Infinity, w = 0, h = 0;
    const elements = Object
      .keys(this.props.selects)
      .reduce((p, c) => {
        list.push(c);
        x = Math.min(x, this.props.elements[c].x);
        y = Math.min(y, this.props.elements[c].y); 
        w = Math.max(w, this.props.elements[c].x + this.props.elements[c].w); 
        h = Math.max(h, this.props.elements[c].y + this.props.elements[c].h); 
        if (this.props.elements[c].type === 'group') {
          const childs = getAllElementsByGroup(this.props.elements[c].elements, this.props.elements);
          return { ...p, ...childs, [c]: { ...this.props.elements[c] } }
        }
        return { ...p, [c]: { ...this.props.elements[c] } }
      }, {})
    const buffer = { list, elements, offsetX: x, offsetY: y, state: store.state };
    core.buffer = { class: 'template', type: null, data: buffer  };
  }

  handleClickPasteElements = (e) => {
    const store = core.store.getState().apppage.data[this.props.id][this.props.prop];
    const rect = this.sheet.getBoundingClientRect();
    const x = (e.pageX - (rect.left * this.props.settings.scale)) / this.props.settings.scale // (e.clientX - rect.left) / this.props.settings.scale;
    const y = (e.pageY - (rect.top * this.props.settings.scale)) / this.props.settings.scale  // (e.clientY - rect.top) / this.props.settings.scale;

    const masterData = {}

    const clone = cloneNewStructElements(core.buffer.data.list, core.buffer.data.elements, this.props.elements, core.buffer.data.state);
    const elements = Object
      .keys(clone.elements)
      .reduce((p, c) => {
        const defaultData = getDefaultParamsElement(clone.elements[c].type);
        masterData[c] = Object
          .keys(defaultData)
          .reduce((p2, c2) => {
            if (clone.elements[c][c2] !== undefined) {
              return { ...p2, [c2]: clone.elements[c][c2] }
            }
            return { ...p2, [c2]: defaultData[c2] }
          }, {})
        if (clone.list.includes(c)) {
          return { 
            ...p, 
            [c]: {
              ...clone.elements[c],
              x: x + (clone.elements[c].x - core.buffer.data.offsetX),
              y: y + (clone.elements[c].y - core.buffer.data.offsetY),
            }  
          }
        }
        return { ...p, [c]: clone.elements[c] }
      }, {})

    core.actions.template
      .pasteElement(
        this.props.id, this.props.prop,
        clone.list, elements, core.buffer.data.state, masterData, 
      );
    
  }

  handleDeleteElement = () => {
    core.actions.template
      .deleteElement(this.props.id, this.props.prop);
  }

  handleMoveElement = (e, elementId, data) => {

  }

  handleStopMoveElement = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();

   const stateId = this.props.selectState;
   const toolbar = this.props.selectToolbar;
   
   if (toolbar === 'tree' || toolbar === 'events') {
    core.actions.template
      .moveElementMaster(
        this.props.id, this.props.prop,
        elementId, { x: data.x, y: data.y }
      );
   }

   if (toolbar === 'vars' && stateId !== 'master') {
    core.actions.template
      .moveElementState(
        this.props.id, this.props.prop,
        elementId, { x: data.x, y: data.y }
      );
   }

   
    this.save();
  }

  handleChangeSizeElement = (e, elementId, position, type) => {
    e.preventDefault();
    e.stopPropagation();

    const stateId = this.props.selectState;
    const toolbar = this.props.selectToolbar;
    const element = this.props.elements[elementId];

    if (toolbar === 'tree' || toolbar === 'events') {
      core.actions.template
        .moveElementMaster(
          this.props.id, this.props.prop,
          elementId, position
        );
     }
  
     if (toolbar === 'vars' && stateId !== 'master') {
      core.actions.template
        .moveElementState(
          this.props.id, this.props.prop,
          elementId, position
        );
     }

    this.save();
    /* if (element.type === 'group') {
      const childs = getAllElementsByGroup(element.elements, this.props.elements);
      core.actions.template
        .resizeGroupElement(
          this.props.id, this.props.prop,
          elementId, position, childs,
        );
    } */
  }

  handleClickElement = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.shiftKey && this.props.selectType !== null) {
      if (this.props.selects[elementId] === undefined) {
        const data = { x: Infinity, y: Infinity, w: 0, h: 0, zIndex: 0 };
        Object
          .keys({ ...this.props.selects, [elementId]: true })
          .forEach(key => {
            const element = this.props.elements[key];
            data.x = Math.min(data.x, element.x);
            data.y = Math.min(data.y, element.y); 
            data.w = Math.max(data.w, element.x + element.w); 
            data.h = Math.max(data.h, element.y + element.h); 
            data.zIndex = Math.max(data.zIndex, element.zIndex); 
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
    const store = core.store.getState().apppage.data[this.props.id][this.props.prop];
    const toolbar = store.toolbarType

    const disabled = {
      '1': toolbar === 'vars',
      'isSelect': true, // (toolbar === 'vars' || toolbar === 'events') || Object.keys(this.props.selects).length === 0,
      'isPaste': true, // (toolbar === 'vars' || toolbar === 'events') || !(core.buffer.class === 'template'),
      '4': true, // (toolbar === 'vars' || toolbar === 'events') || Object.keys(this.props.selects).length === 0,
      '5': toolbar === 'vars' || Object.keys(this.props.selects).length === 0,
    }
    const pos = { left: e.clientX, top: e.clientY };
    const list = toolbar === 'events'? [
      { id: '0', title: 'Action Zone', click: () => this.handleAddElement(e, 'action') },
    ] : [
      { id: '0', title: 'Rectangle', click: () => this.handleAddElement(e, 'rectangle') },
      { id: '1', title: 'Circle', click: () => this.handleAddElement(e, 'circle') },
      { id: '2', title: 'Text', click: () => this.handleAddElement(e, 'text') },
      { id: '3', title: 'Image', click: () => this.handleAddElement(e, 'image') },
      { id: '4', title: 'Text & Image', click: () => this.handleAddElement(e, 'text_image') },
    ]
    const scheme = {
      main: [
        { id: '0', check: '1', title: 'Add Element', children: list },
        { id: '-', type: 'divider' },
        { id: '1', check: '4', title: 'Group', click: this.handleClickGroupElements },
        { id: '2', check: '4', title: 'Ungroup', click: () => this.handleClickUnGroupElement(elementId) },
        { id: '3', type: 'divider' },
        { id: '4', check: 'isSelect', title: 'Copy', click: this.handleClickCopyElements },
        { id: '5', check: 'isPaste', title: 'Paste', click: () => this.handleClickPasteElements(e) },
        { id: '6', type: 'divider' },
        { id: '7', check: '5', title: 'Delete', click: () => this.handleDeleteElement(elementId) }
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
      const defaultData = getDefaultParamsElement('group');
      const groupData = { 
        x, y, 
        w: w - x, 
        h: h - y, 
        type: 'group',
        elements: list,
        ...defaultData,
      };
      const masterData = {
        x, y, 
        w: w - x, 
        h: h - y, 
        ...defaultData,
      }
      core.actions.template
        .groupElements(
          this.props.id, this.props.prop,
          groupId, groupData, masterData,
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
            opacity: item.opacity / 100,
          }}
        >
          {item.elements.map(id => 
            <Element 
              key={id}
              id={id}
              isGroup
              grid={this.props.settings.grid || 10}
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
    return elemets(item.type, { item })
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
          grid={this.props.settings.grid || 10}
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

  handleClicHiddenZone = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleRenderHiddenZone = () => {
    if (this.props.selectToolbar === 'events') {
      return <div onClick={this.handleClicHiddenZone} style={styles.hiddenZone} />
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
            grid={[1, 1]}
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
                  grid={settings.grid || 10}
                  scale={settings.scale}
                  item={elements[id]}
                  select={selects[id]}
                  selectToolbar={this.props.selectToolbar}
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
              {this.handleRenderHiddenZone()}
            </Paper>
          </Draggable>
        </div>
      </div>
    )
  }
}


export default Sheet