import React from 'react';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: 12,
    height: '100%',
  }
}

const classes = theme => ({
  root: {
    height: '100%',
  },
  input: {
    height: '100%!important'
  },
});

function Textarea(props) {
  return (
    <TextField
      multiline
      variant="outlined"
      id={props.options.id} 
      label={props.options.title} 
      style={styles.root}
      InputProps={{ classes: { root: props.classes.root, input: props.classes.input } }}
      InputLabelProps={{ shrink: true }}
      value={props.data}
      error={props.cache.error}
      helperText={props.cache.error}
      onChange={(e) => props.onChange(props.id, props.options, null, e.target.value)}
    />
  )
}


export default withStyles(classes)(Textarea);