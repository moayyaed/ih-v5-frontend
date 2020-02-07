import core from 'core';


// route
core.events.on('route:init', (params) => {
  core.event('app:menu', null, params);
});

core.events.on('route:change', (params) => {
  core.app.contextmenu.close();
});


// menu
core.events.on('route:menu:change', (params) => {  
  core.components.appbody.setNav({ open: true, id: params.menuid });

  core.event('app:menu:click', params.menuid);
  core.event('app:nav', params);
});

core.events.on('route:menu:exit', (params) => {
  core.components.appbody.setNav({ open: false, id: null });
});


// nav
core.events.on('route:nav:change', (params) => {
  core.components.appbody.setPage({ open: true, id: params.navid, component: params.navcomponent });
  
  core.event('app:nav:click', params.navid);
  core.event('app:page', params);
});

core.events.on('route:nav:exit', (params) => {
  core.components.apptabs.setData({ selectid: null, list: [] });
  core.components.appbody.setPage({ open: true, id: null, component: null });

  core.event('app:nav:click', null);
});
