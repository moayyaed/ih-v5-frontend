import core from 'core';

import './engine';

// route
core.events.on('route:init', (params) => {
  core.event('menu', null, params);
});

core.events.on('route:change', (params) => {
  core.components.contextmenu.close();
});


// menu
core.events.on('route:menu:change', (params) => {  
  core.components.appbody.setNav({ open: true, id: params.menuid });

  core.event('menu:click', params.menuid);
  core.event('nav', params);
});

core.events.on('route:menu:exit', (params) => {
  core.components.appbody.setNav({ open: false, id: null });
});


// nav
core.events.on('route:nav:change', (params) => {
  core.components.appbody.setPage({ open: true, id: params.navid, component: params.navcomponent });
  
  core.event('nav:click', params.navid);
  core.event('page', params);
});

core.events.on('route:nav:exit', (params) => {
  core.components.apptabs.setData({ selectid: null, list: [] });
  core.components.appbody.setPage({ open: true, id: null, component: null });

  core.event('nav:click', null);
});


// page
core.events.on('route:page:change', (params) => {
  core.event('page:click', params);
});
