import core from 'core';


//menu
core.action.appmenu.data = function(list) {
  core.components.appmenu.setData({ list });
}

core.action.appmenu.select = function(id) {
  core.components.appmenu.setSelect(id);
}


//nav
core.action.appnav.data = function(options, list) {
  // core.components.appbody.setData({ options, tabs: [], list });
  core.components.explorer.setData({ selectid: null, list });
}

core.action.appnav.select = function(id) {
  core.components.explorer.setSelect(id);
}


//page
core.action.apppage = function(options, data) {
  if (options.component === 'table') {
    core.components.table.setData({ text: options.component + ':' + options.pageid });
  }
  if (options.component === 'graph') {
    core.components.graph.setData({ text: options.component + ':' + options.pageid });
  }
  if (options.component === 'options') {
    core.components.options.setData({ text: options.component + ':' + options.pageid });
  }
}