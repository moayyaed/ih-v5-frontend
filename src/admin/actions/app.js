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
  if (core.nav.last.menuid !== null) {
    core.cache.paths[core.nav.last.menuid] = core.nav.last.pathname;
    core.cache.apptabs[core.nav.last.menuid] = core.store.getState().apptabs;
  }
  if (core.cache.apptabs[options.navid] !== undefined) {
    core.components.apptabs.setData(core.cache.apptabs[options.navid]);
    core.components.explorer.setData({ selectid: null, list });
  } else {
    core.components.apptabs.setData({ selectid: null, list: [] });
    core.components.explorer.setData({ selectid: null, list });
  }
}

core.action.appnav.select = function(id) {
  core.components.explorer.setSelect(id);
}


//page
core.action.apppage.data = function(options, data) {
  const { pageid, component } = options;
  core.components.apptabs.addItem({ id: pageid, label: pageid, component });

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

// contextmenu
core.action.appcontextm.data = function(options, data) {
  core.components.appcontextmenu.setData({ 
    open: true, 
    target: options.target, 
    list: data 
  });
}

core.action.appcontextm.close = function(options, data) {
  core.components.appcontextmenu.setClose();
}