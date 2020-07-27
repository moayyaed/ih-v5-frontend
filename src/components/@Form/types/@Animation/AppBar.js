import React from 'react';


import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';


const classes = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: 'rgb(96, 125, 139)',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialog: {
      position: 'relative',
      minHeight: '80vh',
      maxHeight: '80vh',
  },
});


function DialogAppBar(props) {
  return (
    <AppBar className={props.classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={props.onClose} >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={props.classes.title}>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}


export default withStyles(classes)(DialogAppBar);