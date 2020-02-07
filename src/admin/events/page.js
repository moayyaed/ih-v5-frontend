import core from 'core';


core.events.on('page', (params) => {
  core.cache({ component: 'page', params });
  
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