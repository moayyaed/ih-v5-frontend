import React from 'react';


import Devicelink from './@Devicelink';


function getComponentByType(type) {
  switch (type) {
    case 'devicelinkfolder':
      return Devicelink;
    case 'devicelink':
      return Devicelink;
    default:
      return null;
  }
}

function getComponent(state) {
  const component = getComponentByType(state.component.type);
  if (component) {
    return React.createElement(component, { state: state });
  }
  return null;
}


export default getComponent;