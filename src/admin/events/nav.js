import core from 'core';


core.events.on('app:nav', (_, params) => {
  core.req({ alias: 'nav', method: 'data', type: 'tree', id: params.menuid })
    .ok((res) => core.app.nav.data({ navid: params.menuid , tabs: true }, res.data))
});


/*
core.events.on('app:nav', (navid, params) => {
  core.fetch({ method: 'data', type: 'tree', id: params.menuid })
  .then(res => {
    core.app.nav.data({ navid, tabs: true }, res.data)
  })
});
*/



/*
core.events.on('app:nav:devices', (navid) => {
  core.app.nav.data({ navid, tabs: true }, [
    { id: 'lamp_1', component: 'table', title: 'lamp_1' },
    { id: 'lamp_2', component: 'table', title: 'lamp_2' },
    { id: 'lamp_3', component: 'table', title: 'lamp_3' },
  ])
});

core.events.on('app:nav:visualization', (navid) => {
  core.app.nav.data({ navid, tabs: true }, 
    [
      { id: 'layout', title: 'Экраны', 
        children: [
          { id: 'layout_1', component: 'layout', title: 'layout_1' },
          { id: 'layout_2', component: 'layout', title: 'layout_2' },
          { id: 'layout_3', component: 'layout', title: 'layout_3' },
        ]
      },
      { id: 'template', title: 'Шаблоны', 
        children: [
          { id: 'template_1', component: 'template', title: 'template_1' },
          { id: 'template_2', component: 'template', title: 'template_2' },
          { id: 'template_3', component: 'template', title: 'template_3' },
        ]
      }
    ])
});

core.events.on('app:nav:scripts', (navid) => {
  core.app.nav.data({ navid, tabs: false }, [
    { id: 'script_1', component: 'options', title: 'script_1', children: [
      { id: 'item_1', component: 'options', title: 'item_1' },
      { id: 'item_2', component: 'options', title: 'item_2' },
      { id: 'item_3', component: 'options', title: 'item_3' }
    ] },
    { id: 'script_2', component: 'options', title: 'script_2' },
    { id: 'script_3', component: 'options', title: 'script_3' },
    { id: 'script_4', component: 'options', title: 'script_4' },
    { id: 'script_5', component: 'options', title: 'script_5' },
  ])
});


core.events.on('app:nav:datasource', (navid) => {
  core.app.nav.data({ navid, tabs: true }, [
    { id: 'plugins', component: 'table', title: 'plugins' },
    { id: 'snippet', component: 'table', title: 'snippet' },
    { id: 'hubs', component: 'table', title: 'hubs' },
  ])
});


core.events.on('app:nav:analytics', (navid) => {
  core.app.nav.data({ navid }, [])
});

core.events.on('app:nav:access', (navid) => {
  core.app.nav.data({ navid }, [])
});

core.events.on('app:nav:database', (navid) => {
  core.app.nav.data({ navid }, [])
});

core.events.on('app:nav:resources', (navid) => {
  core.app.nav.data({ navid }, [])
});

*/