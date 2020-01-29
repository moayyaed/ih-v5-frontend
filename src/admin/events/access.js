import core from 'core';


core.events.on('app:login', () => {
  core.router(core.nav.history.location);
  core.components.app.setData({ auth: true });
});

core.events.on('app:exit', () => {
  core.router(null);
  core.components.app.setData({ auth: false });
});