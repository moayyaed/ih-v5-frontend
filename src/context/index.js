import bindActions from './actions';
import bindStore from './store';

import connect from './connect';

function create(dep) {
  context.store = bindStore(dep.reducers);
  context.actions = bindActions(dep.actions, context.store.dispatch);
}

const context = {
  store: {},
  actions: {},
  create,
  connect,
}


export default context;