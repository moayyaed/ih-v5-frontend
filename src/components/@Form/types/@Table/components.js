import React from 'react';

import Number from './Number';
import Text from './Text';
import Input from './Input';
import Link from './Link';

import Droplist from './Droplist';


function getComponent(type) {
  switch(type) {
    case 'number':
      return Number;
    case 'input':
      return Input;
    case 'link':
      return Link;
    case 'droplist':
      return Droplist;
    default:
      return Text;
  }
}

const Cell = cellProps => {
  const type = cellProps.columns[cellProps.columnIndex].type;
  const component = getComponent(type);
  
  return React.createElement(component, cellProps);
}

const components = {
  TableCell: Cell,
}


export default components;