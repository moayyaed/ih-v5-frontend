import React from 'react';

import Text from './@Text';
import Header from './@Header';
import Input from './@Input';
import Checkbox from './@Checkbox';
import Textarea from './@Textarea';
import Droplist from './@Droplist';
import Tags from './@Tags';
import Color from './@Color';
import Slider from './@Slider';
import Url from './@Url';

import Layout from './@Layout';
import Container from './@Container';
import Template from './@Template';
import SmartButton from './@SmartButton';
import Table from './@Table';
import Code from './@Code';
import Script from './@Script';
import PluginForm1 from './@PluginForm1';


function getComponentByType(type) {
  switch (type) {
    case 'text':
      return Text;
    case 'cb':
      return Checkbox;
    case 'header':
      return Header;
    case 'input':
      return Input;
    case 'textarea':
      return Textarea;
    case 'table':
      return Table;
    case 'droplist':
      return Droplist;
    case 'tags':
      return Tags;
    case 'color':
      return Color;
    case 'slider':
      return Slider;
    case 'url':
      return Url;
      
    case 'layout':
      return Layout;
    case 'container':
      return Container;
    case 'template':
      return Template;
    case 'smartbutton':
      return SmartButton;
    case 'code':
      return Code;
    case 'script':
      return Script;
    case 'pluginform1':
      return PluginForm1;
    default:
      return Text;
  }
}

function components(id, item, data, cache, global, route, onChange, getStyle) {
  const component = getComponentByType(item.type);

  if (item.type === 'droplist') {
    return React.createElement(component, { key: item.prop, id, options: item, data, cache, global, route, onChange, getStyle });
  }
  return React.createElement(component, { key: item.prop, id, options: item, data, cache, route, onChange, getStyle });
}


export default components;