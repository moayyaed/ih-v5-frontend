import core from 'core';


function getStatic(name) {
  switch(name) {
    case 'test':
      return {
        navid: 'test',
        navcomponent: 'test',
      };
    default:
      return null;
  }
}


// route
core.events.on('route:init', (params) => {
  core.event('app:menu', null, params);
});

core.events.on('route:change', (params) => {
  core.app.contextmenu.close();
});

// menu
core.events.on('route:menu:init', (params) => {
  // console.log('route:menu:init', params)
});

core.events.on('route:menu:change', (params) => {
  const staticpage = getStatic(params.menuid);
  if (staticpage) {
    core.components.appbody.setNav({ open: false, id: null });
    core.event('route', 'nav', 'change', staticpage);
  } else {
    core.event('app:menu:click', params.menuid);
    core.components.appbody.setNav({ open: true, id: params.menuid });
  
    core.event('app:nav', params.menuid, params);
  }
});

core.events.on('route:menu:exit', (params) => {
  core.components.appbody.setNav({ open: false, id: null });
});

// nav
core.events.on('route:nav:init', (params) => {
  // console.log('route:nav:init', params)
});

core.events.on('route:nav:change', (params) => {
  core.event('app:nav:click', params.navid);
  core.components.appbody.setPage({ open: true, id: params.navid, component: params.navcomponent });
  core.event('app:page', params.navid, params.navcomponent, params);
});

core.events.on('route:nav:exit', (params) => {
  core.event('app:nav:click', null);
  core.components.apptabs.setData({ selectid: null, list: [] });
  core.components.appbody.setPage({ open: true, id: null, component: null });
  // console.log('route:nav:exit', params)
});