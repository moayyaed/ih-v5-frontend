import core from 'core';


function lang(item) {
  const id = item.lang || item.prop || item.id;
  if (id === '_' ){
    return '';
  }
  if (core.cache.langs[id] !== undefined) {
    return core.cache.langs[id];
  }
  return ':' + id + ':';
}


export default lang;
