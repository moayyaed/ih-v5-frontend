import EventEmitter from 'events';

import connect from './connect';
import store from './store';
import actions from './actions';


function dependencies(deps) {
  core.store = store(deps);
  core.actions = actions(deps, core.store.dispatch);
}

function event(name, id, data) {
  core.events.emit(name, id, data);
}


const core = {
  store: {},
  connect,
  dependencies,
  event,
  events: new EventEmitter(),
}


export default core;