import React from 'react';


import Block from './@Block';
import Text from './@Text';
import Image from './@Image';
import Button from './@Button';
import TextImage from './@TextImage';
import Action from './@Action';
import Action2 from './@Action2';
import Expand from './@Expand';

import Container from './@Container';
import Template from './@Template';
import CCTV from './@CCTV';
import DeviceLog from './@DeviceLog';
import DeviceSettings from './@DeviceSettings';

import Slider from './@Slider';


function getElementByType(type) {
  switch (type) {
    case 'text':
      return Text;
    case 'image':
      return Image;
    case 'button':
      return Button;
    case 'container':
      return Container;
    case 'template':
      return Template;
    case 'text_image':
      return TextImage;
    case 'action':
      return Action;
    case 'action2':
      return Action2;
    case 'expand':
      return Expand;
    case 'cctv':
      return CCTV;
    case 'devicelog':
      return DeviceLog;
    case 'devicesettings':
      return DeviceSettings;
    case 'slider':
      return Slider;
    default:
      return Block;
  }
}

function elements(type, params) {
  return React.createElement(getElementByType(type), params);
}


export default elements;