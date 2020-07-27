import React, { Component } from 'react';
import core from 'core';

import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


import ButtonMenu from 'components/@Form/types/@ButtonMenu';


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

function parseValue(value, oldValue) {
  if (value === '') {
    return 0;
  }
  const v = Number(value);
  if (isNaN(v)) {
    return oldValue;
  }
  return Number(value);
}

function checkValue(value, props) {
  let v = parseValue(value, props.data.value);

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
        onMouseUp={this.handleMouseUp}
      >
        {this.props.type === 'left' ? <ArrowLeftIcon /> :  <ArrowRightIcon />}
      </IconButton>
    )
  }
}


// onMouseDown={(e) => handleMouseDown(e, props)}
function TouchNumber(props) {
  const handleClickButton = (title, id, value) => {
    if (title === null) {
      props.onChange(props.id, props.options, null, { _bind: null, title: null, number: null, value: props.data.number || 0 })
    } else {
      props.onChange(props.id, props.options, null, { _bind: id, title, value, number: props.data.value })
    }
  };

  const step = props.options.step || 1;
  if (props.mini) {
    if (props.data._bind) {
      return (
        <div style={styles.containerMini}>
          <input
            className="core"
            style={styles.rootMini2} 
            disabled={true}
            value={props.data.title}
          />
          <ButtonMenu 
            enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
            icon={props.data._bind} 
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
          onClick={v => props.onChange(props.id, props.options, null, { ...props.data, value: checkValue(props.data.value - v, props) })} 
        />
        <input
          className="core"
          style={styles.rootMini} 
          value={props.data.value} 
          onChange={(e) => props.onChange(props.id, props.options, null, { ...props.data, value: checkValue(e.target.value, props) })}
        />
        <Button
          type="right" 
          step={step}
          onClick={v => props.onChange(props.id, props.options, null, { ...props.data, value: checkValue(props.data.value + v, props) })} 
        />
        <ButtonMenu 
          enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
          icon={props.data._bind} 
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