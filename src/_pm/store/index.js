import { createStore, combineReducers } from 'redux';

import boxreducer from '../routes/test/reducer';

function coreReducer(state, action) {
  if (this.id === action.id || action.id === undefined) {
    return this.reducer(state, action);
  }
  return state;
}

function createReducer(id, reducer) {
  return coreReducer.bind({ id, reducer  });
}


const reducers = combineReducers({
  test1: createReducer('test1', boxreducer),
  test2: createReducer('test2', boxreducer),
});

const store = createStore(reducers);

export default store;