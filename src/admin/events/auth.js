import core from 'core';


core.events.on('app:auth', () => {
  core.router(core.nav.history.location);
  core.components.app.setData({ auth: true });
});