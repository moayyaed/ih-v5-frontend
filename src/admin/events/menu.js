import core from 'core';


core.events.on('app:menu', () => {
 core
    .request({ component: 'menu', params: {} })
    .ok(core.components.appmenu.setData)
});


core.events.on('app:menu:click', (menuid) => {
  core.components.appmenu.setSelect(menuid);
});