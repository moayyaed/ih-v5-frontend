import core from 'core';


core.events.on('app:login', (paras) => {
  core.req({ 
    method: 'auth', 
    username: 'admin', 
    password: '1234' 
  })
  .ok((res) => {
    core.router(core.nav.history.location);
    core.components.app.setData({ auth: true });
    core.cache.token = res.token;
  })
});

core.events.on('app:exit', () => {
  core.router(null);
  core.components.app.setData({ auth: false });
});