import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import TextField from '@material-ui/core/TextField';

import LinkIcon from '@material-ui/icons/Link';

const styles = {
  root: {
    margin: 12,
  },
  button: {
    position: 'relative',
  },
  avatar: {
    width: 75,
    borderRadius: 8,
    width: 'unset',
    paddingLeft: 6,
    paddingRight: 6,
  },
  value: {
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 30px)',
    height: 34,
    marginRight: 4,
  },
  stub: {
    color: '#9E9E9E',
    flexShrink: 0,
    marginLeft: 6,
    marginRight: 6,
  },
  chip: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  chip2: {
    borderStyle: 'dashed',
    flexShrink: 0,
  },
  textstub: {
    width: 'calc(100% - 30px)',
    height: 34,
    marginRight: 4,
  }
}

const classes = theme => ({
  input: {
    display: 'none'
  }
});

function getValue(value, onClick) {
  if (value) {
    return (
      <div style={styles.value}>
        <Chip
          size="small"
          style={styles.chip}
          avatar={<Avatar style={styles.avatar}>{value.did}</Avatar>} 
          label="Имя устройства"
          onClick={(e) => onClick(e, value.did)}
        />
        <div style={styles.stub}>--></div>
        <Chip
          size="small"
          variant="outlined"
          style={styles.chip2}
          label={value.prop} 
        />
      </div>
    );
  }
  return <div style={styles.textstub} />;
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

  handleClickChip = (e, deviceid) => {
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
        InputLabelProps={{ shrink: true }} 
        InputProps={{
          classes: { input: this.props.classes.input },
          endAdornment: (
            <IconButton onClick={this.handleClick} size="small">
              <LinkIcon fontSize="small" />
            </IconButton>
          ),
          startAdornment: getValue(this.props.data.value, this.handleClickChip),
        }}
        value=""
        error={this.props.cache.error}
        helperText={this.props.cache.error}
        onClick={this.handleClick}
      />
  )
  }
}

export default withStyles(classes)(Devlink);