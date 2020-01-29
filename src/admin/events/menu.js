import core from 'core';


core.events.on('app:menu', () => {
  core.req({ method: 'data', type: 'menu' })
    .ok((res) => core.app.menu.data(res.data))
});