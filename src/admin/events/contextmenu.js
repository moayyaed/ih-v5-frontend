import core from 'core';

import { 
  contextmenuExplorerBodyData, 
  contextmenuExplorerItemData, 
  contextmenuTabData,
  contextmenuPageData,
  contextmenuGraphItemData,
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
  // core.app.contextmenu.show(e, contextmenuPageData);
});

core.events.on('contextmenu:graph:layout', (e, params) => {
  core.app.contextmenu.show(e, contextmenuPageData);
});

core.events.on('contextmenu:graph:item', (e, params) => {
  core.app.contextmenu.show(e, contextmenuGraphItemData, params);
});


// click
core.events.on('contextmenu:graph:paste', (item, params) => {
  core.clipboard.read()
    .then(data => {
      if (data !== null) {
        core.components.graph.addContainer(item.position, data);
      }
    })
});


core.events.on('contextmenu:graph:item:copy', (item, params) => {
  core.clipboard.write(params);
});