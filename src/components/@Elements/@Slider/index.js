import React from 'react';
import core from 'core';

import shortid from 'shortid';
import Slider from '@material-ui/core/Slider';


import { 
  ValueLabelComponent, 
  IOSSlider, 
  AirbnbThumbComponent, 
  AirbnbSlider, 
  PrettoSlider 
} from './variants';

import { transform } from '../tools';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};


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


function getSlider(props) {
  const data = props.mode === 'user' && props.item.data.value !== undefined ? props.item.data : temp;

  switch(props.item.variant.value.id) {
    case 'ios':
      return <IOSSlider onChangeCommitted={(e, v) => onChange(props.item, v)} defaultValue={data.value} valueLabelDisplay="on" />;
    case 'pretto':
      return <PrettoSlider onChangeCommitted={(e, v) => onChange(props.item, v)} valueLabelDisplay="auto" defaultValue={data.value} />
    case 'airbnb':
      return <AirbnbSlider onChangeCommitted={(e, v) => onChange(props.item, v)} ThumbComponent={AirbnbThumbComponent} defaultValue={data.value} />
    default: 
      return <Slider onChangeCommitted={(e, v) => onChange(props.item, v)} ValueLabelComponent={ValueLabelComponent} defaultValue={data.value} />;
  }
}


function _Slider(props) {
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
        // animation: props.item.animation.active ? props.item.animation.value : 'unset',
        overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
      }}
    >
      <div style={{ ...styles.root, pointerEvents: props.mode === 'user' ? 'all' : 'none' }}>
        {getSlider(props)}
      </div>
    </div>
  );
}


export default _Slider;