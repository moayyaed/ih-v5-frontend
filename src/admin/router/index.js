import core from 'core';

import { parsePath } from './tools';


core.nav.last = {
  init: false,
  pathname: '',
  menuid: null,
  navid: null,
  navcomponent: null,
}

core.router = function(location) {
  const { last } =  core.nav;

  if (last.pathname !== location.pathname) {
    last.lastPathName = location.pathname;

    core.nav.state = parsePath(location.pathname);
    const { state } =  core.nav;
    
    // init
    if (last.init === false) {
      last.init = true;
      core.event('route', null, 'init', state);
    }

    // menu
    if (last.menuid !== state.menuid) {
      if (last.menuid === null) {
        core.event('route', 'menu', 'init', state);
      }
      if (state.menuid === null) {
        core.event('route', 'menu', 'exit', state);
      } else {
        core.event('route', 'menu', 'change', state);
      }
    }

    // nav
    if (state.navcomponent && last.navid !== state.navid) {
      if (last.navid === null) {
        core.event('route', 'nav', 'init', state);
      }
      core.event('route', 'nav', 'change', state);
    }

    if ((state.navcomponent === null || state.navid === null) && last.navcomponent && last.navid) {
      core.event('route', 'nav', 'exit', state);
    }

    core.nav.last = state;
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