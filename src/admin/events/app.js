import core from 'core';


core.events.on('app:menu', (id) => {
  core.actions.appmenu.setData({
    list: [
      { id: '1', route: 'menu1', label: 'Menu 1', tooltip: 'App Menu 1', icon: '' },
      { id: '2', route: 'menu2', label: 'Menu 2', tooltip: 'App Menu 2', icon: '' },
      { id: '3', route: 'menu3', label: 'Menu 3', tooltip: 'App Menu 3', icon: '' },
    ],
  });
});

core.events.on('app:nav', (id, navid) => {
  console.log(navid);
});