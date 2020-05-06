import React from 'react';


import Basic from './@Basic';


function getElementByType(type) {
  switch (type) {
    default:
      return Basic;
  }
}

function elements(id, item) {
  return React.createElement(getElementByType(item.type), { key: id, id: id, params: item });
}


export default elements;