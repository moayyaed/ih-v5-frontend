import React from 'react';
import core from 'core';

import shortid from 'shortid';
// import Slider from '@material-ui/core/Slider';
import Slider from 'libs/Slider';


import { 
  ValueLabelComponent, 
  IOSSlider, 
  AirbnbThumbComponent, 
  AirbnbSlider, 
  PrettoSlider,
  MaterialSlider,
} from './variants';

import { transform } from '../tools';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
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

  switch(props.item.type) {
    case 'slider_ios':
      return <IOSSlider item={props.item} zoom={props.scale} min={data.min || 0} max={data.max || 100} onChangeCommitted={(e, v) => onChange(props.item, v)} defaultValue={data.value} valueLabelDisplay={props.item.autoHideLabel.value ? 'auto': 'on'} />;
    case 'slider_pretto':
      return <PrettoSlider item={props.item} zoom={props.scale} min={data.min || 0} max={data.max || 100} onChangeCommitted={(e, v) => onChange(props.item, v)} defaultValue={data.value} valueLabelDisplay={props.item.autoHideLabel.value ? 'auto': 'on'} />
    case 'slider_airbnb':
      return <AirbnbSlider mode={props.mode} item={props.item} zoom={props.scale} min={data.min || 0} max={data.max || 100} onChangeCommitted={(e, v) => onChange(props.item, v)} defaultValue={data.value} ThumbComponent={AirbnbThumbComponent} />
    default: 
      return <MaterialSlider item={props.item} zoom={props.scale} min={data.min || 0} max={data.max || 100} onChangeCommitted={(e, v) => onChange(props.item, v)} defaultValue={data.value} valueLabelDisplay={props.item.autoHideLabel.value ? 'auto': 'on'} />;
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
        overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
        visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
      }}
    >
      <div style={{ ...styles.root, pointerEvents: props.mode === 'user' ? 'all' : 'none' }}>
        {getSlider(props)}
      </div>
    </div>
  );
}


export default _Slider;