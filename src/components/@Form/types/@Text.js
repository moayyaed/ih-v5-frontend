import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

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
    <FormControl disabled style={styles.root}>
      <InputLabel shrink style={styles.label}>{props.options.title}</InputLabel>
      <Input disableUnderline style={styles.input} value={props.data} />
    </FormControl>
  )
}


export default Text;