import core from 'core';

import { parsePath } from './tools';


core.nav.last = {
  init: false,
  pathname: '',
  menuid: null,
}

core.router = function(location) {
  let { last, state } =  core.nav;

  if (last.pathname !== location.pathname) {
    last.lastPathName = location.pathname;

    state = parsePath(location.pathname);
    
    
    if (last.init === false) {
      last.init = true;
      core.event('route', null, 'init', state);
    }

    if (last.menuid !== state.menuid) {
      if (last.menuid === null) {
        core.event('route', 'menu', 'init', state);
      }
      if (state.menuid === null) {
        core.event('route', 'menu', 'exit', state);
      } else {
        core.event('route', 'menu', 'change', state);
      }
      last.menuid = state.menuid;
    }

  }


  /*
  if (state.lastPathName !== location.pathname) {
    state.lastPathName = location.pathname;
    const params = parsePath(location.pathname);
  
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
  */
}