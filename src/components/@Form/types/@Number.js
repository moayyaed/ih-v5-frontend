import React from 'react';

import TextField from '@material-ui/core/TextField';

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
  },
}

function _Number(props) {
  if (props.mini) {
    return (
      <input
        className="core"
        style={styles.rootMini} 
        value={props.data} 
        onChange={(e) => props.onChange(props.id, props.options, null, Number(e.target.value))}
      />
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
      onChange={(e) => props.onChange(props.id, props.options, null, Number(e.target.value))}
    />
  )
}


export default React.memo(_Number);