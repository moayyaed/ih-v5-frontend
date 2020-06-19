import React from 'react';


import Container from './@Container';
import Container2 from './@Container2';
import Empty from './@Empty';


function getWidgetByType(type) {
  switch (type) {
    case 'container':
      return Container;
    case 'container2':
      return Container2;
    default:
      return Empty;
  }
}

function widgets(id, item, global) {
  return React.createElement(getWidgetByType(item.type), { key: id, id: id, params: item, global });
}


export default widgets;