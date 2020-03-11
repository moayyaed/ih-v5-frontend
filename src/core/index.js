import NProgress from 'nprogress';

import reducers from './reducers';
import actions from './actions';

import request from './request';
import network from './network';

function settings(options) {
  core.options = options;

  core.store = reducers(options.reducers);
  core.actions = actions(options.actions, core.store.dispatch);
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
    core.lastPath = nextPath;
    core.history.push(nextPath);
  }
}


const core = {
  settings,
  request,
  network,
  route,
  buffer: {},
  progress: {
    count: 0,
    start: progressStart,
    stop: progressStop,
  },
  cache: {
    componentsParams: {}
  },
}


export default core;