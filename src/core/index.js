import EventEmitter from 'events';

import connect from './connect';
import store from './store';
import components from './components';


function dependencies(deps) {
  core.store = store(deps);
  core.components = components(deps, core.store.dispatch);
}

function event(name, id, data) {
  if (core.events._events[`${name}:${id}`] !== undefined) {
    core.events.emit(`${name}:${id}`, id, data);
  } else if (name === 'app:page' && core.events._events[`${name}:${data}`] !== undefined) {
    core.events.emit(`${name}:${data}`, id, data);
  } else {
    core.events.emit(name, id, data);
  }
}


const core = {
  action: {},
  store: {},
  connect,
  dependencies,
  event,
  events: new EventEmitter(),
}


export default core;