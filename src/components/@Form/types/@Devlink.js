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

class Devlink extends Component {
  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.appdialog.data({ open: true });
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
        value={this.props.data}
        error={this.props.cache.error}
        helperText={this.props.cache.error}
        onClick={this.handleClick}
      />
  )
  }
}


export default Devlink;