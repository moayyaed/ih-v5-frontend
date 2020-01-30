import core from 'core';


function cache(params) {
  const store = core.store.getState();
  const old = core.nav.last.navcomponent + '_' + core.nav.last.navid;
  const now = params.navcomponent + '_' + params.navid;

  if (core.nav.last.navcomponent !== null && core.nav.last.navid !== null) {
    if (core.nav.last.navcomponent === 'table') {
      core.cache.pages[old] = store.table;
    }
    if (core.nav.last.navcomponent === 'options') {
      core.cache.pages[old] = store.options;
    }
    if (core.nav.last.navcomponent === 'layout') {
      core.cache.pages[old] = store.layout;
    }
    if (core.nav.last.navcomponent === 'template') {
      core.cache.pages[old] = store.template;
    }
  }

  if (core.cache.pages[now] !== undefined) {
    if (params.navcomponent === 'table') {
      core.components.table.setData(core.cache.pages[now])
    }
    if (params.navcomponent === 'options') {
      core.components.options.setData(core.cache.pages[now])
    }
    if (params.navcomponent === 'layout') {
      core.components.layout.setData(core.cache.pages[now]);
    }
    if (params.navcomponent === 'template') {
      core.components.template.setData(core.cache.pages[now]);
    }
  }
}

core.events.on('app:page', (params) => {
  cache(params);
  
  core.components.apptabs.addItem({ id: params.navid, label: params.navid, component: params.navcomponent })

  if (core.cache.pages[params.navcomponent + '_' + params.navid] === undefined) {
    core.req({ 
      alias: 'page', 
      method: 'data', 
      type: params.navcomponent, 
      id: params.navid, 
    })
    .ok((res) => {
      if (params.navcomponent === 'table') {
        core.components.table.setData({ text: params.navid, loading: false })
      }
      if (params.navcomponent === 'options') {
        core.components.options.setData({ text: params.navid, loading: false })
      }
      if (params.navcomponent === 'layout') {
        core.components.layout.setData({ ...res.data, loading: false });
      }
      if (params.navcomponent === 'template') {
        core.components.template.setData({ ...res.data, loading: false });
      }
    })
  }

});