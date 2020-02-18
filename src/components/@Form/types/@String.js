import React from 'react';

import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    margin: 12,
  }
}

function String(props) {
  return (
    <TextField
      id={props.id} 
      label={props.title} 
      style={styles.root}
      InputLabelProps={{ shrink: true }} 
    />
  )
}


export default String;