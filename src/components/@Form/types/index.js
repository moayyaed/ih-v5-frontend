import React from 'react';


import Input from './@Input';
import Text from './@Text';
import Textarea from './@Textarea';
import Droplist from './@Droplist';
import Table from './@Table/index';


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
    default:
      return null;
  }
}

function components(item, data) {
  // console.log(item.type)
  const component = getComponentByType(item.type);
  if (component) {
    return React.createElement(component, { options: item, data });
  }
  return null;
}


export default components;