import core from 'core';


core.events.on('page', (params) => {
  core.components.apptabs.addItem({ id: params.navid, label: params.navid, component: params.navcomponent })
  core
  .request({ component: params.navcomponent, params })
  .ok(core.components.options.data)
});


core.events.on('page:click', (params) => {
  core.components.options.select(params.tab);
});