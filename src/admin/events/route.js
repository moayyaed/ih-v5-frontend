import core from 'core';

// route
core.events.on('route:init', (params) => {
  core.event('app:menu', null, params);
});

// menu
core.events.on('route:menu:init', (params) => {
  // console.log('route:menu:init', params)
});

core.events.on('route:menu:change', (params) => {
  core.action.appmenu.select(params.menuid);
  core.components.appbody.setNav({ open: true, id: params.menuid });

  core.event('app:nav', params.menuid, params);
});

core.events.on('route:menu:exit', (params) => {
  core.components.appbody.setNav({ open: false, id: null });
});

// nav
core.events.on('route:nav:init', (params) => {
  // console.log('route:nav:init', params)
});

core.events.on('route:nav:change', (params) => {
  core.action.appnav.select(params.navid);
  core.components.appbody.setPage({ open: true, id: params.navid, component: params.navcomponent });
  core.event('app:page', params.navid, params.navcomponent, params);
});

core.events.on('route:nav:exit', (params) => {
  core.action.appnav.select(null);
  core.components.apptabs.setData({ selectid: null, list: [] });
  core.components.appbody.setPage({ open: true, id: null, component: null });
  // console.log('route:nav:exit', params)
});