import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

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
  containerMini: {
    display: 'flex',
    height: 22,
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
  let v = parseValue(value, props.data);

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
  let init = props.data;

  function change() {
    if (init > props.options.max) {
      init = props.options.max;
    }
    if (init < props.options.min) {
      init = props.options.min;
    }
    props.onChange(props.id, props.options, null, init)
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


function TouchNumber(props) {
  const step = props.options.step || 1;
  if (props.mini) {
    return (
      <div style={styles.containerMini}>
        <IconButton 
          size="small" 
          style={styles.buttonMini}
          onClick={(e) => props.onChange(props.id, props.options, null, checkValue(props.data - step, props))}
        >
          <ArrowLeftIcon />
        </IconButton>
        <input
          className="core"
          style={styles.rootMini} 
          value={props.data} 
          onChange={(e) => props.onChange(props.id, props.options, null, checkValue(e.target.value, props))}
          onMouseDown={(e) => handleMouseDown(e, props)}
        />
        <IconButton 
          size="small" 
          style={styles.buttonMini}
          onClick={(e) => props.onChange(props.id, props.options, null, checkValue(props.data + step, props))}
        >
          <ArrowRightIcon />
        </IconButton>
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
      onChange={(e) => props.onChange(props.id, props.options, null, checkValue(e.target.value, props))}
    />
  )
}


export default React.memo(TouchNumber);