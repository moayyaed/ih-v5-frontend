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
    display: 'flex',
    flexDirection: 'row',
  },
  form: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: 20,
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
  dialog: {
      position: 'relative',
      minHeight: '80vh',
      maxHeight: '80vh',
  },
});


class AppDialog extends Component {

  state = { component: '', nodeid: '' }

  componentDidMount() {
    console.log('!!!')
  }

  handleClickNode = (component, nodeid) => {
    this.setState(state => {
      return {
        ...state,
        component,
        nodeid,
      }
    })
    console.log(component, nodeid);
  }

  handleClose = () => {
    core.transfer.send(this.props.state.transferid, null)
    core.actions.appdialog.data({ open: false })

    this.setState(state => {
      return { component: '', nodeid: '' }
    })
  }

  render({ id, route, state, classes } = this.props) {
    if (state.open) {
      return (
        <Dialog fullWidth maxWidth="lg" classes={{ paper: classes.dialog }} open={state.open} onClose={this.handleClose}>
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
            <AppNav 
              disabledRoute
              key="appnav" 
              stateid="msgboxtree"
              requestId="devices"
              positionPanel="right2" 
              onClickNode={this.handleClickNode}
            />
            <div style={styles.form}>
              <div>{this.state.component}</div>
              <div>{this.state.nodeid}</div>
            </div>
          </div>
        </Dialog>
      );
    }
    return null;
  }
}


const mapStateToProps = createSelector(
  state => state.appdialog,
  (state) => ({ state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppDialog));
