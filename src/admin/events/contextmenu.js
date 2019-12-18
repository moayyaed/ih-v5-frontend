import core from 'core';

import { 
  contextmenuExplorerBodyData, 
  contextmenuExplorerItemData, 
  contextmenuTabData,
  contextmenuPageData,
} from '../temp';

// contextmenu

core.events.on('contextmenu:nav', (e, params) => {
  core.app.contextmenu.show(e, contextmenuExplorerBodyData);
});

core.events.on('contextmenu:nav:item', (e, params) => {
  core.app.contextmenu.show(e, contextmenuExplorerItemData);
});

core.events.on('contextmenu:tab', (e, params) => {
  core.app.contextmenu.show(e, contextmenuTabData);
});

core.events.on('contextmenu:page', (e, params) => {
  core.app.contextmenu.show(e, contextmenuPageData);
});
