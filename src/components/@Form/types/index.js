import React from 'react';


import String from './@String';
import TextArea from './@TextArea';
import DropList from './@DropList';


function getComponentByType(type) {
  switch (type) {
    case 'string':
      return String;
    case 'textarea':
      return TextArea;
    case 'table':
      return null;
    case 'droplist':
      return DropList;
    default:
      return null;
  }
}

function components(item) {
  // console.log(item.type)
  const component = getComponentByType(item.type);
  if (component) {
    return React.createElement(component, item);
  }
  return null;
}


export default components;