import core from 'core';

import { parsePath } from './tools';

const def = {
  init: false,
  pathname: '',
  menuid: null,
  navid: null,
  navcomponent: null,
  tab: null,
}

core.nav.last = { ...def }

core.router = function(location) {
  if (location === null) {
    core.nav.last = { ...def }
  } else {
    const { last } =  core.nav;

    if (last.pathname !== location.pathname) {
  
      core.nav.state = parsePath(location.pathname);
      const { state } =  core.nav;
      
      // init
      if (last.init === false) {
        last.init = true;
        core.event('route', null, 'init', state);
      } else {
        core.event('route', null, 'change', state);
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
      if (state.navcomponent && (last.navcomponent !== state.navcomponent || last.navid !== state.navid)) {
        if (last.navid === null) {
          core.event('route', 'nav', 'init', state);
        }
        core.event('route', 'nav', 'change', state);
      } else {
        if (state.navcomponent === 'options' && state.tab && last.tab !== state.tab) {
          core.event('route', 'page', 'change', state);
        }
      }
  
      if ((state.navcomponent === null || state.navid === null) && last.navcomponent && last.navid) {
        core.event('route', 'nav', 'exit', state);
      }

      // ----
      
      state.pathname = location.pathname;
      core.nav.last = state;
    }
  }
}