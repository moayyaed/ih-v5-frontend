import React from 'react';


import Container from './@Container';
import Empty from './@Empty';


function getWidgetByType(type) {
  switch (type) {
    case 'CONTAINER':
      return Container;
    default:
      return Empty;
  }
}

function widgets(id, item) {
  return React.createElement(getWidgetByType(item.type), { key: id, id: id, params: item });
}


export default widgets;