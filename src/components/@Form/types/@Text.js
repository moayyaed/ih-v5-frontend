import React from 'react';

import TextField from '@material-ui/core/TextField';
/*
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
*/

const styles = {
  root: {
    margin: 12,
    
  },
  label: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  input: {
    color: 'rgba(0, 0, 0, 0.87)',
  }
}


function Text(props) {
  return (
    <TextField
      disabled
      id={props.options.id} 
      label={props.options.title} 
      style={styles.root}
      InputLabelProps={{ shrink: true }} 
      value={props.data}
      error={props.cache && props.cache.error}
      helperText={props.cache && props.cache.error}
    />
  )
}


export default React.memo(Text);