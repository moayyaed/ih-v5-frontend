import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import { withStyles } from '@material-ui/core/styles';

import AppBar from './AppBar';


const classes = theme => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialog: {
      background: 'rgb(245, 245, 245)',
      position: 'relative',
      minHeight: '80vh',
      maxHeight: '80vh',
  },
});


function MsgBox(props) {
  return (
    <Dialog 
      fullWidth 
      maxWidth="lg"
      open={props.open}
      classes={{ paper: props.classes.dialog }}  
      onClose={props.onClose}
    >
      <AppBar title="Animation setting" onClose={props.onClose} />
      Test
    </Dialog>
  );
}


export default withStyles(classes)(MsgBox);