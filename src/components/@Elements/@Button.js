import React, { PureComponent } from 'react';
import core from 'core';

import ButtonBase from '@material-ui/core/ButtonBase';
import Hammer from 'hammerjs';
import shortid from 'shortid';

import { transform, getElementsLocalVars, getElementsOtherVar } from './tools';


const styles = {
  span: {
    whiteSpace: 'pre',
    display: 'inline-block',
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  user: {
    width: '100%', 
    height: '100%',
  }
}

function getTextStyle(params) {
  return {
    fill: params.textColor.value,
    font: `${params.textItalic.value ? 'italic': ''} ${params.textBold.value ? 'bold' : ''} ${params.textSize.value}px ${params.textFontFamily.value.id}`
  };
}


function getTextAnchor(v) {
  switch(v) {
    case 'left':
    case 'flex-start':
      return 'start';
    case 'right':
    case 'flex-end':
      return 'end';
    default:
      return 'middle';
  }
}

function getX(v) {
  switch(v) {
    case 'left':
    case 'flex-start':
      return '0%';
    case 'right': 
    case 'flex-end':
      return '100%';
    default:
      return '50%';
  }
}

function getY(v, size, h, b) {
  switch(v) {
    case 'top':
    case 'flex-start':
      return size / 2 + 'px';
    case 'bottom':
    case 'flex-end':
      return (h - (b * 2)) - (size / 2) + 'px';
    default:
      return '50%';
  }
}

function pos(v, type, b) {
  switch(type) {
    case 'top':
    case 'left':
    case 'flex-start':
      return 0
    case 'bottom':
    case 'right': 
    case 'flex-end':
      return v - (b * 2);
    default:
      return (v - (b * 2)) / 2;
  }
}

function scale(value) {
  switch (Math.sign(value)) {
    case 1:
      return (100 + value) / 100;
    case -1:
      return (100 + (value)) / 100;
    default:
      return 1;
  }
}

function getImageStyle(props) {
  const img = props.img.value || '';
  const svg = img.slice(-4) === '.svg';
  const src = img.indexOf('://') !== -1 ? `url(${encodeURI(img)})` : `url(/images/${encodeURI(img)})`

  if (svg && (props.imgColor.value !== 'transparent' && props.imgColor.value !== 'rgba(0,0,0,0)')) {
    return {
      position: 'absolute', 
      width: '100%',
      height: '100%',
      backgroundColor: props.imgColor.value,
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center center',
      WebkitMaskImage: src,
      maskImage: src,
      transform: `scale(${scale(props.imgSize.value)}) rotate(${props.imgRotate.value}deg)`,
    }
  }

  return {
    position: 'absolute', 
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundImage: src,
    transform: `scale(${scale(props.imgSize.value)}) rotate(${props.imgRotate.value}deg)`,
  }
}

function ButtonEgine(props) {
  return (
    <div
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: transform(props.item),
        // animation: props.item.animation.active ? props.item.animation.value : 'unset',
        overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
      }}
    >
      <div
        style={getImageStyle(props.item)}
      />
      <svg 
        style={{
          position: 'absolute', 
          display: 'flex',
          width: '100%', 
          height: '100%', 
          overflow: 'hidden',
          pointerEvents: 'none',
          left: 0,
        }}
      >
        <text
          transform={`rotate(${props.item.textRotate.value} ${pos(props.item.w.value, props.item.textAlignH.value.id, props.item.borderSize.value)} ${pos(props.item.h.value, props.item.textAlignV.value.id,  props.item.borderSize.value)})`}
          x={getX(props.item.textAlignH.value.id)} 
          y={getY(props.item.textAlignV.value.id, props.item.textSize.value, props.item.h.value, props.item.borderSize.value)} 
          textAnchor={getTextAnchor(props.item.textAlignH.value.id)} 
          alignmentBaseline="middle"
          style={getTextStyle(props.item)}
        >
          {props.item.text.value}
        </text>
      </svg>
    </div>
  );
}

function getParams(item, props) {
  let contextId = null;
  const store = core.store.getState().layoutDialog;

  if (item.command === 'device' || item.command === 'device_any') {
    if (item.did === '__device') {
      return { did: store.contextId, prop: item.prop, layoutId: props.layoutId, containerId: props.containerId || null, elementId: props.id }
    }
    return { did: item.did, prop: item.prop, layoutId: props.layoutId, containerId: props.containerId || null, elementId: props.id }
  }
  if (store.open && store.contextId) {
    if (item.value && item.value.device && item.value.device.id && item.value.device.id !== '-') {
      return { ...item.value, id: item.id, contextId: item.value.device.id };
    }
    return { ...item.value, id: item.id, contextId: store.contextId };
  }
  if (item.command === 'dialog') {
    if (item.value && item.value.device && item.value.device.id) {
      contextId = item.value.device.id;
    }
    return { id: item.id, contextId, layoutId: props.layoutId, containerId: props.containerId || null, elementId: props.id };
  }
  return { ...item.value, id: item.id, layoutId: props.layoutId, containerId: props.containerId || null, elementId: props.id };
}


