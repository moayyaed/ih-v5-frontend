import core from 'core';


core.events.on('nav', (params) => {
  core.cache({ component: 'nav', params });
  core
    .request({ component: '#nav', params })
    .ok(core.components.nav.setData)
});

core.events.on('nav:click', (id) => {
  core.components.nav.setSelect(id);
});


core.events.on('nav:click_cm:body', (context) => {
  core.components.contextmenu.show(context);
});

core.events.on('nav:click_cm:parent', (context) => {
  core.components.contextmenu.show(context);
});

core.events.on('nav:click_cm:child', (context) => {
  core.components.contextmenu.show(context);
});


core.events.on('nav:cm:rename', (menu, node) => {
  console.log(menu, node);
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