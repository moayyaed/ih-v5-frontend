import core from 'core';


core.action.appmenu = function(list) {
  core.components.appmenu.setData({ list });
}

core.action.appnav = function(options, list) {
  core.components.explorer.setData({ list });
}

core.action.apppage = function(options, data) {
  console.log(options);
}