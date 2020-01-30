import core from 'core';


function cache(params) {
  const store = core.store.getState();


}

core.events.on('app:page', (params) => {
  cache(params);

  core.req({ 
    alias: 'page', 
    method: 'data', 
    type: 'x-component', 
    id: params.menuid 
  })
  .ok((res) => {
    core.components.layout.setData({ ...res.data, loading: false });
  })

  /*
  core.components.apptabs.addItem({ id: pageid, label: pageid, component });

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