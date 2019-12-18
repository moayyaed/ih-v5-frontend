import core from 'core';

import { contextmenuExplorerData, contextmenuTabData } from '../temp';

// contextmenu
core.events.on('contextmenu:nav', (e, params) => {
  core.app.contextmenu.show(e, contextmenuExplorerData);
});

core.events.on('contextmenu:tab', (e, params) => {
  core.app.contextmenu.show(e, contextmenuTabData);
});

core.events.on('contextmenu:exit', (target, params) => {
  // core.app.contextmenu.close();
});