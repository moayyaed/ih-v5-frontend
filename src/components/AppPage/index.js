import React, { Component } from 'react';
import core from 'core';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
};


function getComponent(type, id) {
  if (core._options.components[type] !== undefined && core._options.components[type].component) {
    return React.createElement(core._options.components[type].component);
  }
  if (type) {
    return React.createElement(core._options.components.options.component);
  }
  return null;
}

function handleContextMenuPageBody(e, params) {
  e.preventDefault();
  e.stopPropagation();
  core.event('contextmenu', 'page', e, params);
}


function AppPage(props) {
  if (true) {
    return (
      <div style={styles.root} onContextMenu={(e) => handleContextMenuPageBody(e, props.state)}>
        APP_PAGE
      </div>
    );
  }
  return null
}


export default AppPage;