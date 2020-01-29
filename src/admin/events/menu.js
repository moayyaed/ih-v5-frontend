import core from 'core';


core.events.on('app:menu', (id, params) => {
  core.app.menu.data([
    { id: '1', route: 'devices', title: 'Устройства', tooltip: 'Устройства', icon: '' },
    { id: '2', route: 'visualization', title: 'Визуализация', tooltip: 'Визуализация', icon: '' },
    { id: '3', route: 'scripts', title: 'Сценарии', tooltip: 'Сценарии', icon: '' },
    { id: '4', route: 'datasource', title: 'Источники данных', tooltip: 'Источники данных', icon: '' },
    { id: '6', route: 'analytics', title: 'Аналитика', tooltip: 'Аналитика', icon: '' },
    { id: '7', route: 'access', title: 'Доступ', tooltip: 'Доступ', icon: '' },
    { id: '8', route: 'database', title: 'База данных', tooltip: 'База данных', icon: '' },
    { id: '9', route: 'resources', title: 'Ресурсы', tooltip: 'Ресурсы', icon: '' },
  ]);
});

  /*
  core.fetch({ method: 'data', type: 'menu' })
  .then(res => {
    core.app.menu.data(res.data)
  })
  */