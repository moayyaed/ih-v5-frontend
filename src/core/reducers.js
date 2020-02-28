import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduceReducers from 'reduce-reducers';
import thunk from 'redux-thunk';

function reducers(reducers) {
  const preparation = Object
    .keys(reducers)
    .reduce((p, c) => {
      if (Array.isArray(reducers[c])) {
        return { ...p, [c]: reduceReducers.apply(null, reducers[c]) }
      }
      return { ...p, [c]: reducers[c] }
    }, {});
  return createStore(combineReducers(preparation), applyMiddleware(thunk));
}


export default reducers;