import React from 'react';


import Devicelink from './@Devicelink';
import Channellink from './@Channellink';
import Elementlink from './@Elementlink';


function getComponentByType(type) {
  switch (type) {
    case 'devicelinkfolder':
      return Devicelink;
    case 'devicelink':
      return Devicelink;
    case 'channellink':
      return Channellink;
    case 'elementlink':
      return Elementlink;
    default:
      return null;
  }
}

function getComponent(key, state) {
  const component = getComponentByType(state.component.type);
  if (component) {
    return React.createElement(component, { key, state: state });
  }
  return null;
}


export default getComponent;