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
    cursor: 'col-resize',
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

function checkValue(value, oldValue) {
  if (value === '') {
    return 0;
  }
  const v = Number(value);
  if (isNaN(v)) {
    return oldValue;
  }
  return Number(value);
}

function handleMouseDown(e, props) {
  let old = e.clientX;
  let init = props.data;

  function move(e) {
    e.preventDefault()
    const delta = e.clientX - old;
    console.log(delta > 1, delta < 0)
    if(delta > 1 && old !== e.clientX) {
      init = init + 1;
      props.onChange(props.id, props.options, null, init)
    } 
    if(delta < 0 && old !== e.clientX) {
      init = init - 1;
      props.onChange(props.id, props.options, null, init)
    }

    if(old === e.clientX) {
      if (e.clientX === 0) {
        init = init - 1;
        props.onChange(props.id, props.options, null, init)
      } else {
        init = init + 1;
        props.onChange(props.id, props.options, null, init)
      }
    } 
    
    old = e.clientX;
  }

  function up() {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
  
}


function TouchNumber(props) {
  if (props.mini) {
    return (
      <div style={styles.containerMini}>
        <IconButton 
          size="small" 
          style={styles.buttonMini}
          onClick={(e) => props.onChange(props.id, props.options, null, checkValue(props.data, props.data) - 1)}
        >
          <ArrowLeftIcon />
        </IconButton>
        <input
          className="core"
          style={styles.rootMini} 
          value={props.data} 
          onChange={(e) => props.onChange(props.id, props.options, null, checkValue(e.target.value, props.data))}
          onMouseDown={(e) => handleMouseDown(e, props)}
        />
        <IconButton 
          size="small" 
          style={styles.buttonMini}
          onClick={(e) => props.onChange(props.id, props.options, null, checkValue(props.data, props.data) + 1)}
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
      onChange={(e) => props.onChange(props.id, props.options, null, checkValue(e.target.value, props.data))}
    />
  )
}


export default React.memo(TouchNumber);