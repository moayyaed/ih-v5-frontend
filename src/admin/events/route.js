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
  core.event('app:nav', params.menuid, params);
});

core.events.on('route:menu:exit', (params) => {
  // console.log('route:menu:exit', params)
});

// nav
core.events.on('route:nav:init', (params) => {
  // console.log('route:nav:init', params)
});

core.events.on('route:nav:change', (params) => {
  core.action.appnav.select(params.navid);
  core.event('app:page', params.navid, params.navcomponent, params);
});

core.events.on('route:nav:exit', (params) => {
  // console.log('route:nav:exit', params)
});