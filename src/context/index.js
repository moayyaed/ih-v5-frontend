import bindActions from './actions';
import bindStore from './store';

import connect from './connect';
import network from './network';


function create(dep) {
  context.store = bindStore(dep.reducers);
  context.actions = bindActions(dep.actions, context.store.dispatch);
  context.rawActions = dep.actions;
}

function action(bind) {
  const act = bind(context.rawActions);
  if (Array.isArray(act)) {
    context.store.dispatch({ type: '__MULTIPLE_ACTIONS', data: act });
  } else {
    context.store.dispatch(act);
  }
}


const context = {
  store: {},
  actions: {},
  create,
  connect,
  network,
}


export default context;