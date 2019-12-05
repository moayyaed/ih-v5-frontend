import core from 'core';

import { parsePath } from './tools';


const state = {
  lastPathName: '',
  lastNavID: null,
  lastPageId: null,
  lastComponent: null,
}


core.router = function(location) {
  if (state.lastPathName !== location.pathname) {
    state.lastPathName = location.pathname;
    const params = parsePath(location.pathname);
    console.log(params);
    if (state.lastNavID !== params.navid) {
      state.lastNavID = params.navid;
      // console.log('navid:', params.navid);
    }
    if (state.lastComponent !== params.component) {
      state.lastComponent = params.component;
      // console.log('component:', params.component);
    }
    if (state.lastPageId !== params.pageid) {
      /// console.log('pageid:', params.pageid);
    }
  }
}