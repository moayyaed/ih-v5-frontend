import React from 'react';

import TextField from '@material-ui/core/TextField';

const styles = {
  root: {
    margin: 12,
  }
}

function InputLink(props) {
  console.log(props.route.type)
  return (
    <TextField
      id={props.options.id} 
      label={props.options.title} 
      style={styles.root}
      InputLabelProps={{ shrink: true, style: props.getStyle(props) }} 
      value={props.data.value}
      error={props.cache && props.cache.error}
      helperText={props.cache && props.cache.error}
      onChange={(e) => props.onChange(props.id, props.options, null, { value: e.target.value })}
    />
  )
}


export default React.memo(InputLink);