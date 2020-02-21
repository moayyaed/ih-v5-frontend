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
      onChange={(e) => props.onChange(props.id, props.options, e.target.value, e.target.value)}
    />
  )
}


export default Input;