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
  core.action.appnav({ navid }, [
    { component: 'table', id: 'lamp_1'},
    { component: 'table', id: 'lamp_2'},
    { component: 'table', id: 'lamp_3'},
  ])
});

core.events.on('app:nav:layouts', (navid) => {
  core.action.appnav({ navid }, [
    { component: 'graph', id: 'layout_1'},
    { component: 'graph', id: 'layout_2'},
    { component: 'graph', id: 'layout_3'},
    { component: 'graph', id: 'layout_4'},
    { component: 'graph', id: 'layout_5'},
  ])
});

core.events.on('app:nav:scripts', (navid) => {
  core.action.appnav({ navid }, [
    { component: 'options', id: 'script_1'},
    { component: 'options', id: 'script_2'},
    { component: 'options', id: 'script_3'},
    { component: 'options', id: 'script_4'},
    { component: 'options', id: 'script_5'},
  ])
});

core.events.on('app:nav:datasource', (navid) => {
  core.action.appnav({ navid }, [
    { component: 'table', id: 'plugins'},
    { component: 'table', id: 'snippet'},
    { component: 'table', id: 'hubs'},
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