import Bowser from "bowser";

import NProgress from 'nprogress';

import reducers from './reducers';
import actions from './actions';

import request from './request';
import tunnel from './tunnel';
import transfer from './transfer';
import network from './network';
import tools from './tools';


function settings(options) {
  core.options = options;

  core.store = reducers(options.reducers);
  core.actions = { ...actions(options.actions, core.store.dispatch), ...options.mergeActions };
}

function progressStart() {
  core.progress.count += 1;
  NProgress.start();
}

function progressStop() {
  core.progress.count -= 1;
  if (core.progress.count > 0) {
    NProgress.inc();
  } else {
    NProgress.done();
  }
}

function route(path) {
  const nextPath = core.options.routePrefix + '/' + path;
  if (core.lastPath !== nextPath) {
    // core.lastPath = nextPath;
    core.history.push(nextPath);
  }
}



/*
window.onerror = function(message, source, lineno, colno, error) {
}
*/

const core = {
  settings,
  request,
  tunnel,
  transfer,
  network,
  tools,
  route,
  buffer: {},
  progress: {
    count: 0,
    start: progressStart,
    stop: progressStop,
  },
  session: {},
  cache: {
    token: window.localStorage.getItem('token'),
    vars: {},
    requests: {},
    componentsParams: {},
    functions: {},
    navs: {},
    tabs: {},
    tab: {},
  },
  whois: Bowser.parse(window.navigator.userAgent),
  restart: false,
}


export default core;