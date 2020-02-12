import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


function coreReducer(state, action) {
  if (action.type === '__MULTIPLE_ACTIONS') {
    return action.data.reduce((_state, _action) => {
      if (this.id === _action.id || _action.id === undefined) {
        return this.reducer(_state, _action);
      }
      return _state;
    }, state);
  }

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
  return createStore(combineReducers(superReducers), applyMiddleware(thunk));
}

export default bindStore;