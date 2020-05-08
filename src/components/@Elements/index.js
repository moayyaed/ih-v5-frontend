import React from 'react';


import Block from './@Block';
import Text from './@Text';
import Image from './@Image';


function getElementByType(type) {
  switch (type) {
    case 'text':
      return Text;
    case 'image':
      return Image;
    default:
      return Block;
  }
}

function elements(id, item) {
  return React.createElement(getElementByType(item.type), { key: id, id: id, params: item });
}


export default elements;