import core from 'core';


core.action.appmenu = function(list) {
  core.components.appmenu.setData({ list });
}

core.action.appnav = function(options, list) {
  core.components.appbody.setData({ options, tabs: [] });
  core.components.explorer.setData({ list });
}

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