import React, { PureComponent } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Hammer from 'hammerjs';
import shortid from 'shortid';

import core from 'core';

import { transform, getElementsLocalVars, getElementsOtherVar, getVscriptParams } from './tools';


const styles = {
  active: {
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    border: '1px solid #F44336',
    background: 'repeating-linear-gradient(45deg, rgba(239, 83, 80, 0.2), rgba(239, 83, 80, 0.2) 10px, rgba(239, 154, 154, 0.2) 10px, rgba(239, 154, 154, 0.2) 20px)',
    opacity: 0.7
  },
  admin: {
    width: '100%', 
    height: '100%', 
  },
  user: {
    width: '100%', 
    height: '100%',
  }
}


function getCommand(cmd) {
  if (cmd === 'device_any') {
    return 'device';
  }
  if (cmd === 'setval_any') {
    return 'setval';
  }
  return cmd;
}

function getParams(item, props) {
  let contextId = null;

  if (item.command === 'device' || item.command === 'device_any') {
    if (item.did === '__device') {
      return { did: core.cache.contexts[props.containerId], prop: item.prop, contextId, layoutId: props.layoutId, containerId: props.containerId || null, elementId: props.templateId }
    }
    return { did: item.did, prop: item.prop, contextId, layoutId: props.layoutId, containerId: props.containerId || null, elementId: props.templateId }
  }
  if (item.command === 'dialog' || item.command === 'dialog_any') {
    if (item.value && item.value.device && item.value.device.id) {
      if (item.value.device.id === '__device') {
        contextId = core.cache.contexts[props.containerId];
      } else {
        contextId = item.value.device.id;
      }
    }
    return { command: 'dialog', id: item.id, contextId, layoutId: props.layoutId, containerId: props.containerId || null, elementId: props.templateId };
  }
  return { ...item.value, id: item.id, contextId, layoutId: props.layoutId, containerId: props.containerId || null, elementId: props.templateId };
}


class Action extends PureComponent {

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

  componentWillUnmount() {
    if (this.mc) {
      this.mc.destroy();
    }
  }

  handleAction = (props, event, actions) => {
    Object
      .keys(actions)
      .forEach(key => {
        if (typeof actions[key] === 'object' && props.id === key) {
          Object
          .keys(actions[key])
          .forEach(key2 => {
            actions[key][key2]
              .forEach(item => {
                if (item.action === event && item.command) {
                  const command = item.command;
                  if (command === 'fullscreen' || command === 'refresh' || command === 'exit' || command === 'close') {
                    if (command === 'close') {
                      core.transfer.send('close_dialog_command');
                    }
                  } else {
                    if (command === 'setval' || command === 'setval_any') {
                      const store = core.store.getState().layout;
                      const data = getElementsLocalVars(store, item)
      
                      core.actions.layout.updateElementsLayout(data);
                      Object
                        .keys(store.containers)
                        .forEach(containerId => core.actions.layout.updateElementsContainer(containerId, data))  
                      const _item = { 
                        ...item, 
                        did: item.did === '__device' ? (props.dialogId ? core.store.getState().layoutDialog.contextId : core.cache.contexts[props.containerId]) : item.did 
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
                        command: getCommand(item.command),
                        ...getParams(item, props)
                      });
                    }
                  }
                }
              });
          })
        }
      });
  }

  handleSingleTap = () => {
    const name = 'singleClickLeft';
    this.handleAction(this.props, name, this.props.actions);
  }

  handleDoubleTap = () => {
    const name = 'doubleClickLeft';
    this.handleAction(this.props, name, this.props.actions);
  }

  handleLongTap = () => {
    const name = 'longClickLeft';
    this.handleAction(this.props, name, this.props.actions);
  }

  handlePressDown = () => {
    const name = 'mouseDownLeft';
    this.handleAction(this.props, name, this.props.actions);
  }

  handlePressUp = () => {
    const name = 'mouseUpLeft';
    this.handleAction(this.props, name, this.props.actions);
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
    this.handleAction(this.props, name, this.props.actions);
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
          style={{ ...styles.user, color: this.props.item.colorRipple.value }}
          onContextMenu={this.handleContextMenu}
        >
        </ButtonBase>
      )
    }
    if (this.props.mode === 'admin') {
      return (
        <div style={styles.admin} />
      )
    }
    return <div style={styles.active} />
  }
}


export default Action;