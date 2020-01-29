import core from 'core';
import { LOADING } from '@blueprintjs/core/lib/esm/common/classes';


core.events.on('app:nav', (_, params) => {
  if (core.nav.last.menuid !== null) {
    core.cache.paths[core.nav.last.menuid] = core.nav.last.pathname;
  }
  
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