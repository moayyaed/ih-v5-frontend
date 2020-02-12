import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


function settings(options) {
  core.options = options;
  core.store = createStore(combineReducers(options.reducers), applyMiddleware(thunk));
}


const core = {
  settings,
}


export default core;