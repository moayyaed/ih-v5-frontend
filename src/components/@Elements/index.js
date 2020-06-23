import React from 'react';


import Block from './@Block';
import Text from './@Text';
import Image from './@Image';
import Container from './@Container';
import Template from './@Template';
import CCTV from './@CCTV';


function getElementByType(type) {
  switch (type) {
    case 'text':
      return Text;
    case 'image':
      return Image;
    case 'container':
      return Container;
    case 'template1':
      return Template;
    case 'cctv':
      return CCTV;
    default:
      return Block;
  }
}

function elements(id, item, template) {
  return React.createElement(getElementByType(item.type), { key: id, id: id, params: item, template });
}


export default elements;