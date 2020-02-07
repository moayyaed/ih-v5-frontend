import core from 'core';


core.events.on('menu', () => {
 core
    .request({ component: 'menu', params: {} })
    .ok(core.components.appmenu.setData)
});


core.events.on('menu:click', (menuid) => {
  core.components.appmenu.setSelect(menuid);
});