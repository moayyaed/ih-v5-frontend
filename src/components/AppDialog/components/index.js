import React from 'react';


import Devicelink from './@Devicelink';
import ChannelLink from './@ChannelLink';


function getComponentByType(type) {
  console.log(type)
  switch (type) {
    case 'devicelinkfolder':
      return Devicelink;
    case 'devicelink':
      return Devicelink;
    case 'channellink':
      return ChannelLink;
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