import React from 'react';

import TextField from '@material-ui/core/TextField';
import CheckboxMui from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = {
  root: {
    margin: 12,
    marginBottom: 0,
  },
  label: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  },
}


function Checkbox(props) {
  return (
    <FormControl style={styles.root} component="fieldset">
      <FormLabel style={styles.label}>{props.options.title}</FormLabel>
      <FormControlLabel
        label=""
        labelPlacement="end"
        value="end"
        control={
          <CheckboxMui 
            color="primary"
            checked={Boolean(props.data)}
            onChange={(e) => props.onChange(props.id, props.options, null, Number(e.target.checked))} 
          />
        }
      />
    </FormControl>
  )
}


export default React.memo(Checkbox);