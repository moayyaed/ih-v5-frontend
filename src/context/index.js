import EventEmitter from 'events';
import { createBrowserHistory } from "history";

import bindActions from './actions';
import bindStore from './store';

import connect from './connect';
import network from './network';

import { Request } from './tools';


function setRoute(id) {
  // context.history.push(id);
}

function getRoute(index) {
  const value = window.location.pathname.split('/');
  return value[index];
}


function create(dep) {
  context.store = bindStore(dep.reducers);
  context.actions = bindActions({ setRoute, getRoute } ,dep.actions, context.store.dispatch);
  context.rawActions = dep.actions;
  
  context.event('app:init');
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

function request(component, id) {
  console.log();
  return new Request((ok, error) => {
    context.event('network:' + component, id, ok, error)
  });
}


const context = {
  store: {},
  actions: {},
  action,
  create,
  connect,
  request,
  network,
  event,
  events: new EventEmitter(),
  history: createBrowserHistory(),
  // tools,
}


export default context;