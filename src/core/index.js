import EventEmitter from 'events';

import connect from './connect';
import store from './store';
import components from './components';

import { fetch } from './network';


function clipboardRead() {
  return new Promise(resolve => resolve(core.clipboard.buffer));
  /*
  if (navigator.clipboard === undefined) {
    
  } else {
    return navigator.clipboard
      .readText()
      .then(text => {
        if (text !== undefined) {
          try {
            return JSON.parse(text);
          } catch (e) {
            return null;
          }
        }
        return null;
      })
      .catch((e) => console.log(e));
  }
  */
}

function clipboardWrite(data) {
  core.clipboard.buffer = data;
  return new Promise(resolve => resolve());
 /*
  if (navigator.clipboard === undefined) {
    
  } else {
    try {
      navigator.clipboard.writeText(JSON.stringify(data));
    } catch (e) {

    }
  }
  */
}

function options(options) {
  core._options = options;
  core.store = store(options.components);
  core.components = components(options.components, core.store.dispatch);
}

function eventRoute(type, status, params) {
  if (type === null) {
    core.events.emit(`route:${status}`, params);
  } else {
    core.events.emit(`route:${type}:${status}`, params);
  }
}

function eventContextMenu(type, target, params, state) {
  if (type !== null) {
    core.events.emit(`contextmenu:${type}`, target, params, state);
  }
}

function eventOther(name, id, param2, param3) {
  if (core.events._events[`${name}:${id}`] !== undefined) {
    core.events.emit(`${name}:${id}`, id, param2, param3);
  } else {
    core.events.emit(name, id, param2, param3);
  }
}

function event(name, param1, param2, param3, param4) {
  switch(name) {
    case 'route':
      eventRoute(param1, param2, param3, param4);
      break;
    case 'contextmenu':
      eventContextMenu(param1, param2, param3, param4);
      break;
    default:
      eventOther(name, param1, param2, param3, param4);
      break;
  }
}

function navpush(path) {
  if (core.nav.last.pathname !== path) {
    core.nav.history.push(path);
  }
}

function init() {
  core.router(core.nav.history.location);
  core.app.data({ auth: true });
}

function auth() {
  
}


const core = {
  app: {
    menu: {},
    nav: {},
    page: {},
    contextmenu: {},
  },
  store: {},
  connect,
  options,
  event,
  events: new EventEmitter(),
  router: null,
  clipboard: {
    buffer: null,
    read: clipboardRead,
    write: clipboardWrite,
  },
  nav: {
    last: {},
    state: {},
    history: {},
    push: navpush,
  },
  cache: {
    paths: {},
    apptabs: {},
    pages: {},
  },
  init,
  auth,
  fetch,
}


export default core;