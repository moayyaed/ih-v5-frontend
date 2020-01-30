import core from 'core';


function cache(params) {
  const store = core.store.getState();
  
  if (core.nav.last.navid !== null && core.nav.last.navcomponent !== null) {
    const name = core.nav.last.navcomponent + '_' + core.nav.last.navid;

    if (core.nav.last.navcomponen === 'table') {
      core.cache.pages[name] = store.table;
    }
    if (core.nav.last.navcomponen === 'options') {
      core.cache.pages[name] = store.options;
    }
    if (core.nav.last.navcomponen === 'layout') {
      core.cache.pages[name] = store.layout;
    }
    if (core.nav.last.navcomponen === 'template') {
      core.cache.pages[name] = store.template;
    }
  }

}

core.events.on('app:page', (params) => {
  cache(params);
  
  core.components.apptabs.addItem({ id: params.navid, label: params.navid, component: params.navcomponent })
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

  /*
  

  if (options.component === 'table') {
    core.components.table.setData({ text: component + ':' + pageid });
  }
  if (options.component === 'layout') {
    core.components.options.setData({ options, ...data  });
  }
  if (options.component === 'template') {
    if (core.nav.last.navid !== null) {
      core.cache.pages[core.nav.last.navid] = core.store.getState().graph;
    }
    if (core.cache.pages[pageid] !== undefined) {
      core.components.graph.setData({ options, ...core.cache.pages[pageid] });
    } else {
      core.components.graph.setData({ options, ...data });
    }
  }
  if (options.component === 'options') {
    core.components.options.setData({ text: component + ':' + pageid });
  }
  */
});