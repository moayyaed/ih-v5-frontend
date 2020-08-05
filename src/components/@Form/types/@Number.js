import React, { Component } from 'react';
import core from 'core';

import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import ButtonMenu from 'components/@Form/types/@ButtonMenu';

import shortid from 'shortid';

import { createValueFunc, options } from 'components/tools';


const styles = {
  root: {
    margin: 12,
  },
  rootMini: {
    fontSize: 13,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
    marginLeft: 4,
    marginRight: 4,
    textAlign: 'center',
  },
  rootMini2: {
    fontSize: 13,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: 'rgb(48, 84, 150)',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
    fontWeight: 'bold',
  },
  containerMini: {
    display: 'flex',
    height: 22,
    width: '100%',
  },
  buttonMini: {
    width: 22,
    height: 22,
  }
}

const defaultFunction = 'return inData;';


function parseValue(value, oldValue) {
  if (value === '') {
    return 0;
  }
  const v = Number(value);
  if (isNaN(v)) {
    return oldValue || 0;
  }
  return Number(value);
}

function checkValue(value, props) {
  const data = props.data !== undefined ? props.data : { value: 0 }
  let v = parseValue(value, data.value);

  if (v > props.options.max) {
    v = props.options.max;
  }
  if (v < props.options.min) {
    v = props.options.min;
  }

  return v;
}

