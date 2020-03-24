import React from 'react';


import Input from './@Input';
import Text from './@Text';
import Textarea from './@Textarea';
import Droplist from './@Droplist';
import Tags from './@Tags';

import Table from './@Table';
import Code from './@Code';
import PluginForm1 from './@PluginForm1';


function getComponentByType(type) {
  switch (type) {
    case 'input':
      return Input;
    case 'text':
      return Text;
    case 'textarea':
      return Textarea;
    case 'table':
      return Table;
    case 'droplist':
      return Droplist;
    case 'tags':
      return Tags;
    case 'code':
      return Code;
    case 'pluginform1':
      return PluginForm1;
    default:
      return null;
  }
}

function components(id, item, data, cache, route, onChange) {
  const component = getComponentByType(item.type);
  if (component) {
    return React.createElement(component, { key: item.prop, id, options: item, data, cache, route, onChange });
  }
  return null;
}


export default components;