import React from 'react';
import Scrollbars2 from 'libs/Scrllbars2';

import { transform } from '../tools';


const styles = {
  root: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  stepper: {
    background: 'unset',
  },
  step: {
    // marginTop: -34,
  },
  steplabel: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 600,
  },
  stepcontent: {
    whiteSpace: 'pre-line',
  },
  stepicon: {
    color: 'rgb(158, 158, 158)',
  },
};

const temp = [
];


function Devicesettings(props) {
  const data = props.mode === 'user' ? props.item.data : temp;
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
      <Scrollbars2
        scrollX={props.mode === 'user'}
        scrollY={props.mode === 'user'}
      >
        <div>DEVICE_SETTINGS</div>
      </Scrollbars2>
    </div>
  );
}


export default Devicesettings;