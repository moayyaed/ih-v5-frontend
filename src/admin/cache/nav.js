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


core.storage.cache('nav', (context) => {
  const store = core.store.getState();

  if (core.nav.last.menuid !== null) {
    core.storage.cache.paths[core.nav.last.menuid] = core.nav.last.pathname;
    core.storage.cache.navs[core.nav.last.menuid] = store.tree;
    core.storage.cache.apptabs[core.nav.last.menuid] = store.apptabs;
  }

  if (core.storage.cache.apptabs[context.menuid] !== undefined) {
    core.components.nav.data(core.storage.cache.navs[context.menuid]);
    core.components.apptabs.setData(core.storage.cache.apptabs[context.menuid]);
  } else {
    core.components.apptabs.setData({ selectid: null, list: [] });
    core.components.nav.data({ selectid: context.navid, list: stub(), loading: true });
  }
})
