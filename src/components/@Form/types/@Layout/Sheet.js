import React, { Component } from 'react';
import core from 'core';

import { ContextMenu } from "@blueprintjs/core";

import Paper from '@material-ui/core/Paper';
import Draggable from 'libs/Draggable';

import Element from './Element';
import Menu from 'components/Menu';

import elemets from 'components/@Elements';
import getDefaultParamsElement from 'components/@Elements/default';

import shortid from 'shortid';

const method2 = window.document.body.style.zoom === undefined;


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
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center center',
    // backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogPGxpbmUgeDE9IjEwMCIgeTE9IjAiIHgyPSIxMDAiIHkyPSIxMDAiIHN0cm9rZT0iIzc1NzU3NSIgLz4NCiA8bGluZSB4MT0iMCIgeTE9IjEwMCIgeDI9IjEwMCIgeTI9IjEwMCIgc3Ryb2tlPSIjNzU3NTc1IiAvPg0KPC9zdmc+')",
  },
  mousebox: {
    display: 'none',
    position: 'absolute',
    background: 'rgba(33, 150, 243, 0.2)',
    zIndex: 11000,
    border: '1px solid #90caf9',
  }
}

function checkTarget(str) {
  return (str.toLowerCase() !== 'input' && str.toLowerCase() !== 'textarea')
}

function getAllElementsByGroup(list, elements) {
  return list
    .reduce((p, c) => {
      if (elements[c].type === 'group') {
        return {
          ...p,
          [c]: cloneObject(elements[c]),
          ...getAllElementsByGroup(elements[c].elements, elements)
        };
      }
      return {
        ...p,
        [c]: cloneObject(elements[c]),
      };
    }, {});
}

