import core from 'core';

import { 
  graphDataL,
  graphDataL1
} from '../temp';


core.events.on('app:auth', (id, params) => {
  core.fetch({ type: 'auth', username: 'admin', password: '1234' })
  .then(data => {
    core.app.login();
  })
});

core.events.on('app:menu', (id, params) => {
  core.app.menu.data([
    { id: '1', route: 'devices', label: 'Устройства', tooltip: 'Устройства', icon: '' },
    { id: '2', route: 'visualization', label: 'Визуализация', tooltip: 'Визуализация', icon: '' },
    { id: '3', route: 'scripts', label: 'Сценарии', tooltip: 'Сценарии', icon: '' },
    { id: '4', route: 'datasource', label: 'Источники данных', tooltip: 'Источники данных', icon: '' },
    { id: '6', route: 'analytics', label: 'Аналитика', tooltip: 'Аналитика', icon: '' },
    { id: '7', route: 'access', label: 'Доступ', tooltip: 'Доступ', icon: '' },
    { id: '8', route: 'database', label: 'База данных', tooltip: 'База данных', icon: '' },
    { id: '9', route: 'resources', label: 'Ресурсы', tooltip: 'Ресурсы', icon: '' },
  ]);
});


core.events.on('app:nav', (navid, params) => {
  // console.log('nav main', navid);
});

core.events.on('app:nav:devices', (navid) => {
  core.app.nav.data({ navid, tabs: false }, [
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


core.events.on('app:page', (pageid, component) => {
  core.app.page.data({ component, pageid }, graphDataL)
});

core.events.on('app:page:template_1', (pageid, component) => {
  core.app.page.data({ component, pageid }, graphDataL1)
});