function handleMouseDown(e, props) {

  let drag = false;
  let old = e.clientX;
  let init = props.data.value;

  function change() {
    if (init > props.options.max) {
      init = props.options.max;
    }
    if (init < props.options.min) {
      init = props.options.min;
    }
    props.onChange(props.id, props.options, null, { value: init })
  }

  function move(e) {
    if (drag === false) {
      drag = true;
      e.preventDefault()
      e.target.style.cursor = 'col-resize';
    }
    
    
    const delta = e.clientX - old;
    const limit = ( e.clientX === window.screen.width - 1 || e.clientX === 0)
    const step = props.options.step ? props.options.step : Math.round(Math.abs(e.movementX) / 2.5) ||  1;

    if (limit) {
      if (e.clientX === 0) {
        init = init - (step);
      } else {
        init = init + (step);
      }
      change(init)
    } else {
      if (delta > 0) {
        init = init + (step);
        change(init)
      } 
      if (delta < 0) {
        init = init - (step);
        change(init)
      }
    }

    old = e.clientX;
  }

  function up(e) {
    e.target.style.cursor = 'auto';
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
  
}


class Button extends Component {

  handleMouseDown = () => {
    this.long = false;
    document.addEventListener('mouseup', this.handleMouseUp)
    this.timer = setTimeout(this.handleLong, 250);
  }

  handleMouseUp = () => {
    if (this.long === false) {
      this.props.onClick(this.props.step);
    }
    
    this.clear();
  }

  handleLong = () => {
    this.long = true;
    this.timer2 = setInterval(() => this.props.onClick(this.props.step), 100)
  }

  clear = () => {
    document.removeEventListener('mouseup', this.handleMouseUp)

    clearTimeout(this.timer);
    clearInterval(this.timer2);

    this.long = null;
    this.timer = null;
    this.timer2 = null;
  }

  render() {
    return (
      <IconButton 
        size="small"
        className="nb" 
        style={styles.buttonMini}
        onMouseDown={this.handleMouseDown}
      >
        {this.props.type === 'left' ? <ArrowLeftIcon /> :  <ArrowRightIcon />}
      </IconButton>
    )
  }
}


function TouchNumber(props) {
  const handleClickButton = (value) => {
    if (value === null) {
      props.onChange(props.id, props.options, null, { ...props.data, enabled: false, number: null, value: props.data.number || 0 })
    } else {
      if (props.route.type) {
        const store = core.store.getState().apppage.data.p1.template;
        const list = store.listState.map(id => ({ id, title: store.state[id].title, value: store.state[id].curent }));
        const item = list.find(i => i.id === props.data._bind);
        
        core.transfer.sub('form_dialog', handleDialogClick);
        core.actions.appdialog.data({
          id: 'animation', 
          open: true, 
          transferid: 'form_dialog',
          template: {
            noclose: true,
            type: 'form',
            title: 'Binding Settings',
            options: options(list),
            data: { 
              p1: { bind: { ...item  } }, 
              p2: { func: props.data.func || defaultFunction },
            },
            cache: { p1: {}, p2: {} },
          },
        });
      } else {
        core.transfer.sub('form_dialog', handleDialogClick3);
        core.actions.appdialog.data({
          id: 'animation', 
          open: true, 
          transferid: 'form_dialog',
          template: {
            noclose: true,
            noscroll: true,
            title: 'Binding Settings',
            type: 'tree',
            id: 'elements',
            selectnodeid: props.data.did,
            selectId: props.data.prop,
            title: props.data.title,
            func: props.data.func || defaultFunction,
          },
        });
      }
    }
  };

  const handleDialogClick3 = (data) => {
    if (data !== null && data !== ':exit:') {
      const did = data.did;
      const prop  = data.prop;
      const title = data.title;
      const func = data.func;

      if (prop) {
        const obj = createValueFunc(func);

        if (obj.error) {
          core.actions.app.alertOpen('warning', 'Function error: ' + obj.error.message);
        } else { 
          try {
            const v = obj.body.call(null, 0, {})
            const params = { ...props.data, enabled: true, did, prop, title, func };

            core.transfer.unsub('form_dialog', handleDialogClick3);
            core.actions.appdialog.close();
      
            props.onChange(props.id, props.options, null, params)
          } catch(e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      } else {
        const params = { ...props.data, enabled: null, prop: null, title: null, func };

        core.transfer.unsub('form_dialog', handleDialogClick3);
        core.actions.appdialog.close();

        props.onChange(props.id, props.options, null, params)
      }
    } else {
      core.transfer.unsub('form_dialog', handleDialogClick3);
    }
  }


  const handleDialogClick = (data) => {
    if (data !== null && data !== ':exit:') {
      const id  = data.bind.id || null;
      const title = data.bind.title; 
      const value = data.bind.value; 
      const func = data.func || defaultFunction;
      const uuid = shortid.generate();

      if (id) {
        const obj = createValueFunc(func);
        if (obj.error) {
          core.actions.app.alertOpen('warning', 'Function error: ' + obj.error.message);
        } else {
          try {
            const store = core.store.getState().apppage.data.p1.template;
            const vars = store.listState.reduce((p, c) => ({ ...p, [store.state[c].title]: store.state[c].curent }), {});
            const v = obj.body.call(null, value, vars)
            
            if (core.cache.functions[props.data.uuid] !== undefined) {
              delete core.cache.functions[props.data.uuid]
            }
            
            core.cache.functions[uuid] = obj.body;
            core.transfer.unsub('form_dialog', handleDialogClick);
            core.actions.appdialog.close();
            
            props.onChange(props.id, props.options, null, { enabled: true, uuid, _bind: id, title, value: v, func, number: props.data.value })
          } catch (e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      }  else {
        core.transfer.unsub('form_dialog', handleDialogClick);
        core.actions.appdialog.close();
        props.onChange(props.id, props.options, null, { enabled: false, _bind: null, title: null, number: null, func, value: props.data.number || 0 })
      }
    } else {
      core.transfer.unsub('form_dialog', handleDialogClick);
    }
  }

  const step = props.options.step || 1;
  if (props.mini) {
    const data = props.data !== undefined ? props.data : { value: 0 };
    if (data.enabled) {
      return (
        <div style={styles.containerMini}>
          <input
            className="core"
            style={styles.rootMini2} 
            disabled={true}
            value={data.title}
          />
          <ButtonMenu 
            enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
            icon={data.enabled} 
            onChange={handleClickButton} 
          />
        </div>
      )
    }
    return (
      <div style={styles.containerMini}>
        <Button
          type="left" 
          step={step}
          onClick={v => props.onChange(props.id, props.options, null, { ...data, value: checkValue(data.value - v, props) })} 
        />
        <input
          className="core"
          style={styles.rootMini} 
          value={data.value} 
          onChange={(e) => props.onChange(props.id, props.options, null, { ...data, value: checkValue(e.target.value, props) })}
        />
        <Button
          type="right" 
          step={step}
          onClick={v => props.onChange(props.id, props.options, null, { ...data, value: checkValue(data.value + v, props) })} 
        />
        <ButtonMenu 
          enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
          icon={data.enabled} 
          onChange={handleClickButton} 
        />
      </div>
    )
  }
  return (
    <TextField
      id={props.options.id} 
      label={props.options.title} 
      style={styles.root}
      InputLabelProps={{ shrink: true, style: props.getStyle(props) }} 
      value={props.data}
      error={props.cache && props.cache.error}
      helperText={props.cache && props.cache.error}
      onChange={(e) => props.onChange(props.id, props.options, null, { ...props.data, value: checkValue(e.target.value, props) })}
    />
  )
}


export default React.memo(TouchNumber);