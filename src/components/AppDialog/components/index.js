import React from 'react';


import Devicelink from './@Devicelink';
import Channellink from './@Channellink';
import Elementlink from './@Elementlink';
import SetValue from './@SetValue';
import Imagegrid from './@Imagegrid';


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
    case 'setvalue':
      return SetValue;
    case 'imagegrid':
      return Imagegrid;
    default:
      return null;
  }
}

function getComponent(key, state, search) {
  const component = getComponentByType(state.component.type);
  if (component) {
    return React.createElement(component, { key, state, search });
  }
  return null;
}


export default getComponent;