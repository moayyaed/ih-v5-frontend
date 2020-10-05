import React from 'react';
import Scrollbars2 from 'libs/Scrllbars2';

import Form from './Form';
import { transform } from '../tools';


const styles = {
  root: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
};

const temp = {
  style: {
    margin: 8,
    padding: 16,
  },
  schema: [
    { prop: '_text', type: 'text', size: 14, color: 'red' },
    { prop: '_number', type: 'number', step: 10, min: 0, max: 100, size: 18, color: 'blue' },
    { prop: '_cb', type: 'cb', color: 'orange' },
    { prop: '_slider', type: 'slider', step: 10, min: 0, max: 100, },
    { prop: '_divider', type: 'divider', size: 1, color: 'grey', offsetTop: 16, offsetBottom: 16, },
    { prop: '_number2', type: 'number', title: 'Number:', step: 10, min: 0, max: 100, proportion: '55%' },
    { prop: '_cb2', type: 'cb', title: 'Checkbox:', proportion: '55%' },
    { prop: '_slider2', type: 'slider', title: 'Slider:', proportion: '25%', step: 10, min: 0, max: 100, },
  ],
  data: {
    _text: 'Hello world!',
    _number: 20,
    _cb: false,
    _slider: 20,
    _number2: 50,
    _cb2: true,
    _slider2: 75,
  },
};


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
        <Form settings={temp} />
      </Scrollbars2>
    </div>
  );
}


export default Devicesettings;