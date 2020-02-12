import React from 'react';
import { ContextMenu } from "@blueprintjs/core";

import AppContextMenu from './index';


export function show({ e, menu, namespace, node, close }) {
  const options = { left: e.clientX, top: e.clientY };

  ContextMenu.show(
    <AppContextMenu 
      position={{ 
        x: e.clientX, 
        y: e.clientY,
        nx: e.nativeEvent.offsetX, 
        ny: e.nativeEvent.offsetY,  
      }}
      data={menu}
      context={{ namespace, node }}
    />, options, close);
  return null;
}

export function close() {
  if (ContextMenu.isOpen()) {
    ContextMenu.hide();
  }
  return null;
}


export default {
  show,
  close,
}