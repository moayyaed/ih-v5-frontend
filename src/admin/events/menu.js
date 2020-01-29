import core from 'core';


core.events.on('app:menu', () => {
  core.req({ alias: 'menu', method: 'data', type: 'menu' })
    .ok((res) => core.components.appmenu.setData({ list: res.data }))
});