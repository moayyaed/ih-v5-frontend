import React from 'react';


import Text from './@Text';
import _Number from './@Number';
import CheckBox from './@CheckBox';
import Divider from './@Divider';


function getComponentByType(type) {
  switch (type) {
      case 'text':
        return Text;
      case 'number':
        return _Number;
      case 'cb':
        return CheckBox;
      case 'divider':
        return Divider;
    default:
      return null;
  }
}

function components(item, data) {
  const component = getComponentByType(item.type);
  return React.createElement(component, { key: item.prop, item, data });
}


export default components;
