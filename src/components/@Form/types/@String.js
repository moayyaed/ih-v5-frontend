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
      id={props.options.id} 
      label={props.options.title} 
      style={styles.root}
      InputLabelProps={{ shrink: true }} 
      defaultValue={props.data}
    />
  )
}


export default String;