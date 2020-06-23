import React, { Component } from 'react';
import core from 'core';

import { ContextMenu } from "@blueprintjs/core";

import Paper from '@material-ui/core/Paper';
import Draggable from 'components/Draggable';

import Element from './Element';
import Menu from 'components/Menu';

import elemets from 'components/@Elements';
import getDefaultParamsElement from 'components/@Elements/default';
import { red } from '@material-ui/core/colors';


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

  componentDidMount() {
    core.transfer.sub('layout', this.handleTransferData);

  }

  componentWillUnmount() {
    core.transfer.unsub('layout', this.handleTransferData);
    this.isSave = null;
    this.dragSelectContainer = null;
  }

  handleTransferData = (button, save, reset) => {
    if (button === 'save') {
      this.isSave = null;
      const state = core.store.getState().apppage.data[this.props.id][this.props.prop];
      save({
        [this.props.id]: {
          [this.props.prop]: {
            settings: state.settings,
            list: state.list,
            elements: state.elements,
            // templates: state.templates,
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
      core.actions.apppage.data({ save: 'layout' })
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

    core.actions.container
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

    core.actions.container
      .settings(
        this.props.id, this.props.prop,
        { x, y, scale: s }
      );
  }

  handleMoveSheet = (e) => {
 
  }

  handleStopMoveSheet = (e, data) => {
    core.actions.container
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

  handleAddElement = (e, type, templateId) => {
    const elementId = getIdElement(0, type, this.props.elements);

    const rect = this.sheet.getBoundingClientRect();
    const x = (e.pageX - (rect.left * this.props.settings.scale)) / this.props.settings.scale // (e.clientX - rect.left) / this.props.settings.scale;
    const y = (e.pageY - (rect.top * this.props.settings.scale)) / this.props.settings.scale  // (e.clientY - rect.top) / this.props.settings.scale;
    
    const params = getDefaultParamsElement(type);

    const data = {
      type,
      x: Math.round(x * 1e2 ) / 1e2, 
      y: Math.round(y * 1e2 ) / 1e2,
      w: 70, h: 70,
    }

    if (type === 'template') {
      core
        .request({ method: 'get_template', params: templateId })
        .ok(res => {
          data.links = {};
          data.templateId = templateId;
          data.w = res.settings.w; 
          data.h = res.settings.h;
          core.actions.container
            .addTemplate(
              this.props.id, this.props.prop,
              elementId, data, templateId, res,
            );
          this.save();
        });
    } else if (type === 'container') {
      core.actions.container
        .addElement(
          this.props.id, this.props.prop,
          elementId, { ...params, ...data },
        );
    } else {
      core.actions.container
        .addElement(
          this.props.id, this.props.prop,
          elementId, { ...params, ...data },
        );
      this.save();
    }
  }

  handleDeleteElement = () => {
    core.actions.container
      .deleteElement(this.props.id, this.props.prop);
  }

  handleMoveElement = (e, elementId, data) => {

  }

  handleStopMoveElement = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.container
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
      core.actions.container
        .resizeGroupElement(
          this.props.id, this.props.prop,
          elementId, position, childs,
        );
    } else {
      core.actions.container
        .editElement(
          this.props.id, this.props.prop,
          elementId, position
        );
    }
    this.save();
  }

  handleClickBody = (e) => {
    core.actions.container
      .clearSelects(
        this.props.id, this.props.prop,
      );
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
        core.actions.container
          .selectSome(
            this.props.id, this.props.prop,
            elementId, data
          );
      }
    } else {
      core.actions.container
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
      addContainer: ({ popupid }) => this.handleAddElement(e, 'container', popupid), 
      // addTemplate: ({ popupid }) => this.handleAddElement(e, 'template', popupid), 
    };

    const pos = { left: e.clientX, top: e.clientY };
    const listElemnts = [
      { id: '0', title: 'Block', click: () => this.handleAddElement(e, 'block') },
      { id: '1', title: 'Text', click: () => this.handleAddElement(e, 'text') },
      { id: '2', title: 'Image', click: () => this.handleAddElement(e, 'image') },
      { id: '3', type: 'divider' },
      { id: '4', title: 'CCTV', click: () => this.handleAddElement(e, 'cctv') },
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
      core.actions.container
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

    core.actions.container
      .unGroupElements(
        this.props.id, this.props.prop,
        list, data,
      );
  }

  handleClickCopyElements = () => {
    const list = [];
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
      
    const buffer = { list, elements, offsetX: x, offsetY: y };
    core.buffer = { class: 'layout', type: null, data: buffer  };
  }

  handleClickPasteElements = (e) => {
    const rect = this.sheet.getBoundingClientRect();
    const x = (e.pageX - (rect.left * this.props.settings.scale)) / this.props.settings.scale // (e.clientX - rect.left) / this.props.settings.scale;
    const y = (e.pageY - (rect.top * this.props.settings.scale)) / this.props.settings.scale  // (e.clientY - rect.top) / this.props.settings.scale;

    const clone = cloneNewStructElements(core.buffer.data.list, core.buffer.data.elements, this.props.elements);
    const elements = Object
      .keys(clone.elements)
      .reduce((p, c) => {
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
 
    core.actions.container
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
    if (item.type === 'template') {
      return elemets(elementId, item, this.props.templates[item.templateId])
    }
    return elemets(elementId, item, null)
  }

  handleStartMoveSelectContainer = (e, elementId, data) => {
    e.preventDefault();
    e.stopPropagation();
    
  }

  handleMoveSelectContainer = (e, elementId, data) => {
    if (!this.dragSelectContainer) {
      this.dragSelectContainer = true;
    }
    core.actions.container
      .moveSelectContainer(
        this.props.id, this.props.prop,
        data.x, data.y,
      );
  }

  handleStopMoveSelectContainer = (e, elementId, data) => {
    core.actions.container
      .moveSelectContainer(
        this.props.id, this.props.prop,
        data.x, data.y,
      );
    this.save();
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
    core.actions.container
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
              className="parent" 
              style={{ 
                ...styles.sheet, 
                width: settings.w, 
                height: settings.h,
              }}
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