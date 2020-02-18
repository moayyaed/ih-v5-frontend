import React from 'react';

import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    margin: 12,
  }
}

function DropList(props) {
  return (
    <TextField
      id={props.id} 
      label={props.title} 
      style={styles.root}
      multiline
      InputLabelProps={{ shrink: true }}
    />
  )
}


export default DropList;