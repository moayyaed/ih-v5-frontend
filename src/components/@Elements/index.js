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
import Chart from './@Chart';
import CCTV from './@CCTV';
import DeviceLog from './@DeviceLog';
import DeviceSettings from './@DeviceSettings';

import Input from './@Input';
import Slider from './@Slider';
import Checkbox from './@Checkbox';

import Log from './@Log';

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
    case 'expander':
      return Expand;
    case 'chart':
    case 'chart_multi':
      return Chart;
    case 'cctv':
      return CCTV;
    case 'devicelog':
      return DeviceLog;
    case 'devicesettings':
      return DeviceSettings;
    case 'input':
      return Input;
    case 'slider':
      return Slider;
    case 'checkbox':
      return Checkbox;
    case 'log':
      return Log;
    default:
      return Block;
  }
}

function elements(type, params) {
  return React.createElement(getElementByType(type), params);
}


export default elements;