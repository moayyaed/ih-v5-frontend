import React from 'react';


import Block from './@Block';
import Text from './@Text';
import Image from './@Image';
import Button from './@Button';

import Container from './@Container';
import Template from './@Template';
import CCTV from './@CCTV';


function getElementByType(type) {
  switch (type) {
    case 'text':
      return Text;
    case 'image':
      return Image;
    case 'button':
      return Button;
    case 'container':
      return Container;
    case 'template':
      return Template;
    case 'cctv':
      return CCTV;
    default:
      return Block;
  }
}

function elements(type, params) {
  return React.createElement(getElementByType(type), params);
}


export default elements;