import React, { Component } from 'react';
import core from 'core';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import LinkIcon from '@material-ui/icons/Link';

const styles = {
  root: {
    margin: 12,
  },
  button: {
    position: 'relative',
  }
}

function getValue(value) {
  if (value) {
    const temp = value.split('.');
    return `${temp[0].toUpperCase()} --> ${temp[1].toUpperCase()}`
  }
  return '';
}

class Devlink extends Component {


  handleDialogClick = (value) => {
    core.transfer.unsub('form_dialog', this.handleDialogClick);
    core.actions.appdialog.close();

    this.props.onChange(this.props.id, this.props.options, null, value)
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

  render() {
    return (
      <TextField
        id={this.props.options.id} 
        label={this.props.options.title} 
        style={styles.root}
        InputLabelProps={{ shrink: true }} 
        InputProps={{
          endAdornment: (
            <IconButton onClick={this.handleClick} size="small">
              <LinkIcon fontSize="small" />
            </IconButton>
          ),
        }}
        value={getValue(this.props.data.title)}
        error={this.props.cache.error}
        helperText={this.props.cache.error}
        onClick={this.handleClick}
      />
  )
  }
}


export default Devlink;