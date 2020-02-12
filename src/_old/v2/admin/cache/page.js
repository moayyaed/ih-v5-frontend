import core from 'core';


core.storage.cache('nav', (context) => {
  const store = core.store.getState();
  const old = core.nav.last.navcomponent + '_' + core.nav.last.navid;
  const now = context.navcomponent + '_' + context.navid;

  if (core.nav.last.navcomponent !== null && core.nav.last.navid !== null) {
    if (core.nav.last.navcomponent === 'table') {
      core.storage.cache.pages[old] = store.table;
    }
    if (core.nav.last.navcomponent === 'options') {
      core.storage.cache.pages[old] = store.options;
    }
    if (core.nav.last.navcomponent === 'layout') {
      core.storage.cache.pages[old] = store.layout;
    }
    if (core.nav.last.navcomponent === 'template') {
      core.storage.cache.pages[old] = store.template;
    }
  }

  if (core.storage.cache.pages[now] !== undefined) {
    if (context.navcomponent === 'table') {
      core.components.table.setData(core.storage.cache.pages[now])
    }
    if (context.navcomponent === 'options') {
      core.components.options.setData(core.storage.cache.pages[now])
    }
    if (context.navcomponent === 'layout') {
      core.components.layout.setData(core.storage.cache.pages[now]);
    }
    if (context.navcomponent === 'template') {
      core.components.template.setData(core.storage.cache.pages[now]);
    }
  }
});