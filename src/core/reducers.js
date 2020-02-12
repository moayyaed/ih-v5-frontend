import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


function reducers(reducers) {
  return createStore(combineReducers(reducers), applyMiddleware(thunk));
}


export default reducers;