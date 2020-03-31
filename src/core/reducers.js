import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduceReducers from 'reduce-reducers';
import thunk from 'redux-thunk';
import reducer from 'components/@Form/reducer';

function superReducer(state, action) {
  if (action.stateid) {
    if (action.stateid === this.id) {
      return this.reducer(state, action);
    }
    return state;
  }
  return this.reducer(state, action);
}

function reducers(reducers) {
  const preparation = Object
    .keys(reducers)
    .reduce((p, c) => {
      if (Array.isArray(reducers[c])) {
        return { ...p, [c]: reduceReducers.apply(null, reducers[c]) }
      }
      return { ...p, [c]: superReducer.bind({ id: c, reducer: reducers[c] }) }
    }, {});
  return createStore(combineReducers(preparation), applyMiddleware(thunk));
}


export default reducers;