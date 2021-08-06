import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';

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


const useStyles = makeStyles({
  dialog: props => {
    if (props.style) {
      return {
        position: 'relative',
        width: props.style.width,
        minHeight: props.style.height,
        maxHeight: props.style.height,
      }
    }
    return {
      position: 'relative',
      minHeight: '85vh',
      maxHeight: '85vh',
    }
  },
});


function AppDialog(props) {
  const classes = useStyles(props.state.template);
  if (props.state.open) {
    return (
      <Dialog 
        fullWidth 
        maxWidth="lg"
        open={props.state.open}
        classes={{ paper: classes.dialog }}  
      >
        <AppBar
          type={props.state.template.type}
          disabledSave={props.state.template.disabledSave}
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

export default connect(mapStateToProps)(AppDialog);