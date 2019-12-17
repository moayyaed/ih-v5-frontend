import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function superReducer(state, action) {
  if (this.id === action.id || action.id === undefined) {
    return this.reducer(state, action);
  }
  return state;
}


function preparation(id, reducer) {
  return superReducer.bind({ id, reducer  });
}

function store(deps) {
  const reducers = Object
  .keys(deps)
  .reduce((p, c) => {
    const item = deps[c];
    if (item.reducer === null) {
      return p;
    }
    return { ...p, [c]: preparation(c, item.reducer) };
  }, {});
  
  const reduxStore = createStore(combineReducers(reducers), applyMiddleware(thunk));
  return reduxStore;
}

export default store;