import core from 'core';


//page
core.app.page.data = function(options, data) {

}

// contextmenu
core.app.contextmenu.show = function(e, data, params, state) {
  core.components.appcontextmenu.show(e, data, params, state);
}

core.app.contextmenu.close = function(options) {
  core.components.appcontextmenu.close();
}