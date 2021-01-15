import React, { useState } from 'react';
import core from 'core';

import shortid from 'shortid';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';

import { transform } from './tools';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};


const temp = { value: 0 };


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
      value: value ? 1 : 0,
    });
  }
}

function getCheckbox(props, data, setData) {
  if (props.item.labelPlacement.value.id === 'none') {
    return (
      <MuiCheckbox 
        defaultChecked={Boolean(data.value)} 
        onChange={(e) => onChange(props.item, e.target.checked)}
        color="primary"
      />
    )
  }
  return (
    <FormControlLabel
      onChange={(e) => onChange(props.item, e.target.checked)}
      control={<MuiCheckbox color="primary" defaultChecked={Boolean(data.value)}  />}
      label={props.item.label.value}
      labelPlacement={props.item.labelPlacement.value.id}
    />
  )
}

function Checkbox(props) {
  const data = props.mode === 'user' && props.item.data.value !== undefined ? props.item.data : temp;
  
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
      <div style={{ 
        ...styles.root, 
        pointerEvents: props.mode === 'user' ? 'all' : 'none' 
      }}>
        {getCheckbox(props, data)}
      </div>
    </div>
  );
}

export default React.memo(Checkbox)