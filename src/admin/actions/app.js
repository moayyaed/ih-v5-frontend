import core from 'core';



//nav
core.app.nav.data = function(options, list) {
  if (core.nav.last.menuid !== null) {
    core.cache.paths[core.nav.last.menuid] = core.nav.last.pathname;
    core.cache.apptabs[core.nav.last.menuid] = core.store.getState().apptabs;
    if (core.nav.last.navcomponent === 'template') {
      core.cache.pages[core.nav.last.navid] = core.store.getState().graph;
    }
  }
  if (core.cache.apptabs[options.navid] !== undefined) {
    core.components.apptabs.setData(core.cache.apptabs[options.navid]);
    core.components.explorer.setData({ selectid: null, list });
  } else {
    core.components.apptabs.setData({ selectid: null, list: [] });
    core.components.explorer.setData({ selectid: null, list });
  }
}

core.app.nav.select = function(id) {
  core.components.explorer.setSelect(id);
}


//page
core.app.page.data = function(options, data) {
  const { pageid, component } = options;
  core.components.apptabs.addItem({ id: pageid, label: pageid, component });

  if (options.component === 'table') {
    core.components.table.setData({ text: options.component + ':' + options.pageid });
  }
  if (options.component === 'layout') {
    core.components.options.setData({ options, ...data  });
  }
  if (options.component === 'template') {
    if (core.nav.last.navid !== null) {
      core.cache.pages[core.nav.last.navid] = core.store.getState().graph;
    }
    if (core.cache.pages[pageid] !== undefined) {
      core.components.graph.setData({ options, ...core.cache.pages[pageid] });
    } else {
      core.components.graph.setData({ options, ...data });
    }
  }
  if (options.component === 'options') {
    core.components.options.setData({ text: options.component + ':' + options.pageid });
  }
}

// contextmenu
core.app.contextmenu.show = function(e, data, params, state) {
  core.components.appcontextmenu.show(e, data, params, state);
}

core.app.contextmenu.close = function(options) {
  core.components.appcontextmenu.close();
}