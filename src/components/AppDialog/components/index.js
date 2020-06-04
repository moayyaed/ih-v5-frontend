import React from 'react';


import Devicelink from './@Devicelink';
import Channellink from './@Channellink';


function getComponentByType(type) {
  switch (type) {
    case 'devicelinkfolder':
      return Devicelink;
    case 'devicelink':
      return Devicelink;
    case 'channellink':
      return Channellink;
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