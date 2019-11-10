import EventEmitter from 'events';
import { createBrowserHistory } from "history";

import bindActions from './actions';
import bindStore from './store';

import connect from './connect';
import network from './network';


function setRoute(id) {
  context.history.push(id);
}


function create(dep) {
  context.store = bindStore(dep.reducers);
  context.actions = bindActions({ setRoute } ,dep.actions, context.store.dispatch);
  context.rawActions = dep.actions;
  
  context.event('app', 'init')
}

function action(bind) {
  const act = bind(context.rawActions);
  if (Array.isArray(act)) {
    context.store.dispatch({ type: '__MULTIPLE_ACTIONS', data: act });
  } else {
    context.store.dispatch(act);
  }
}

function event(name, id, value, action) {
  context.events.emit(name, id, value, action);
}


const context = {
  store: {},
  actions: {},
  action,
  create,
  connect,
  network,
  event,
  events: new EventEmitter(),
  history: createBrowserHistory(),
}


export default context;