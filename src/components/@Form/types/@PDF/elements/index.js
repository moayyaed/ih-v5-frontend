import React from 'react';

import Block from './@Block';
import Text from './@Text';
import Image from './@Image';
import Table from './@Table';


function getElementByType(type) {
  switch (type) {
    case 'text':
      return Text;
    case 'image':
      return Image;
    case 'table':
        return Table;
    default:
      return Block;
  }
}

function elements(type, params) {
  return React.createElement(getElementByType(type), params);
}


export default elements;