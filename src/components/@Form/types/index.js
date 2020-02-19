import React from 'react';


import Input from './@Input';
import Text from './@Text';
import TextArea from './@TextArea';
import DropList from './@DropList';


function getComponentByType(type) {
  switch (type) {
    case 'input':
      return Input;
    case 'text':
      return Text;
    case 'textarea':
      return TextArea;
    case 'table':
      return null;
    case 'droplist':
      return DropList;
    case 'droplist':
      return DropList;
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