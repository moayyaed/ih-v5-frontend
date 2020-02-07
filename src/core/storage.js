import EventEmitter from 'events';
import core from 'core';
import store from './store';


function cache(name, callback) {
  storage.events.on(`cache_${name}`, callback);
}


const storage = {
  cache,
  events: new EventEmitter(),
}

storage.cache.paths = {};
storage.cache.navs = {};
storage.cache.apptabs = {};
storage.cache.paths = {};


export default storage