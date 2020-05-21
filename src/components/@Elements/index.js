import React from 'react';


import Block from './@Block';
import Text from './@Text';
import Image from './@Image';
import Template from './@Template';
import CCTV from './@CCTV';


function getElementByType(type) {
  switch (type) {
    case 'text':
      return Text;
    case 'image':
      return Image;
    case 'template':
      return Template;
    case 'cctv':
      return CCTV;
    default:
      return Block;
  }
}

function elements(id, item) {
  return React.createElement(getElementByType(item.type), { key: id, id: id, params: item });
}


export default elements;