import EventEmitter from 'events';

import connect from './connect';
import store from './store';
import components from './components';


function dependencies(deps) {
  core.store = store(deps);
  core.components = components(deps, core.store.dispatch);
}

function eventRoute(type, status, params) {
  if (type === null) {
    core.events.emit(`route:${status}`, params);
  } else {
    core.events.emit(`route:${type}:${status}`, params);
  }
}

function eventOther(name, id, param2, param3) {
  if (core.events._events[`${name}:${id}`] !== undefined) {
    core.events.emit(`${name}:${id}`, id, param2, param3);
  } else {
    core.events.emit(name, id, param2, param3);
  }
}

function event(name, param1, param2, param3) {
  if (name === 'route') {
    eventRoute(param1, param2, param3);
  } else {
    eventOther(name, param1, param2, param3);
  }
}

function navpush(path) {
  if (core.nav.last.pathname !== path) {
    core.nav.history.push(path);
  }
}

    
  /*
  if (core.events._events[`${name}:${id}`] !== undefined) {
    core.events.emit(`${name}:${id}`, id, data);
  } else if (name === 'app:page' && core.events._events[`${name}:${data}`] !== undefined) {
    core.events.emit(`${name}:${data}`, id, data);
  } else {
    core.events.emit(name, id, data);
  }
  }
  */



const core = {
  action: {
    appmenu: {},
    appnav: {},
    apppage: {},
  },
  store: {},
  connect,
  dependencies,
  event,
  events: new EventEmitter(),
  router: null,
  nav: {
    last: {},
    state: {},
    history: {},
    push: navpush,
  },
  cache: {
    paths: {},
    apptabs: {},
  }
}


export default core;