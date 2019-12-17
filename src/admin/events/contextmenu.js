import core from 'core';

// contextmenu
core.events.on('contextmenu:nav', (target, params) => {
  core.action.appcontextm.data({ target }, [])
});


core.events.on('contextmenu:exit', (target, params) => {
  core.action.appcontextm.close();
});

