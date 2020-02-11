import core from 'core';


core.events.on('page', (params) => {
  core.components.apptabs.addItem({ id: params.navid, label: params.navid, component: params.navcomponent })
  core
  .request({ component: params.navcomponent, params })
  .ok(res => {
    if(params.tab === null && res.defultTab) {

    } 
    core.components.options.data(res);
  })
});


core.events.on('page:click', (params) => {
  if (params.tab) {
    core.components.options.select(params.tab);
  } else {
    core.components.options.select(null);
  }
});