import core from 'core';


function cache(data) {
  const name = `cache_${data.component}`;

  if (core.storage.events._events[name] !== undefined) {
    core.storage.events.emit(name, data);
  }
}


export default cache;