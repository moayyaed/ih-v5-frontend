import core from 'core';

import { contextmenuData } from '../temp';

// contextmenu
core.events.on('contextmenu:nav', (e, params) => {
  core.app.contextmenu.show(e, contextmenuData);
});

core.events.on('contextmenu:exit', (target, params) => {
  // core.app.contextmenu.close();
});