import React from 'react';
import core from 'core';

import shortid from 'shortid';

import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';

import { withStyles } from '@material-ui/core/styles';

import { transform } from './tools';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textField: {
    height: '100%',
  }
};

const classes = theme => ({
  root: {
    height: '100%',
  },
  input: {
    height: '100%!important'
  },
});


const temp = { value: 50 };

const onChange = (item, value) => {
  if (item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id) {
    const did = item.widgetlinks.link.id === '__device' ? core.store.getState().layoutDialog.contextId : item.widgetlinks.link.id;
    core.tunnel.command({
      uuid: shortid.generate(),
      method: 'action',
      type:'command',
      command: 'setval',
      did: did,
      prop: item.widgetlinks.link.prop,
      value,
    });
  }
}

function getInput(props) {
  const data = props.mode === 'user' && props.item.data.value !== undefined ? props.item.data : temp;

  if (props.item.variant.value.id === 'minimal') {
    return (
      <InputBase
        defaultValue="abc"
        multiline={props.item.fullHeight.value}
        fullWidth={props.item.fullWidth.value}
        placeholder={props.item.placeholder.value }
        startAdornment={props.item.startAdornment.value !== '' ? <InputAdornment position="start">{props.item.startAdornment.value}</InputAdornment> : null}
        endAdornment={props.item.endAdornment.value !== '' ? <InputAdornment position="end">{props.item.endAdornment.value}</InputAdornment> : null}
      />
    )
  }

  return (
    <TextField
      multiline={props.item.fullHeight.value}
      style={props.item.fullHeight.value ? styles.textField : null}
      fullWidth={props.item.fullWidth.value}
      label={props.item.label.value} 
      variant={props.item.variant.value.id}
      size={props.item.size.value.id}
      defaultValue="abc"
      placeholder={props.item.placeholder.value }
      InputProps={{
        classes: props.item.fullHeight.value ? { root: props.classes.root, input: props.classes.input } : {},
        startAdornment: props.item.startAdornment.value !== '' ? <InputAdornment position="start">{props.item.startAdornment.value}</InputAdornment> : null,
        endAdornment: props.item.endAdornment.value !== '' ? <InputAdornment position="end">{props.item.endAdornment.value}</InputAdornment> : null,
      }}
      InputLabelProps={{ shrink: true }}
    />
  );
}

function Input(props) {
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: transform(props.item),
        overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
        visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
      }}
    >
      <div style={{ ...styles.root, pointerEvents: props.mode === 'user' ? 'all' : 'none' }}>
        {getInput(props)}
      </div>
    </div>
  );
}

export default withStyles(classes)(React.memo(Input));