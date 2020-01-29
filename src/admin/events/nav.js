import core from 'core';


core.events.on('app:nav', (_, params) => {
  core.req({ 
    alias: 'nav', 
    method: 'data', 
    type: 'tree', 
    id: params.menuid 
  })
  .ok((res) => {
    core.app.nav.data({ navid: params.menuid , tabs: true }, res.data);
  })
});

core.events.on('app:nav:click', (navid) => {
  core.components.explorer.setSelect(navid);
});