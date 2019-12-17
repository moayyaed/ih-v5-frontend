import core from 'core';


// contextmenu
core.events.on('contextmenu:nav', (e, params) => {
  core.app.contextmenu.show(e, []);
});

core.events.on('contextmenu:exit', (target, params) => {
  // core.app.contextmenu.close();
});

