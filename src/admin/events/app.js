import core from 'core';


core.events.on('app:menu', () => {
  core.action.appmenu([
    { id: '1', route: 'devices', label: 'Устройства', tooltip: 'Устройства', icon: '' },
    { id: '2', route: 'layouts', label: 'Экраны', tooltip: 'Экраны', icon: '' },
    { id: '3', route: 'scripts', label: 'Сценарии', tooltip: 'Сценарии', icon: '' },
    { id: '4', route: 'datasource', label: 'Источники данных', tooltip: 'Источники данных', icon: '' },
    { id: '6', route: 'analytics', label: 'Аналитика', tooltip: 'Аналитика', icon: '' },
    { id: '7', route: 'access', label: 'Доступ', tooltip: 'Доступ', icon: '' },
    { id: '8', route: 'database', label: 'База данных', tooltip: 'База данных', icon: '' },
    { id: '9', route: 'resources', label: 'Ресурсы', tooltip: 'Ресурсы', icon: '' },
  ]);
});


core.events.on('app:nav', (navid) => {
  console.log('nav main', navid);
});

core.events.on('app:nav:devices', (navid) => {
  core.action.appnav({ navid, tabs: false }, [
    { id: 'lamp_1', component: 'table', label: 'lamp_1' },
    { id: 'lamp_2', component: 'table', label: 'lamp_2' },
    { id: 'lamp_3', component: 'table', label: 'lamp_3' },
  ])
});

core.events.on('app:nav:layouts', (navid) => {
  core.action.appnav({ navid, tabs: true }, [
    { id: 'layout_1', component: 'graph', label: 'layout_1' },
    { id: 'layout_2', component: 'graph', label: 'layout_2' },
    { id: 'layout_3', component: 'graph', label: 'layout_3' },
    { id: 'layout_4', component: 'graph', label: 'layout_4' },
    { id: 'layout_5', component: 'graph', label: 'layout_5' },
  ])
});

core.events.on('app:nav:scripts', (navid) => {
  core.action.appnav({ navid, tabs: false }, [
    { id: 'script_1', component: 'options', label: 'script_1' },
    { id: 'script_2', component: 'options', label: 'script_2' },
    { id: 'script_3', component: 'options', label: 'script_3' },
    { id: 'script_4', component: 'options', label: 'script_4' },
    { id: 'script_5', component: 'options', label: 'script_5' },
  ])
});

core.events.on('app:nav:datasource', (navid) => {
  core.action.appnav({ navid, tabs: true }, [
    { id: 'plugins', component: 'table', label: 'plugins' },
    { id: 'snippet', component: 'table', label: 'snippet' },
    { id: 'hubs', component: 'table', label: 'hubs' },
  ])
});

core.events.on('app:nav:analytics', (navid) => {
  core.action.appnav({ navid }, [])
});

core.events.on('app:nav:access', (navid) => {
  core.action.appnav({ navid }, [])
});

core.events.on('app:nav:database', (navid) => {
  core.action.appnav({ navid }, [])
});

core.events.on('app:nav:resources', (navid) => {
  core.action.appnav({ navid }, [])
});


core.events.on('app:page', (pageid, component) => {
  core.action.apppage({ component, pageid }, [])
});

core.events.on('app:page:table:layot_1', (pageid, component) => {
  core.action.apppage({ component, pageid }, [])
});