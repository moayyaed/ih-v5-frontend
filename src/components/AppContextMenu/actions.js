import React from 'react';
import { ContextMenu } from "@blueprintjs/core";

import AppContextMenu from './index';


export function show(e, data) {
  const options = { left: e.clientX, top: e.clientY };

  ContextMenu.show(<AppContextMenu data={data} />, options, () => {});

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
