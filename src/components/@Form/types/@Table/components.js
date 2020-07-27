import React from 'react';

import Checkbox from './Checkbox';
import Number from './Number';
import Text from './Text';
import Input from './Input';
import Link from './Link';
import Droplist from './Droplist';
import SmartButton from './SmartButton';

import Error from './Error';


function getComponent(type) {
  switch(type) {
    case 'cb':
      return Checkbox;
    case 'number':
      return Number;
    case 'input':
      return Input;
    case 'link':
      return Link;
    case 'droplist':
      return Droplist;
    case 'smartbutton':
      return SmartButton;
    default:
      return Text;
  }
}

const Cell = cellProps => {
  const type = cellProps.columns[cellProps.columnIndex].type;
  const error = cellProps.column.cache.error;
  const row = cellProps.rowData;
  const column = cellProps.column;
  const component = getComponent(type);
  
  if (error && error[row.id] && error[row.id][column.prop]) {
    return React.createElement(Error, { cellProps, error: error[row.id][column.prop] }, component);
  }

  if (column.hide && column.hide(row)) {
    return null
  }
  
  return React.createElement(component, cellProps);
}

const components = {
  TableCell: Cell,
}


export default components;