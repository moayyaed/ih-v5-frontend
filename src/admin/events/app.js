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
  console.log('nav id', navid);
});

core.events.on('app:nav:layouts', (navid) => {
  console.log('nav id', navid);
});

core.events.on('app:nav:scripts', (navid) => {
  console.log('nav id', navid);
});

core.events.on('app:nav:datasource', (navid) => {
  console.log('nav id', navid);
});

core.events.on('app:nav:analytics', (navid) => {
  console.log('nav id', navid);
});

core.events.on('app:nav:access', (navid) => {
  console.log('nav id', navid);
});

core.events.on('app:nav:database', (navid) => {
  console.log('nav id', navid);
});

core.events.on('app:nav:resources', (navid) => {
  console.log('nav id', navid);
});