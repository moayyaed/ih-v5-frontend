import React from 'react';

import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    margin: 12,
  }
}

function Input(props) {
  return (
    <TextField
      id={props.options.id} 
      label={props.options.title} 
      style={styles.root}
      InputLabelProps={{ shrink: true }} 
      value={props.data}
      error={props.cache.error}
      helperText={props.cache.error}
      onChange={(e) => props.onChange(props.id, props.options, null, e.target.value)}
    />
  )
}


export default Input;