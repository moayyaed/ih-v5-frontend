import React from 'react';

import ButtonMui from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: 12,
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

function Button(props) {
  return (
    <ButtonMui style={styles.root} variant="contained" color="primary">
      {props.options.title}
    </ButtonMui>
  )
}


export default withStyles(classes)(React.memo(Button));