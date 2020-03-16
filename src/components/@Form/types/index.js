import React from 'react';


import Input from './@Input';
import Text from './@Text';
import Textarea from './@Textarea';
import Droplist from './@Droplist';
import Tags from './@Tags';
import Table from './@Table/index';
import Code from './@Code/index';


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
    default:
      return null;
  }
}

function components(id, item, data, cache, onChange) {
  const component = getComponentByType(item.type);
  if (component) {
    return React.createElement(component, { key: item.prop, id, options: item, data, cache, onChange });
  }
  return null;
}


export default components;