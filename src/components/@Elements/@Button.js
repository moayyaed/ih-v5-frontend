import React, { PureComponent } from 'react';
import core from 'core';

import ButtonBase from '@material-ui/core/ButtonBase';
import Hammer from 'hammerjs';
import shortid from 'shortid';

import { transform, getVscriptParams, getElementsLocalVars, getElementsOtherVar } from './tools';


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

function isElectron() {
  if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
      return true;
  }
  if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
      return true;
  }
  if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
      return true;
  }
  return false;
}

function checkSingle({ left, right }) {
  let check = true;
  Object
    .keys(left)
    .forEach(key => {
      if (left[key].action !== 'singleClickLeft' && left[key].command !== undefined) {
        check = false;
      }
    });
    Object
    .keys(right)
    .forEach(key => {
      if (right[key].action !== 'singleClickRight' && right[key].command !== undefined) {
        check = false;
      }
    });
  return check;
}

function getTextContentStyle(params, scale) {
  return {
    fill: params.textColor.value,
    font: `${params.textItalic.value ? 'italic': ''} ${params.textBold.value ? 'bold' : ''} ${params.textSize.value * (scale || 1)}px ${params.textFontFamily.value.id}`
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

function getBottomYB(pos, ratio, size, h, b) {
  const height = (h - (b * 2));
  switch(pos) {
    case 'top':
    case 'bottom':
      return  height - (height / 100 * ratio) - (size / 2) + 'px';
    default:
      return height - (size / 3.5) + 'px';
  }
}

function getY(v, size, h, b, _imgPosition, _imgRatio) {
  const imgPosition = _imgPosition ? _imgPosition.value.id : 'center';
  const imgRatio = _imgRatio ? _imgRatio.value : 30;
  
  switch(v) {
    case 'top':
    case 'flex-start':
      return size / 2 + 'px';
    case 'bottom':
    case 'flex-end':
      return getBottomYB(imgPosition, imgRatio, size, h, b) 
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

function getTextStyle(props) {
  const imgPosition = props.imgPosition ? props.imgPosition.value.id : 'center';
  return {
    position: imgPosition === 'center' ? 'absolute' : 'static',
    width: getHW(props, 'text', 'w'),
    height: getHW(props, 'text', 'h'),
    display: 'flex',
    overflow: 'hidden',
    pointerEvents: 'none',
    left: 0,
    transform: `rotate(${props.textRotate.value}deg)`,
  };
}

function getImageStyle(props, state) {
  const img = window.__ihp2p ? state.img : props.img.value || '';
  const svg = window.__ihp2p ? state.name.slice(-4) === '.svg' : img.slice(-4) === '.svg';
  const src = img.indexOf('://') !== -1 ? `url(${encodeURI(img)})` : `url(/images/${encodeURI(img)})`
  
  const imgPosition = props.imgPosition ? props.imgPosition.value.id : 'center';

  const base = {
    position: imgPosition === 'center' ? 'absolute' : 'static',
    width: getHW(props, 'img', 'w'),
    height: getHW(props, 'img', 'h'),
  };

  if (svg && (props.imgColor.value !== 'transparent' && props.imgColor.value !== 'rgba(0,0,0,0)')) {
    return {
      ...base,
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
    ...base,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundImage: src,
    transform: `scale(${scale(props.imgSize.value)}) rotate(${props.imgRotate.value}deg)`,
  }
}

function getDirection(position) {
  switch(position) {
    case 'top':
      return 'column';
    case 'bottom':
      return 'column-reverse';
    case 'left':
      return 'row';
    case 'right':
      return 'row-reverse';
    default:
      return null;
  }
}

function getHW(props, type, key) {
  const imgPosition = props.imgPosition ? props.imgPosition.value.id : 'center';
  const imgRatio = props.imgRatio ? props.imgRatio.value : 30;

  if (imgPosition === 'center') {
    return '100%';
  }
  if (imgPosition === 'top' || imgPosition === 'bottom') {
    if (key === 'w') {
      return '100%'
    }
    if (type === 'img') {
      return imgRatio + '%';
    }
    return 100 - imgRatio + '%';
  }
  if (imgPosition === 'left' || imgPosition === 'right') {
    if (key === 'h') {
      return '100%'
    }
    if (type === 'img') {
      return imgRatio + '%';
    }
    return 100 - imgRatio + '%';
  }
}

function ButtonEgine(props, state) {
  const imgPosition = props.item.imgPosition ? props.item.imgPosition.value.id : 'center';
  return (
    <div
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        display: imgPosition === 'center' ? 'block' : 'flex',
        flexDirection: getDirection(imgPosition),
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value * (props.scale || 1)}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value * (props.scale || 1),
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: transform(props.item),
        overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
      }}
    >
      <div style={getImageStyle(props.item, state)} />
      <svg style={getTextStyle(props.item)} >
        <text
          x={getX(props.item.textAlignH.value.id)} 
          y={getY(props.item.textAlignV.value.id, props.item.textSize.value * (props.scale || 1), props.item.h.value, props.item.borderSize.value, props.item.imgPosition, props.item.imgRatio)} 
          textAnchor={getTextAnchor(props.item.textAlignH.value.id)} 
          alignmentBaseline="middle"
          style={getTextContentStyle(props.item, props.scale)}
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
      if (props.dialogId) {
        return { did: store.contextId, prop: item.prop }
      }
      return { did: core.cache.context[props.item.frameid], prop: item.prop }
    }
    return { did: item.did, prop: item.prop }
  }
  if (store.open && store.contextId) {
    if (item.value && item.value.device && item.value.device.id && item.value.device.id !== '-') {
      return { ...item.value, id: item.id, contextId: item.value.device.id };
    }
    return { ...item.value, id: item.id, contextId: store.contextId };
  }
  if (item.command === 'dialog' || item.command === 'dialog_any') {
    if (item.value && item.value.device && item.value.device.id) {
      if (item.value.device.id === '__device') {
        contextId = core.cache.context[props.item.frameid];
      } else {
        contextId = item.value.device.id;
      }
    }
    return { command: 'dialog', id: item.id, contextId };
  }
  return { ...item.value, id: item.id};
}


class Button extends PureComponent {
  state = { name: '', img: '' }

  componentDidMount() {
    if (this.link) {
      this.mc = new Hammer.Manager(this.link);

      if (checkSingle(this.props.item.actions)) {
        this.mc.add(new Hammer.Tap({ event: 'singletap', interval: 0 }));
        this.mc.on('singletap', this.handleSingleTap);
      } else {
        this.mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
        this.mc.add(new Hammer.Tap({ event: 'singletap', interval: 200 }));
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

    if (window.__ihp2p) {
      this.uuid = shortid.generate();
      window.__ihp2p.image(this.uuid, this.props.item.img.value, this.handleLoadImage);
    }
  }

  componentWillUnmount() {
    if (this.mc) {
      this.mc.destroy();
    }

    if (this.uuid) {
      window.__ihp2p.image(this.uuid, null);
      this.uuid = null;
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.item.img.value !== prevProps.item.img.value) {
      if (window.__ihp2p) {
        window.__ihp2p.image(this.uuid, this.props.item.img.value, this.handleLoadImage);
      }
    }
  }

  handleLoadImage = (name, url) => {
    this.setState({ name, img: url })
  }

  otherCommand = (command) => {
    if (command === 'exit') {
      if (isElectron()) {
        const electron = window.require('electron');
        const ipcRenderer  = electron.ipcRenderer;
    
        ipcRenderer.send('exit')
      } else {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('rememberme');
        window.sessionStorage.removeItem('key');
        window.sessionStorage.removeItem('target');
      
        if (window.__ihp2p) {
          clearTimeout(window.__ihp2p.timer);
          window.__ihp2p.close = null;
          window.location.href = "/";
        } else {
          core.network.realtime.destroy();
          core.actions.app.auth(false);
      
          if (core.options.type === 'user') {
            window.location.href = "/";
          } else {
            window.location.href = "/admin";
          }
        }
      }
    }
    if (command === 'fullscreen') {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    }
    if (command === 'refresh') {
      document.location.reload();
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
              } else if (command === 'initdialog') {
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
              } else {
                this.otherCommand(command);
              }      
            } else {
              if (item.command === 'setval' || item.command === 'setval_any') {
                const store = core.store.getState().layout;
                if (item.local) {
                  const data = getElementsLocalVars(store, item)
                  if (window.requestAnimationFrame !== undefined) {
                    window.requestAnimationFrame(() => core.actions.layout.updateElementsAll(data));
                  } else {
                    core.actions.layout.updateElementsAll(data);
                  }
                } else {
                  const _item = { 
                    ...item, 
                    did: item.did === '__device' ? (props.dialogId ? core.store.getState().layoutDialog.contextId : core.cache.context[props.item.frameid]) : item.did 
                  }
                  core.tunnel.command({
                    uuid: shortid.generate(),
                    method: 'action',
                    type:'command',
                    command: item.command === 'setval_any' ? 'setval' : item.command,
                    did: _item.did,
                    prop: item.prop,
                    value: getElementsOtherVar(core.store.getState(), _item)
                  });
                }
              } else if (item.command === 'visscript') {
                core.tunnel.command({
                  uuid: shortid.generate(),
                  method: 'action',
                  type:'command',
                  command: item.command,
                  ...getVscriptParams(item, props)
                });
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
          {ButtonEgine(this.props, this.state)}
        </ButtonBase>
      )
    }
    if (this.props.mode === 'admin') {
      return ButtonEgine(this.props, this.state);
    }
    return ButtonEgine(this.props, this.state);
  }
}


export default Button;