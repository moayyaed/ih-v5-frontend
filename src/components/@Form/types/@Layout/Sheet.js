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
    overflow: 'hidden',
    // backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogPGxpbmUgeDE9IjEwMCIgeTE9IjAiIHgyPSIxMDAiIHkyPSIxMDAiIHN0cm9rZT0iIzc1NzU3NSIgLz4NCiA8bGluZSB4MT0iMCIgeTE9IjEwMCIgeDI9IjEwMCIgeTI9IjEwMCIgc3Ryb2tlPSIjNzU3NTc1IiAvPg0KPC9zdmc+')",
  },
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

function cloneNewStructElements(list, elements, targetElements) {
  const l = [];
  const e = {};

  function group(newId, oldId, check) {
    const gl = [];
    elements[oldId].elements
      .forEach(cid => {
        const mergeElements = { ...targetElements, ...e }
        const id = getIdElement(0, elements[cid].type, mergeElements);
        e[id] = { ...elements[cid], groupId: newId };
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

    if (elements[key].type === 'group') {
      group(id, key);
    }

  });
  return { list: l, elements: e }
}

function getIdElement(index, prefix, elements) {
  if (elements[`${prefix}_${index + 1}`] === undefined) {
    return `${prefix}_${index + 1}`;
  }
  return getIdElement(index + 1, prefix, elements);
}


class Sheet extends Component {

  componentWillUnmount() {
    this.dragSelectContainer = null;
  }

  handleMouseUpContainer = (e) => {

  }

  handleMouseDownContainer = (e) => {

  }

  handleMouseWhellContainer = (e) => {
    const isTouchPad = e.nativeEvent.wheelDeltaY ? 
    e.nativeEvent.wheelDeltaY === -3 * e.nativeEvent.deltaY : e.nativeEvent.deltaMode === 0;

    const offset = this.container.getBoundingClientRect();

    let x = this.props.settings.x.value;
    let y = this.props.settings.y.value;
    let s = this.props.settings.scale.value;

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

    core.actions.layout
      .settings(
        this.props.id, this.props.prop,
        { x: { value: x }, y: { value: y }, scale: { value: s } }
      );
  }

  handleMouseWhellContainer2 = (e) => {
    const isTouchPad = e.nativeEvent.wheelDeltaY ? 
    e.nativeEvent.wheelDeltaY === -3 * e.nativeEvent.deltaY : e.nativeEvent.deltaMode === 0;

    const offset = this.container.getBoundingClientRect();

    let x = this.props.settings.x.value;
    let y = this.props.settings.y.value;
    let s = this.props.settings.scale.value;

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

    core.actions.layout
      .settings(
        this.props.id, this.props.prop,
        { x: { value: x }, y: { value: y }, scale: { value: s } }
      );
  }

  handleMoveSheet = (e) => {
 
  }

  handleStopMoveSheet = (e, data) => {

    if (
      data.x !== this.props.settings.x.value ||
      data.y !== this.props.settings.y.value
    ) {
      core.actions.layout
        .settings(
          this.props.id, this.props.prop,
          { x: { value: data.x }, y: { value: data.y } }
        );
      this.props.save();
    }
  }

  handleStartMoveElement = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleAddElement = (e, type, menuItemId, title) => {
    const elementId = getIdElement(0, type, this.props.elements);

    const rect = this.sheet.getBoundingClientRect();
    const x = (e.pageX - (rect.left * this.props.settings.scale.value)) / this.props.settings.scale.value // (e.clientX - rect.left) / this.props.settings.scale.value;
    const y = (e.pageY - (rect.top * this.props.settings.scale.value)) / this.props.settings.scale.value  // (e.clientY - rect.top) / this.props.settings.scale.value;
    
    const params = getDefaultParamsElement(type);

    const data = {
      type,
      x: { value: Math.round(x * 1e2 ) / 1e2 }, 
      y: { value: Math.round(y * 1e2 ) / 1e2 },
      w: { value: 60 }, h: { value: 60 },
      w2: { value: 60 }, h2: { value: 60 },
    }

    if (type === 'template') {
      core
        .request({ method: 'get_template', params: menuItemId })
        .ok(res => {
          data.links = {};
          data.templateId = menuItemId;
          data.title = title;
          data.w = { value: res.settings.w }; 
          data.h = { value: res.settings.h };
          data.w2 = { value: res.settings.w }; 
          data.h2 = { value: res.settings.h };
          core.actions.layout
            .addTemplate(
              this.props.id, this.props.prop,
              elementId, { ...params, ...data }, menuItemId, res,
            );
          this.props.save();
        });
    } else if (type === 'container') {
      core
        .request({ method: 'get_container', params: menuItemId })
        .ok(res => {
          data.containerId = { id: menuItemId, title: '-' };
          data.title = title;
          data.w = { value: res.container.settings.w.value }; 
          data.h = { value: res.container.settings.h.value };
          data.w2 = { value: res.container.settings.w.value }; 
          data.h2 = { value: res.container.settings.h.value };
          core.actions.layout
            .addContainer(
              this.props.id, this.props.prop,
              elementId, { ...params, ...data }, menuItemId, res.container, res.templates,
            );
          this.props.save();
        });
    } else {
      core.actions.layout
        .addElement(
          this.props.id, this.props.prop,
          elementId, { ...params, ...data },
        );
      this.props.save();
    }
  }

  handleDeleteElement = () => {
    core.actions.layout
      .deleteElement(this.props.id, this.props.prop);
    this.props.save();
  }

  handleMoveElement = (e, elementId, data) => {

  }

  handleStopMoveElement = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      data.x !== this.props.elements[elementId].x.value || 
      data.y !== this.props.elements[elementId].y.value
    ) {
      core.actions.layout
        .editElement(
          this.props.id, this.props.prop,
          elementId, { x: { value: data.x }, y: { value: data.y } }
        );
      this.props.save();
    }
  }

  handleChangeSizeElement = (e, elementId, position, type) => {
    e.preventDefault();
    e.stopPropagation();

    const element = this.props.elements[elementId];

    if (element.type === 'group') {
      const childs = getAllElementsByGroup(element.elements, this.props.elements);
      core.actions.layout
        .resizeGroupElement(
          this.props.id, this.props.prop,
          elementId, position, childs,
        );
    } else {
      core.actions.layout
        .editElement(
          this.props.id, this.props.prop,
          elementId, position
        );
    }
    this.props.save();
  }

  handleClickBody = (e) => {
    core.actions.layout
      .clearSelects(
        this.props.id, this.props.prop,
      );
  }

  handleClickElement = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.shiftKey && this.props.selectType !== null) {
      if (this.props.selects[elementId] === undefined) {
        const data = { 
          x: { value: Infinity }, 
          y: { value: Infinity }, 
          w: { value: 0 }, 
          h: { value: 0 }, 
          zIndex: { value: 0 } 
        };
        Object
          .keys({ ...this.props.selects, [elementId]: true })
          .forEach(key => {
            const element = this.props.elements[key];
            data.x.value = Math.min(data.x.value, element.x.value);
            data.y.value = Math.min(data.y.value, element.y.value); 
            data.w.value = Math.max(data.w.value, element.x.value + element.w.value); 
            data.h.value = Math.max(data.h.value, element.y.value + element.h.value); 
            data.zIndex.value = Math.max(data.zIndex.value, element.zIndex.value); 
          });
        data.w.value = data.w.value - data.x.value;
        data.h.value = data.h.value - data.y.value;

        core.actions.layout
          .selectSome(
            this.props.id, this.props.prop,
            elementId, data
          );
      }
    } else {
      core.actions.layout
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
      'isSelect': this.props.selectOne === 'content' || Object.keys(this.props.selects).length === 0,
      'isPaste': !(core.buffer.class === 'layout'),
      // 'isTemplate': this.props.selectOne ? !(this.props.selectOne && this.props.elements[this.props.selectOne].type === 'template') : false,
    }

    const commands = {
      addContainer: ({ popupid, title }) => this.handleAddElement(e, 'container', popupid, title), 
      // addTemplate: ({ popupid }) => this.handleAddElement(e, 'template', popupid), 
    };

    const pos = { left: e.clientX, top: e.clientY };
    const listElemnts = [
      { id: '0', title: 'Rectangle', click: () => this.handleAddElement(e, 'rectangle') },
      { id: '1', title: 'Circle', click: () => this.handleAddElement(e, 'circle') },
      { id: '2', title: 'Text', click: () => this.handleAddElement(e, 'text') },
      { id: '3', title: 'Image', click: () => this.handleAddElement(e, 'image') },
      { id: '4', title: 'Text & Image', click: () => this.handleAddElement(e, 'text_image') },
      { id: '5', title: 'Button', click: () => this.handleAddElement(e, 'button') },
      { id: '6', type: 'divider' },
      { id: '7', title: 'CCTV', click: () => this.handleAddElement(e, 'cctv') },
    ]
  
    const scheme = {
      main: [
        { id: '1', title: 'Add Element', children: listElemnts },
        { id: '2', title: 'Add Container', type: 'remote', popupid: 'viscont', command: 'addContainer' },
        // { id: '2', title: 'Add Template', type: 'remote', popupid: 'vistemplate', command: 'addTemplate' },
        { id: '3', type: 'divider' },      
        { id: '4', check: 'isSelect', title: 'Group', click: this.handleClickGroupElements },
        { id: '5', check: 'isSelect', title: 'Ungroup', click: () => this.handleClickUnGroupElement(elementId) },
        { id: '6', type: 'divider' },
        { id: '7', check: 'isSelect', title: 'Copy', click: this.handleClickCopyElements },
        { id: '8', check: 'isPaste', title: 'Paste', click: () => this.handleClickPasteElements(e) },
        { id: '9', type: 'divider' },
        { id: '10', check: 'isSelect', title: 'Delete', click: () => this.handleDeleteElement(elementId) },
        // { id: '11', type: 'divider' },
        // { id: '12', check: 'isTemplate', title: 'Edit Template', click: this.handleClickEditTemplate },
      ]
    }

    ContextMenu.show(<Menu disabled={disabled} commands={commands} scheme={scheme} />, pos);
  }

  handleClickGroupElements = () => {
    if (this.props.selectType === 'some') {
      const list = [];
      const groupId = getIdElement(0, 'group', this.props.elements);
      let x = { value: Infinity }, y = { value: Infinity }, w = { value: 0 }, h = { value: 0 };
      Object
        .keys(this.props.selects)
        .forEach(key => {
          const element = this.props.elements[key];
          x.value = Math.min(x.value, element.x.value);
          y.value = Math.min(y.value, element.y.value); 
          w.value = Math.max(w.value, element.x.value + element.w.value); 
          h.value = Math.max(h.value, element.y.value + element.h.value); 
          list.push(key) 
        });
      const params = getDefaultParamsElement('group');
      const groupData = { 
        x, y, 
        w: { value: w.value - x.value }, 
        h: { value: h.value - y.value }, 
        type: 'group',
        elements: list,
        ...params,
      };
      core.actions.layout
        .groupElements(
          this.props.id, this.props.prop,
          groupId, groupData,
        );
      this.props.save();
    }
  }

  handleClickUnGroupElement = (elementId) => {
    const list = [];
    const data = { 
      x: { value: Infinity }, 
      y: { value: Infinity }, 
      w: { value: 0 }, 
      h: { value: 0 },
      zIndex: {},
    };
    Object
      .keys(this.props.selects)
      .forEach(key => {
        const element = this.props.elements[key];
        data.x.value = Math.min(data.x.value, element.x.value);
        data.y.value = Math.min(data.y.value, element.y.value); 
        data.w.value = Math.max(data.w.value, element.x.value + element.w.value); 
        data.h.value = Math.max(data.h.value, element.y.value + element.h.value); 
        if (element.type === 'group') {
          list.push(key);
        }
      });
    data.w.value = data.w.value - data.x.value;
    data.h.value = data.h.value - data.y.value;
    core.actions.layout
      .unGroupElements(
        this.props.id, this.props.prop,
        list, data,
      );
    this.props.save();
  }

  handleClickCopyElements = () => {
    const list = [];
    let x = Infinity, y = Infinity, w = 0, h = 0;
    const elements = Object
      .keys(this.props.selects)
      .reduce((p, c) => {
        list.push(c);
        x = Math.min(x, this.props.elements[c].x.value);
        y = Math.min(y, this.props.elements[c].y.value); 
        w = Math.max(w, this.props.elements[c].x.value + this.props.elements[c].w.value); 
        h = Math.max(h, this.props.elements[c].y.value + this.props.elements[c].h.value); 
        if (this.props.elements[c].type === 'group') {
          const childs = getAllElementsByGroup(this.props.elements[c].elements, this.props.elements);
          return { ...p, ...childs, [c]: { ...this.props.elements[c] } }
        }
        return { ...p, [c]: { ...this.props.elements[c] } }
      }, {})
      
    const buffer = { list, elements, offsetX: x, offsetY: y };
    core.buffer = { class: 'layout', type: null, data: buffer  };
  }

  handleClickPasteElements = (e) => {
    const rect = this.sheet.getBoundingClientRect();
    const x = (e.pageX - (rect.left * this.props.settings.scale.value)) / this.props.settings.scale.value // (e.clientX - rect.left) / this.props.settings.scale.value;
    const y = (e.pageY - (rect.top * this.props.settings.scale.value)) / this.props.settings.scale.value  // (e.clientY - rect.top) / this.props.settings.scale.value;

    const clone = cloneNewStructElements(core.buffer.data.list, core.buffer.data.elements, this.props.elements);
    const elements = Object
      .keys(clone.elements)
      .reduce((p, c) => {
        if (clone.list.includes(c)) {
          return { 
            ...p, 
            [c]: {
              ...clone.elements[c],
              x: { value: x + (clone.elements[c].x.value - core.buffer.data.offsetX) },
              y: { value: y + (clone.elements[c].y.value - core.buffer.data.offsetY) },
            }  
          }
        }
        return { ...p, [c]: clone.elements[c] }
      }, {})
 
    core.actions.layout
      .data(
        this.props.id, this.props.prop,
        { 
          list: this.props.list.concat(clone.list),
          elements: {
            ...this.props.elements,
            ...elements,
          },
        }
      );
    this.props.save();
  }

  handleClickEditTemplate = () => {
    const templateId = this.props.elements[this.props.selectOne].templateId;
    core.route(`vis/vistemplate/vistemplateview/${templateId}/tabVistemplateEditor`);
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
            opacity: item.opacity.value / 100,
            overflow: item.overflow && item.overflow.value ? 'hidden' : 'unset',
          }}
        >
          {item.elements.map(id => 
            <Element 
              key={id}
              id={id}
              isGroup
              grid={this.props.settings.grid.value}
              scale={this.props.settings.scale.value}
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
    if (item.type === 'template') {
      return elemets(item.type, { key: elementId, mode: 'admin', id: elementId, item, template: this.props.templates[item.templateId]})
    }
    if (item.type === 'container') {
      const container = this.props.containers[item.containerId.id];
      const templates = this.props.templates;
      const params = { key: elementId, mode: 'admin', id: elementId, item, container, templates, scaleW: 1, scaleH: 1 }
      return elemets(item.type, params)
    }
    return elemets(item.type, { key: elementId, id: elementId, item })
  }

  handleStartMoveSelectContainer = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();
    
  }

  handleMoveSelectContainer = (e, elementId, data) => {
    if (!this.dragSelectContainer) {
      this.dragSelectContainer = true;
    }
    const x = Math.round(data.x / this.props.settings.grid.value) * this.props.settings.grid.value;
    const y = Math.round(data.y / this.props.settings.grid.value) * this.props.settings.grid.value;

    core.actions.container
      .moveSelectContainer(
        this.props.id, this.props.prop,
        { value: x }, { value: y }
      );
  }

  handleStopMoveSelectContainer = (e, elementId, data) => {
    core.actions.layout
      .moveSelectContainer(
        this.props.id, this.props.prop,
        { value: data.x }, { value: data.y }
      );
    this.props.save();
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
    core.actions.layout
      .resizeSelectContainer(
        this.props.id, this.props.prop,
        position, childs,
      );
    this.props.save();
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
          grid={this.props.settings.grid.value}
          scale={this.props.settings.scale.value}
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
            grid={[1, 1]}
            scale={settings.scale.value} 
            position={{ x: settings.x.value, y: settings.y.value, scale: settings.scale.value }}
            onDrag={this.handleMoveSheet}
            onStop={this.handleStopMoveSheet}
          >
            <Paper
              ref={this.linkSheet}
              elevation={2} 
              className="parent" 
              style={{ 
                ...styles.sheet, 
                width: settings.w.value, 
                height: settings.h.value,
              }}
              onContextMenu={(e) => this.handleContextMenuElement(e, null)}
            >
              {list.map(id => 
                <Element 
                  key={id}
                  id={id}
                  grid={settings.grid.value}
                  scale={settings.scale.value}
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