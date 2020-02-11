import core from 'core';


core.events.on('page', (params) => {
  core.components.apptabs.addItem({ id: params.navid, label: params.navid, component: params.navcomponent })
  core
  .request({ component: params.navcomponent, params })
  .ok(res => {
    core.components.options.data(res);
    if(params.tab === null && res.defaultTab) {
      core.nav.push(`${core._options.route}/${params.menuid}/${params.navcomponent}/${params.navid}/${res.defaultTab}`);
    } 
  })
});


core.events.on('page:click', (params) => {
  if (params.tab) {
    core.components.options.select(params.tab);
  } else {
    // core.components.options.select(null);
  }
});