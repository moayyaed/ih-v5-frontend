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

function TextArea(props) {
  return (
    <TextField
      id={props.id} 
      label={props.title} 
      style={styles.root}
      multiline
      variant="outlined"
      InputProps={{ classes: { root: props.classes.root, input: props.classes.input } }}
      InputLabelProps={{ shrink: true }}
    />
  )
}


export default withStyles(classes)(TextArea);