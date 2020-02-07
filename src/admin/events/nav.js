import core from 'core';


core.events.on('nav', (params) => {
  core.cache({ component: 'nav', params });
  core
    .request({ component: '#nav', params })
    .ok(core.components.appnav.setData)
});

core.events.on('nav:click', (id) => {
  console.log(id)
  core.components.appnav.setSelect(id);
});


core.events.on('nav:cm:body', (e, menu) => {
  core.components.contextmenu.show(e, menu);
});

core.events.on('nav:cm:parent', (e, menu) => {
  core.components.contextmenu.show(e, menu);
});

core.events.on('nav:cm:child', (e, menu) => {
  core.components.contextmenu.show(e, menu);
});





/*

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
*/