function getIdElement(index, prefix, elements) {
  if (elements[`${prefix}_${index + 1}`] === undefined) {
    return `${prefix}_${index + 1}`;
  }
  return getIdElement(index + 1, prefix, elements);
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

function getNewID(index, id, list) {
  const temp = id.split('_');
  
  if (temp.length >= 2 && isNaN(Number(temp.slice(-1))) === false) {
    const key = temp.slice(0, temp.length - 1).join('_') + '_' + index;
    if (list[key] === undefined) {
      return key;
    }
    return getNewID(index + 1, id, list);
  } else {
    const key = id + '_' + index;
    if (list[key] === undefined) {
      return key;
    }
    return getNewID(index + 1, id, list);
  }
}

function cloneNewStructElements(list, elements, curentElements) {
  let l = []
  let e = {};

  const blackListId = {};
  const blackListLabel = {};
  const blockList = {
    template: true,
    expander: true,
  }

  Object
    .keys(curentElements)
    .forEach(k => {
      blackListId[k] = true;
      blackListLabel[curentElements[k]._label] = true;
    })

  function group(k, item) {
    const gl = clone(item.elements, k);
    item.elements = gl;
  }
  
  function clone(_list, gkey) {
    const gl = [];
    _list.forEach(k => {
      const item = cloneObject(elements[k]);
  
      let id = k
      let label = item._label;
  
      if (blackListId[id] !== undefined) {
        id = getNewID(1, id, blackListId)
      }
  
      if (blackListLabel[label] !== undefined) {
        label = getNewID(1, label, blackListLabel)
      }
  
      item._label = label;
      
      blackListId[id] = true;
      blackListLabel[label] = true;

      if (gkey) {
        item.groupId = gkey;
      }

      if (item.type === 'group') {
        group(id, item);
      }
      
      if (gkey) {
        gl.push(id);
      } else {
        l.push(id);
      }
      if (blockList[item.type]) {
        const newItem = cloneObject(getDefaultParamsElement('rectangle'));

        newItem.type = 'rectangle';
        newItem._label = item._label + ' (unsupported)';

        newItem.x = item.x;
        newItem.y = item.y;
        newItem.w = item.w;
        newItem.h = item.h;

        newItem.w2 = item.w2;
        newItem.h2 = item.h2;

        if (item.groupId) {
          newItem.groupId = item.groupId;
        }

        e = { ...e, [id]: newItem }
      } else {
        e = { ...e, [id]: item }
      }
    })
    return gl;
  }
  
  clone(list);

  return { list: l, elements: e};
}


class Sheet extends Component {
  state = { move: false, name: '', img: ''  }

  componentDidMount() {
    this.pasteOffset = 1;

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);

    if (window.__ihp2p) {
      this.uuid = shortid.generate();
      window.__ihp2p.image(this.uuid, this.props.settings.backgroundImage.value, this.handleLoadImage);
    }
  }

  componentWillUnmount() {
    this.pasteOffset = null;
    this.dragSelectContainer = null;

    if (this.uuid) {
      window.__ihp2p.image(this.uuid, null);
      this.uuid = null;
    }
    
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleLoadImage = (name, url) => {
    this.setState({ name, img: url })
  }

  handleKeyUp = (e) => {
    if (e.keyCode == '32') {
      document.body.style.cursor = 'auto';
      this.setState({ move: false });
    }
  }
  
  handleKeyDown = (e) => {
    // textarea
    // copy
    if (e.keyCode == '67' && (e.ctrlKey || e.metaKey) && checkTarget(e.target.tagName)) {
      e.preventDefault();
      if (!(this.props.selectOne === 'content' || Object.keys(this.props.selects).length === 0)) {
        this.handleClickCopyElements();
      }
    }
    // paste
    if (e.keyCode == '86' && (e.ctrlKey || e.metaKey) && checkTarget(e.target.tagName)) {
      e.preventDefault();
      if (core.buffer.class === 'graph') {
        this.handleClickPasteElements(null);
      }
    }
    // delete
    if ((e.keyCode === 46 || e.keyCode === 8 && checkTarget(e.target.tagName))) {
      if (!(this.props.selectOne === 'content' || Object.keys(this.props.selects).length === 0)) {
        this.handleDeleteElement(null);
      }
    }

    if (this.state.move === false && e.keyCode == '32') {
      document.body.style.cursor = 'grab'
      this.setState({ move: true });
    }
  }

  handleMouseUpBody = (e) => {
    if (!(e.ctrlKey || e.metaKey)) {
      if (e.button === 0) {
        if (this.mbstart) {
          this.lastDragEventTime = Date.now();
          
          const temp = [];
    
          const s = this.props.settings.scale.value;
          
          const x = (this.mbx - (this.props.settings.x.value * s)) / s;
          const y = (this.mby - (this.props.settings.y.value * s)) / s;
          const w = x + (this.mbw / s);
          const h = y + (this.mbh / s);
    
          this.props.list.forEach(key => {
            const item = this.props.elements[key]
  
            const a = x <= item.x.value;
            const b = y <= item.y.value;
            const c = w >= (item.x.value + item.w.value)
            const d = h >= (item.y.value + item.h.value)
  
            if (a && b && c && d) {
              temp.push(key)
            }
          });
          if (temp.length) {
            if (temp.length === 1) {
              core.actions.container
                .select(this.props.id, this.props.prop, temp[0]);
            } else {
              const data = { 
                x: { value: Infinity }, 
                y: { value: Infinity }, 
                w: { value: 0 }, 
                h: { value: 0 }, 
                zIndex: { value: 0 } 
              };
                temp
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
                .selectMB(
                  this.props.id, this.props.prop,
                  temp.reduce((p, c) => ({ ...p, [c]: true }), {}), data
                );
            }
          }
        } else {
          this.handleClickBody();
        }
    
        this.body.removeEventListener('mousemove', this.handleMouseMove);
    
        this.mousebox.style.display  = 'none';
        this.mousebox.style.top = 0 + 'px';
        this.mousebox.style.left = 0 + 'px';
        this.mousebox.style.height = 0 + 'px';
        this.mousebox.style.width = 0 + 'px';
    
        this.mbstart = false;
    
        this.mbx = 0;
        this.mby = 0;
        this.mbw = 0;
        this.mbh = 0;
      }
    }
  }

  handleMouseDown = (e) => {
    if (!(e.ctrlKey || e.metaKey)) {
      if (e.button === 0) {
        if (!this.state.move) {
          const offset = this.body.getBoundingClientRect();
        
          this.mbinitx = e.pageX - offset.left;
          this.mbinity = e.pageY - offset.top;
          
          this.body.addEventListener('mousemove', this.handleMouseMove)
        }
      }
    }
  }

  handleMouseMove = (e) => {
    const offset = this.body.getBoundingClientRect();
    
    const px = e.pageX - offset.left;
    const py = e.pageY - offset.top;
    
    this.mbx = this.mbinitx < px ? this.mbinitx : px;
    this.mby = this.mbinity < py ? this.mbinity : py;
    this.mbw = this.mbinitx < px ? px - this.mbinitx : this.mbinitx - px;
    this.mbh = this.mbinity < py ? py - this.mbinity : this.mbinity - py;

    if (!this.mbstart && (this.mbw > 8 || this.mbh > 8)) {
      this.mbstart = true
      this.mousebox.style.display  = 'block';
      this.mousebox.style.top = this.mbinity + 'px';
      this.mousebox.style.left = this.mbinitx + 'px';
      this.mousebox.style.height = 0 + 'px';
      this.mousebox.style.width = 0 + 'px';
    }

    if (this.mbstart) {
      this.mousebox.style.top = this.mby + 'px';
      this.mousebox.style.left = this.mbx + 'px';
      this.mousebox.style.height = this.mbh + 'px';
      this.mousebox.style.width = this.mbw + 'px';
    }
  }

  handleMouseUpContainer = (e) => {

  }

  handleMouseDownContainer = (e) => {

  }

  handleMouseWhellContainer = (e) => {
    if (e.altKey) {
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
  }

  handleMouseWhellContainer2 = (e) => {
    if (e.altKey) {
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
    this.lastDragEventTime = Date.now()

    const elementId = getIdElement(0, type === 'container' ? 'frame' : type, this.props.elements);

    const rect = this.sheet.getBoundingClientRect();
    const x = method2 ? (e.clientX - rect.left) / this.props.settings.scale.value :  (e.pageX - (rect.left * this.props.settings.scale.value)) / this.props.settings.scale.value;
    const y = method2 ? (e.clientY - rect.top) / this.props.settings.scale.value : (e.pageY - (rect.top * this.props.settings.scale.value)) / this.props.settings.scale.value;
    
    const params = getDefaultParamsElement(type);

    const data = {
      type,
      _label: elementId,
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
          data.widgetlinks = { link: { id: menuItemId, title: title } };

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

    this.lastDragEventTime = Date.now()

    if (
      data.x !== this.props.elements[elementId].x.value || 
      data.y !== this.props.elements[elementId].y.value
    ) {
      core.actions.layout
        .editElement(
          this.props.id, this.props.prop,
          elementId, { 
            x: { ...this.props.elements[elementId].x, value: data.x }, 
            y: { ...this.props.elements[elementId].y, value: data.y } 
          }
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
    if (!this.state.move) {
      const delta = Date.now() - this.lastDragEventTime;
      if (this.lastDragEventTime === undefined || delta > 300) {
        core.actions.layout
        .clearSelects(
          this.props.id, this.props.prop,
        );
      }
    }
  }

  handleClickElement = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.state.move) {
      if ((e.ctrlKey || e.metaKey) && this.props.selectType !== null && this.props.selectOne !== 'content') {
        const selects = { ...this.props.selects };

        if (this.props.selects[elementId] === undefined) {
          selects[elementId] = true;
        } else {
          delete selects[elementId];
        }

        const selectsList = Object.keys(selects);
  
        if (selectsList.length === 0) {
          core.actions.layout
            .clearSelects(this.props.id, this.props.prop);
        } else if (selectsList.length === 1) {
          core.actions.layout
            .select(this.props.id, this.props.prop, selectsList[0]);
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
            .selectMB(this.props.id, this.props.prop, selects, data);
        }
      } else {
        core.actions.layout
          .select(
            this.props.id, this.props.prop,
            elementId
          );
      }
    }
  }

  handleContextMenuElement = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();

    e.persist();

    const disabled = {
      'isSelect': this.props.selectOne === 'content' || Object.keys(this.props.selects).length === 0,
      'isPaste': !(core.buffer.class === 'graph'),
      'isContainer': this.props.selectOne ? !(this.props.selectOne && this.props.elements[this.props.selectOne] && this.props.elements[this.props.selectOne].type === 'container') : false,
      checkCopyStyle: !(this.props.selectType === 'one' && this.props.selectOne  !== 'content'),
      checkPasteStyle: !(core.styleBuffer && this.props.selectOne !== 'content' && Object.keys(this.props.selects).length !== 0),
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
      // { id: '4', title: 'Text & Image', click: () => this.handleAddElement(e, 'text_image') },
      { id: '5', title: 'Button', click: () => this.handleAddElement(e, 'button') },
      { id: '51', title: 'Iframe', click: () => this.handleAddElement(e, 'iframe') },
      { id: '-', type: 'divider' },
      { id: '6', title: 'Inputs', 
        children: [
          { id: '1', title: 'Input Classic', click: () => this.handleAddElement(e, 'input_classic') },
          { id: '2', title: 'Input Modern', click: () => this.handleAddElement(e, 'input_modern') },
          { id: '3', title: 'Input Filled', click: () => this.handleAddElement(e, 'input_filled') },
          { id: '4', title: 'Input Outlined', click: () => this.handleAddElement(e, 'input_outlined') },
        ]
      },
      { id: '7', title: 'Sliders', 
        children: [
          { id: '1', title: 'Slider Android', click: () => this.handleAddElement(e, 'slider_android') },
          { id: '2', title: 'Slider iOS', click: () => this.handleAddElement(e, 'slider_ios') },
          { id: '3', title: 'Slider Pretto', click: () => this.handleAddElement(e, 'slider_pretto') },
          { id: '4', title: 'Slider Airbnb', click: () => this.handleAddElement(e, 'slider_airbnb') },
        ]
      },
      { id: '8', title: 'Checkbox', click: () => this.handleAddElement(e, 'checkbox') },
      { id: '9', title: 'Device Settings', click: () => this.handleAddElement(e, 'devicesettings') },
      { id: '10', title: 'Device Log', click: () => this.handleAddElement(e, 'devicelog') },
      { id: '11', title: 'Charts', 
        children: [
          { id: '1', title: 'Chart Line', click: () => this.handleAddElement(e, 'chart') },
          { id: '2', title: 'Chart Multiline', click: () => this.handleAddElement(e, 'chart_multi') },
          { id: '3', title: 'Chart Timeline', click: () => this.handleAddElement(e, 'chart_timeline') },
          { id: '4', type: 'divider' },
          { id: '5', title: 'Chart Bar', click: () => this.handleAddElement(e, 'chart_bar') },
        ]
      },
      { id: '12', title: 'Journal', click: () => this.handleAddElement(e, 'journal') },
      { id: '13', title: 'Alert Journal', click: () => this.handleAddElement(e, 'alertlog') },
    ]

    listElemnts.forEach((i, k) => {
      if (core.cache.conf !== 2) {
        if (i.title === 'Journal' || i.title === 'Alert Journal') {
          delete listElemnts[k];
        }
      }

      if (i.title === 'Charts' && !core.cache.modules.multichart) {
        listElemnts[k] = { id: '11', title: 'Chart Line', click: () => this.handleAddElement(e, 'chart') }
      }
    });
  
    const scheme = {
      main: [
        { id: '1', title: 'Добавить элемент', children: listElemnts },
        { id: '2', title: 'Добавить контейнер', type: 'remote', popupid: 'viscont', command: 'addContainer' },
        // { id: '2', title: 'Add Template', type: 'remote', popupid: 'vistemplate', command: 'addTemplate' },
        { id: '3', type: 'divider' },
        { id: '4', check: 'isSelect', title: 'Перепривязать', click: () => this.handleDialogAutoLink(elementId) },
        { id: '5', type: 'divider' },        
        { id: '6', check: 'isSelect', title: 'Сгруппировать', click: this.handleClickGroupElements },
        { id: '7', check: 'isSelect', title: 'Разгруппировать', click: () => this.handleClickUnGroupElement(elementId) },
        { id: '8', type: 'divider' },
        { id: '9', check: 'isSelect', title: 'Копировать', click: this.handleClickCopyElements },
        { id: '10', check: 'isPaste', title: 'Вставить', click: () => this.handleClickPasteElements(e) },
        { id: '11', type: 'divider' },
        { id: '12', check: 'checkCopyStyle', title: 'Копирвоать стиль', click: this.handleCopyStyle},
        { id: '13', check: 'checkPasteStyle', title: 'Вставить стиль', click: this.handlePasteStyle },
        { id: '14', type: 'divider' },
        { id: '15', check: 'isSelect', title: 'Удалить', click: () => this.handleDeleteElement(elementId) },
        { id: '16', type: 'divider' },
        { id: '17', check: 'isContainer', title: 'Редактировать контейнер', click: this.handleClickEditContainer },
      ]
    }

    ContextMenu.show(<Menu disabled={disabled} commands={commands} scheme={scheme} />, pos);
  }

  handleAutoLinkElement = (data, context) => {
    if (data === ':exit:') {
      core.transfer.unsub('form_dialog', this.handleAutoLinkElement);
    } else {
      core.transfer.unsub('form_dialog', this.handleAutoLinkElement);
      core.actions.appdialog.close();
      if (context.component.list && context.component.list.length) {
        const links = {};
        context.component.list.forEach(item => {
          if (item.result && item.result.value) {
            links[item.result.value.prop] = { 
              did: item.result.value.did, 
              title: item.result.title 
            };
          }
        });
        const selects = getAllElementsByGroup(Object.keys(this.props.selects), this.props.elements)
        const elements = Object
          .keys(this.props.elements)
          .reduce((p, c) => {
            if (selects[c]) {
              if (typeof this.props.elements[c] === 'string') {
                return { ...p, [c]: this.props.elements[c] };
              }
              return { 
                ...p, 
                [c]: Object
                  .keys(this.props.elements[c])
                  .reduce((p2, c2) => {
                    const item = this.props.elements[c][c2];
                    if (item && item.enabled) {
                      if (item.did !== '__device' && item.did !== '__devstat' && links[item.prop]) {
                        return { 
                          ...p2, 
                          [c2]: { 
                            ...this.props.elements[c][c2], 
                            did: links[item.prop].did,
                            title: links[item.prop].title,  
                          }  
                        }
                      }
                    }
                    return { ...p2, [c2]: this.props.elements[c][c2] }
                  }, {})
              };
            }
            return { ...p, [c]: this.props.elements[c] }
          }, {})
        core.actions.layout.data(this.props.id, this.props.prop, { elements });
      }
    }
  }

  handleDialogAutoLink = (elementId) => {
    const params = {
      disabledSave: false,
      disableOptions: true, 
      type: 'tree',
      title: 'Выберите устройство', 
      id: 'devices', 
    };
    
    core.transfer.sub('form_dialog', this.handleAutoLinkElement);
    core.actions.appdialog.data({ 
      open: true, 
      transferid: 'form_dialog',
      template: params,
    });
  }


  handleCopyStyle = () => {
    const disabled = {
      actions: true, widgetlinks: true, data: true,
      widget: true, expand: true, data: true,
      control: true, label: true, text: true,
      img: true, x: true, y: true,
      w: true, h: true, w2: true, h2: true,
      type: true, _label: true, groupId: true,
    }

    const element = this.props.elements[this.props.selectOne];

    core.styleBuffer = Object
      .keys(element)
      .reduce((p, c) => {
        if (disabled[c] || element[c].enabled) {
          return p;
        } 
        return { ...p, [c]: cloneObject(element[c]) }
      }, {});
  }

  handlePasteStyle = () => {
    core.actions.layout
      .pasteStyle(
        this.props.id, this.props.prop,
        core.styleBuffer,
      );
    this.props.save();
  }

  handleClickGroupElements = () => {
    if (this.props.selectType === 'some') {
      const list = [];
      const groupId = getIdElement(0, 'group', this.props.elements);
      let x = { value: Infinity }, y = { value: Infinity }, w = { value: 0 }, h = { value: 0 };
      Object
        .keys(this.props.elements)
        .forEach(key => {
          if (this.props.selects[key]) {
            const element = this.props.elements[key];
            x.value = Math.min(x.value, element.x.value);
            y.value = Math.min(y.value, element.y.value); 
            w.value = Math.max(w.value, element.x.value + element.w.value); 
            h.value = Math.max(h.value, element.y.value + element.h.value); 
            list.push(key) 
          }
        });
      const params = getDefaultParamsElement('group');
      const groupData = {
        _label: groupId, 
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
    this.pasteOffset = 1;

    const list = [];
    let elements = {};
    let x = Infinity, y = Infinity, w = 0, h = 0;

    Object
      .keys(this.props.selects)
      .forEach(key => {
        const item = this.props.elements[key];

        if (item.type === 'group') {
          const childs = getAllElementsByGroup(item.elements, this.props.elements);
          elements = { ...elements, ...childs, [key]: cloneObject(item) }
        } else {
          elements = { ...elements, [key]: cloneObject(item) }
        }

        x = Math.min(x, item.x.value);
        y = Math.min(y, item.y.value); 
        w = Math.max(w, item.x.value + item.w.value); 
        h = Math.max(h, item.y.value + item.h.value); 

        list.push(key);
      })

      core.buffer = { class: 'graph', type: null, data: { list, elements, offsetX: x, offsetY: y } };
  }

  handleClickPasteElements = (e) => {
    this.lastDragEventTime = Date.now()

    const rect = this.sheet.getBoundingClientRect();
    
    let x = 10;
    let y = 10;

    if (e === null) {
      const delta = this.pasteOffset * 10;
      if (core.buffer.data.offsetX + delta < this.props.settings.w.value && core.buffer.data.offsetY + delta < this.props.settings.h.value) {
        x = core.buffer.data.offsetX + delta;
        y = core.buffer.data.offsetY + delta;

        this.pasteOffset = this.pasteOffset + 1;
      } else {
        this.pasteOffset = 1;
      }
    } else {
      x = (e.pageX - (rect.left * this.props.settings.scale.value)) / this.props.settings.scale.value // (e.clientX - rect.left) / this.props.settings.scale.value;
      y = (e.pageY - (rect.top * this.props.settings.scale.value)) / this.props.settings.scale.value  // (e.clientY - rect.top) / this.props.settings.scale.value;
    }

    const clone = cloneNewStructElements(core.buffer.data.list, core.buffer.data.elements, this.props.elements);
    
    const selects = {};
    const data = { 
      x: { value: Infinity }, 
      y: { value: Infinity }, 
      w: { value: 0 }, 
      h: { value: 0 }, 
      zIndex: { value: 0 } 
    };

    const elements = Object
      .keys(clone.elements)
      .reduce((p, c) => {
        if (clone.list.includes(c)) {
          const element = {
            ...clone.elements[c],
            x: { value: x + (clone.elements[c].x.value - core.buffer.data.offsetX) },
            y: { value: y + (clone.elements[c].y.value - core.buffer.data.offsetY) },
          };

          selects[c] = true;

          data.x.value = Math.min(data.x.value, element.x.value);
          data.y.value = Math.min(data.y.value, element.y.value); 
          data.w.value = Math.max(data.w.value, element.x.value + element.w.value); 
          data.h.value = Math.max(data.h.value, element.y.value + element.h.value); 
          data.zIndex.value = Math.max(data.zIndex.value, element.zIndex.value); 

          return { ...p, [c]: element }
        }
        return { ...p, [c]: clone.elements[c] }
      }, {})
    
    data.w.value = data.w.value - data.x.value;
    data.h.value = data.h.value - data.y.value;
    
    if (Object.keys(elements).length) {
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
      
      if (Object.keys(elements).length === 1) {
        core.actions.layout
            .select(this.props.id, this.props.prop, Object.keys(elements)[0]);
      } else {
        core.actions.layout
          .selectMB(this.props.id, this.props.prop, selects, data);
      }
      
      this.props.save();
    }
  }

  handleClickEditContainer = () => {
    const containerId = this.props.elements[this.props.selectOne].widgetlinks.link.id;
    core.route(`vis/viscont/viscontview/${containerId}/tabViscontEditor`);
  }

  handleRenderElement = (elementId, item) => {
    if (item.type === 'group') {
      return (
        <div
          style={{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            opacity: item.opacity.value / 100,
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
            overflow: item.overflow && item.overflow.value ? 'hidden' : 'unset',
            visibility: item.visible && item.visible.value == false ? 'hidden' : 'unset',
          }}
        >
          {item.elements.map(id => 
            <Element 
              key={id}
              id={id}
              isGroup
              move={this.state.move}
              grid={this.props.settings.grid.value}
              scale={this.props.settings.scale.value}
              settings={this.props.settings}
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
      const container = this.props.containers[item.widgetlinks.link.id];
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
      if ((e.ctrlKey || e.metaKey)) {
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
          stopevents={!this.state.move}
          move={this.state.move}
          grid={this.props.settings.grid.value}
          scale={this.props.settings.scale.value}
          settings={this.props.settings}
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

  linkBody = (e) => {
    this.body = e;
  } 
  
  linkContainer = (e) => {
    this.container = e;
  } 

  linkSheet = (e) => {
    this.sheet = e;
  } 

  linkMousebox = (e) => {
    this.mousebox = e;
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.settings.backgroundImage.value !== prevProps.settings.backgroundImage.value) {
      if (window.__ihp2p) {
        window.__ihp2p.image(this.uuid, this.props.settings.backgroundImage.value, this.handleLoadImage);
      }
    }
  }

  render({ selects, settings, list, elements } = this.props) {
    const type = settings.backgroundColor.type;
    const img = window.__ihp2p ? this.state.img : settings.backgroundImage.value || '';
    const color = type === 'fill' ? '' : ', ' + settings.backgroundColor.value;
    const src =  img.indexOf('://') !== -1 ? img : '/images/' + img;
    const devcolor = settings.devBackgroundColor ? settings.devBackgroundColor.value : 'rgba(0,0,0,0.25)';
    return (
      <div style={styles.root} ref={this.linkBody} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUpBody}>
        <div ref={this.linkMousebox} style={styles.mousebox} />
        <div 
          ref={this.linkContainer}
          style={styles.container}
          onMouseUp={this.handleMouseUpContainer}
          onMouseDown={this.handleMouseDownContainer}
          onWheel={method2 ? this.handleMouseWhellContainer2 : this.handleMouseWhellContainer}
        >
          <Draggable
            disabled={!this.state.move}
            grid={[1, 1]}
            transform={method2}
            scale={method2 ? 1 : settings.scale.value}
            position={{ x: settings.x.value, y: settings.y.value, scale: settings.scale.value }}
            onDrag={this.handleMoveSheet}
            onStop={this.handleStopMoveSheet}
          >
            <Paper
              ref={this.linkSheet}
              elevation={2} 
              style={{ 
                ...styles.sheet, 
                width: settings.w.value, 
                height: settings.h.value,
                backgroundColor: devcolor,
              }}
              onContextMenu={(e) => this.handleContextMenuElement(e, null)}
            >
              <div style={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: settings.backgroundColor.value,
                backgroundImage:  `url(${encodeURI(src)})${color}`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}>
                <div className="parent" style={{ width: '100%', height: '100%', background: settings.overlayColor.value }}>
                  {list.map(id => 
                    <Element 
                      key={id}
                      id={id}
                      move={this.state.move}
                      grid={settings.grid.value}
                      scale={settings.scale.value}
                      settings={settings}
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
                </div>
              </div>
            </Paper>
          </Draggable>
        </div>
      </div>
    )
  }
}


export default Sheet