class Button extends PureComponent {

  componentDidMount() {
    if (this.link) {
      
      this.mc = new Hammer.Manager(this.link);

      this.mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
      this.mc.add(new Hammer.Tap({ event: 'singletap', interval: this.props.item.doubleClickLeft === '' ? 100 : 200 }));
      this.mc.add(new Hammer.Press({ event: 'press', time: 400 }));
      this.mc.add(new Hammer.Press({ event: 'pressup' }));

      this.mc.get('doubletap').recognizeWith('singletap');
      this.mc.get('singletap').requireFailure('doubletap');
    
      this.mc.on('singletap', this.handleSingleTap);
      this.mc.on('doubletap', this.handleDoubleTap);
      this.mc.on('press', this.handleLongTap);
      this.mc.on('pressup', this.handlePress);
      
    }
  }

  handleAction = (props, event, actions) => {
    Object
    .keys(actions)
    .forEach(key => {
      actions[key]
        .forEach(item => {
          if (item.action === event && item.command) {
            const command = item.command;
            if (command === 'fullscreen' || command === 'refresh' || command === 'exit' || command === 'close' || command === 'initdialog') {
              if (command === 'close') {
                core.transfer.send('close_dialog_command');
              }
              if (command === 'initdialog') {
                const store = core.store.getState().layoutDialog
                if (store.parentId) {
                  const params = getParams({ id: store.parentId, value: {} }, props);
                  params.contextId = store.initContextId;
                  core.tunnel.command({
                    uuid: shortid.generate(),
                    method: 'action',
                    type:'command',
                    command: 'dialog',
                    ...params,
                  });
                }
              }
            } else {
              if (item.command === 'setval' || item.command === 'setval_any') {
                const store = core.store.getState().layout;
                if (item.local) {
                  const data = getElementsLocalVars(store, item)
  
                  core.actions.layout.updateElementsLayout(data);
                  Object
                    .keys(store.containers)
                    .forEach(containerId => core.actions.layout.updateElementsContainer(containerId, data))
                } else {
                  const _item = { ...item, did: item.did === '__device' ? core.store.getState().layoutDialog.contextId : item.did }
                  core.tunnel.command({
                    uuid: shortid.generate(),
                    method: 'action',
                    type:'command',
                    command: item.command === 'setval_any' ? 'setval' : item.command,
                    did: _item.did,
                    prop: item.prop,
                    value: getElementsOtherVar(store, _item)
                  });
                }
              } else {
                core.tunnel.command({
                  uuid: shortid.generate(),
                  method: 'action',
                  type:'command',
                  command: item.command === 'device_any' ? 'device' : item.command,
                  ...getParams(item, props)
                });
              }
            }
          }
        });
    })
  }

  handleSingleTap = () => {
    const name = 'singleClickLeft';
    this.handleAction(this.props, name, this.props.item.actions);
  }

  handleDoubleTap = () => {
    const name = 'doubleClickLeft';
    this.handleAction(this.props, name, this.props.item.actions);
  }

  handleLongTap = () => {
    const name = 'longClickLeft';
    this.handleAction(this.props, name, this.props.item.actions);
  }

  handlePressDown = () => {
    const name = 'mouseDownLeft';
    this.handleAction(this.props, name, this.props.item.actions);
  }

  handlePressUp = () => {
    const name = 'mouseUpLeft';
    this.handleAction(this.props, name, this.props.item.actions);
  }

  handlePress = (e) => {
    if (e.isFinal) {
      this.handlePressUp(e);
    } else {
      this.handlePressDown(e);
    }
  }

  handleContextMenu = (e) => {
    e.preventDefault();

    const name = 'singleClickRight';
    this.handleAction(this.props, name, this.props.item.actions);
  }

  linked = (e) => {
    this.link = e;
  } 

  render() {
    if (this.props.mode === 'user') {
      return (
        <ButtonBase 
          ref={this.linked} 
          centerRipple 
          style={{ ...styles.user, color: this.props.item.colorRipple.value, visibility: this.props.item.visible && this.props.item.visible.value == false ? 'hidden' : 'unset', }}
          onContextMenu={this.handleContextMenu}
        >
          {React.createElement(ButtonEgine, this.props)}
        </ButtonBase>
      )
    }
    if (this.props.mode === 'admin') {
      return React.createElement(ButtonEgine, this.props);
    }
    return React.createElement(ButtonEgine, this.props);
  }
}



export default Button;