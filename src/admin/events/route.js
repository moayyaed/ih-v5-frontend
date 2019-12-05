import core from 'core';


core.events.on('route:init', (params) => {
  core.event('app:menu', params);
});


core.events.on('route:menu:init', (params) => {
  console.log('route:menu:init', params)
});

core.events.on('route:menu:change', (params) => {
  core.components.appmenu.setSelect(params.menuid);
  console.log('route:menu:change', params)
});

core.events.on('route:menu:exit', (params) => {
  console.log('route:menu:exit', params)
});