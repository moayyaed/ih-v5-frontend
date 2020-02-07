import core from 'core';


core.events.on('app:nav', (params) => {
  core
  .cache({ component: 'nav', params });
  core
    .request({ component: 'nav', params })
    .ok(core.components.appnav.setData)
});

core.events.on('app:nav:click', (navid) => {
  core.components.appnav.setSelect(navid);
});


const insert = {
  alias: 'nav', 
  method: 'insert', 
  type: 'tree', 
  id: '',
  options: {
    root: '',
    leaf: true,
  },
  payload: { id: '', title: '', parent: '', order: 1, type: '' }
}

const update = {
  alias: 'nav', 
  method: 'update', 
  type: 'tree', 
  id: '',
  options: { root: '', leaf: true },
  payload: [{ id: '', title: '', parent: '', order: 1, type: '' }]
}