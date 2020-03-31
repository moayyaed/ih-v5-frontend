import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import AppNav from 'components/AppNav';


const styles = {
  dialogContainer: {
    top: 64, 
    width: '100%', 
    height: 'calc(100% - 64px)',
    position: 'absolute',
  }
}

const classes = theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: 'rgb(96, 125, 139)',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialogPaper: {
      position: 'relative',
      minHeight: '80vh',
      maxHeight: '80vh',
  },
});


class AppDialog extends Component {

  componentDidMount() {
   
  }

  handleClose = () => {
    core.transfer.send(this.props.state.transferid, null)
    core.actions.appdialog.data({ open: false })
  }

  render({ id, route, state, classes } = this.props) {

    return (
      <Dialog fullWidth maxWidth="lg" classes={{ paper: classes.dialogPaper }} open={state.open} onClose={this.handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Каналы
            </Typography>
            <Button autoFocus color="inherit" onClick={this.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div style={styles.dialogContainer} >
          <AppNav key="appnav" stateid="msgboxtree" positionPanel="right2" disabledRoute />
        </div>
      </Dialog>
    );
  }
}


const mapStateToProps = createSelector(
  state => state.appdialog,
  (state) => ({ state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppDialog));
