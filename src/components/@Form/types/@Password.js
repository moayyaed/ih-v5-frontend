import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import Input from '@material-ui/core/Input';

import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const styles = {
  text: {
    margin: 12,
  },
  adornment: {
    position: 'absolute',
    right: 4,
  },
  passText: {
    padding: 0,
  }
}


function Password(props) {

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  return (
    <FormControl error={props.cache && props.cache.error} style={styles.text} >
      <InputLabel>{props.options.title}</InputLabel>
      <Input
        autoComplete="off"
        type={values.showPassword ? 'text' : 'password'}
        value={props.data}
        onChange={(e) => props.onChange(props.id, props.options, null, e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText >{props.cache && props.cache.error}</FormHelperText>
    </FormControl>
  )
}


export default React.memo(Password);