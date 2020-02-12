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
  // NProgress.start();
}

function progressStop() {
  core.progress.count -= 1;
  if (core.progress.count > 0) {
    // NProgress.inc();
  } else {
    // NProgress.done();
  }
}

function route(path) {
  core.history.push(path);
  console.log(path);
}


const core = {
  settings,
  request,
  network,
  route,
  progress: {
    count: 0,
    start: progressStart,
    stop: progressStop,
  },
}


export default core;