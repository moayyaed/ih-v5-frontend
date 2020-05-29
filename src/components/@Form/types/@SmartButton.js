import React, { PureComponent } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import Link from '@material-ui/core/Link';

import TextField from '@material-ui/core/TextField';

import LinkIcon from '@material-ui/icons/Link';

const styles = {
  root: {
    margin: 12,
  },
  button: {
    position: 'relative',
  },
}

const classes = theme => ({
  input: {
    display: 'none'
  },
  root: {
    justifyContent: 'space-between',
  },
});


class SmartButton extends PureComponent {


  handleDialogClick = (value) => {
    if (value === null) {
      this.props.onChange(this.props.id, this.props.options, null, null);
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
      core.actions.appdialog.close();
  
      this.props.onChange(this.props.id, this.props.options, null, value)
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
   const params = {
    ...this.props.options.params,
    anchor: this.props.data.anchor,
    nodeid: this.props.route.channel,
    selectnodeid: this.props.data.dialognodeid
   }

    core.transfer.sub('form_dialog', this.handleDialogClick);
    core.actions.appdialog.data({ 
      open: true, 
      transferid: 'form_dialog',
      template: params,
    });
  }

  handleClickForward = (e, deviceid) => {
    e.preventDefault();
    e.stopPropagation();

    core.route(`dev/devices/deviceview/${deviceid}/tabDeviceCommon`);
  }

  render() {
    return (
      <TextField
        id={this.props.options.id} 
        label={this.props.options.title} 
        style={styles.root}
        classes={{ root: this.props.classes.root }}
        InputLabelProps={{ shrink: true }} 
        InputProps={{
          classes: this.props.classes,
          endAdornment: (
            <IconButton onClick={this.handleClick} size="small">
              <LinkIcon fontSize="small" />
            </IconButton>
          ),
          startAdornment: (
            <Link 
              href={`/admin/dev/devices/deviceview/${this.props.data.did}/tabDeviceCommon`}
              onClick={(e) => this.handleClickForward(e, this.props.data.did)}
            >
              {this.props.data.title}
            </Link>
          ),
        }}
        value=""
        error={this.props.cache.error}
        helperText={this.props.cache.error}
        onClick={this.handleClick}
      />
  )
  }
}

export default withStyles(classes)(SmartButton);