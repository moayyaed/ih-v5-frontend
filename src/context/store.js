import { createStore, combineReducers } from 'redux';


function coreReducer(state, action) {
  if (this.id === action.id || action.id === undefined) {
    return this.reducer(state, action);
  }
  return state;
}

function createReducer(id, reducer) {
  return coreReducer.bind({ id, reducer  });
}

function bindStore(reducers) {
  const superReducers = Object.keys(reducers).reduce((l, n) => {
    return {
      ...l,
      [n]: createReducer(n, reducers[n]),
    }
  }, {});
  return createStore(combineReducers(superReducers));
}

export default bindStore;