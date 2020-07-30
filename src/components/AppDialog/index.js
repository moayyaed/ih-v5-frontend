import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';


import AppBar from './AppBar';
import template from './templates/index';
// import components from './types';


const styles = {
  container: {
    top: 64, 
    width: '100%', 
    height: 'calc(100% - 64px)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
  }
}

const classes = theme => ({
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


function AppDialog(props) {


  if (props.state.open) {
    return (
      <Dialog 
        fullWidth 
        maxWidth="lg"
        open={props.state.open}
        classes={{ paper: props.classes.dialog }}  
      >
        <AppBar
          type={props.state.template.type}
          noclose={props.state.template.noclose} 
          title={props.state.template.title} 
        />
        <div style={styles.container} >
          {template(props.state)}
        </div>
      </Dialog>
    );
  }
  return null;
}


const mapStateToProps = createSelector(
  state => state.appdialog,
  (state) => ({ state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppDialog));