import core from 'core';


function rnd(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stub() {
  const tree = Array(rnd(4, 7))
  return tree.fill().map(() => {
    return {
      w: rnd(8, 12) * 10,
      c: Array(rnd(3, 7)).fill().map(() => {
        return rnd(10, 15) * 10;
      })
    };
  });
}

function cache(params) {
  const store = core.store.getState();

  if (core.nav.last.menuid !== null) {
    core.cache.paths[core.nav.last.menuid] = core.nav.last.pathname;
    core.cache.navs[core.nav.last.menuid] = store.explorer;
    core.cache.apptabs[core.nav.last.menuid] = store.apptabs;
  }

  if (core.cache.apptabs[params.menuid] !== undefined) {
    core.components.explorer.setData(core.cache.navs[params.menuid]);
    core.components.apptabs.setData(core.cache.apptabs[params.menuid]);
  } else {
    core.components.apptabs.setData({ selectid: null, list: [] });
    core.components.explorer.setData({ selectid: params.navid, list: stub(), loading: true });
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
    core.components.explorer.setData({ selectid: params.navid, list: res.data, loading: false });
  })
});

core.events.on('app:nav:click', (navid) => {
  core.components.explorer.setSelect(navid);
});