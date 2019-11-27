import connect from './connect';
import store from './store';
import actions from './actions';


function dependencies(deps) {
  core.store = store(deps);
  core.actions = actions(deps, core.store.dispatch);
}


const core = {
  store: {},
  connect,
  dependencies,
}


export default core;