import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = {
  content: {
    whiteSpace: 'pre',
  }
}

const classes = theme => ({

});


class AppAlert extends Component {
  state = { open: false, title: '', message: '' }

  componentDidMount () {
    this.accept = null;
    this.cancel = null;
    core.transfer.sub('alert', this.handleCommand);
  }

  componentWillUnmount () {
    this.accept = null;
    this.cancel = null;
    core.transfer.unsub('alert', this.handleCommand);
  }

  handleCommand = (command, title, message, accept, cancel) => {
    if (command === 'show') {
      this.accept = accept;
      this.cancel = cancel;
      this.setState(state => ({ open: true, title: title || '', message: message || '' }));
    }

    if (command === 'close') {
      this.accept = null;
      this.cancel = null;
      this.setState(state => ({ open: false, title: '', message: '' }));
    }
  }

  handleClose = () => {

  }

  handleCancel = () => {
    this.setState(state => ({ open: false }));
    if (this.cancel && typeof this.cancel === 'function') {
      this.cancel();
    }
    this.accept = null;
    this.cancel = null;
  }

  handleAccept = () => {
    this.setState(state => ({ open: false }));
    if (this.accept && typeof this.accept === 'function') {
      this.accept();
    }
    this.accept = null;
    this.cancel = null;
  }

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
      >
        <DialogTitle>{this.state.title}</DialogTitle>
        <DialogContent>
          <DialogContentText style={styles.content}>
            {this.state.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleAccept} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={this.handleCancel} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


export default withStyles(classes)(AppAlert);