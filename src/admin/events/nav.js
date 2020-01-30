import core from 'core';

function cache(params) {
  if (core.nav.last.menuid !== null) {
    const store = core.store.getState();

    core.cache.paths[core.nav.last.menuid] = core.nav.last.pathname;
    core.cache.apptabs[core.nav.last.menuid] = store.apptabs;
  }

  if (core.cache.apptabs[params.menuid] !== undefined) {
    core.components.apptabs.setData(core.cache.apptabs[params.menuid]);
  }
}

core.events.on('app:nav', (_, params) => {
  cache(params);

  core.req({ 
    alias: 'nav', 
    method: 'data', 
    type: 'tree', 
    id: params.menuid 
  })
  .ok((res) => {
    core.components.explorer.setData({ selectid: params.navid, list: res.data });
  })
});

core.events.on('app:nav:click', (navid) => {
  core.components.explorer.setSelect(navid);
});