import React from 'react';


import Text from './@Text';
import _Number from './@Number';
import CheckBox from './@CheckBox';
import Slider from './@Slider';
import SliderCircle from './@SliderCircle';
import Time from './@Time';

import Divider from './@Divider';


function getComponentByType(type) {
  switch (type) {
      case 'text':
        return Text;
      case 'number':
        return _Number;
      case 'cb':
        return CheckBox;
      case 'slider':
        return Slider;
      case 'slider2':
        return SliderCircle;
      case 'time':
        return Time;
      case 'divider':
        return Divider;
    default:
      return Text;
  }
}

function components(key, item, data, onChange) {
  const component = getComponentByType(item.type);
  return React.createElement(component, { key, item, data, onChange });
}


export default components;
