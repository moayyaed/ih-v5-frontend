import React from 'react';


import Block from './@Block';


function getElementByType(type) {
  switch (type) {
    default:
      return Block;
  }
}

function elements(id, item) {
  return React.createElement(getElementByType(item.type), { key: id, id: id, params: item });
}


export default elements;