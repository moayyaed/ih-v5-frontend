import React from 'react';
import core from 'core';

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
import ContainerProd from './@ContainerProd';
import TemplateProd from './@TemplateProd';
import Chart from './@Chart';
import ChartTimeline from './@ChartTimeline';
import CCTV from './@CCTV';
import DeviceLog from './@DeviceLog';
import DeviceSettings from './@DeviceSettings';

import Input from './@Input';
import Slider from './@Slider';
import Checkbox from './@Checkbox';

import Journal from './@Journal';
import AlertLog from './@AlertLog';

import ChartBar from './@ChartBar';
import Iframe from './@Iframe';
import Html from './@Html';

function getElementByType(type) {
  if (core.options.type === 'user') {
    switch (type) {
      case 'container':
        return ContainerProd;
      case 'template':
        return TemplateProd;
    }
  }
  switch (type) {
    case 'text':
      return Text;
    case 'image':
      return Image;
    case 'button':
      return Button;
    case 'dialog':
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
    case 'chart_timeline':
      return ChartTimeline;
    case 'cctv':
      return CCTV;
    case 'devicelog':
      return DeviceLog;
    case 'devicesettings':
      return DeviceSettings;
    case 'input':
    case 'input_classic':
    case 'input_modern':
    case 'input_filled':
    case 'input_outlined':
      return Input;
    case 'slider':
    case 'slider_android':
    case 'slider_ios':
    case 'slider_pretto':
    case 'slider_airbnb':
      return Slider;
    case 'checkbox':
      return Checkbox;
    case 'journal':
      return Journal;
    case 'alertlog':
      return AlertLog;
    case 'chart_bar':
      return ChartBar;
    case 'iframe':
      return Iframe;
    case 'html':
      return Html;
    default:
      return Block;
  }
}

function elements(type, params) {
  return React.createElement(getElementByType(type), params);
}


export default elements;