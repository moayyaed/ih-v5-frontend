import React from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
};


function handleContextMenuPageBody(e, params) {
  e.preventDefault();
  e.stopPropagation();
}

function getComponent(route) {
  const scheme = core.options.componentsScheme[route.componentid];
  
  if (core.options.components[route.componentid] !== undefined) {
    return React.createElement(core.options.components[route.componentid], { key: route.componentid, scheme, route })
  }
  return React.createElement(core.options.components.default, { key: route.componentid, scheme, route })
}


function AppPage(props) {
  if (props.route.componentid) {
    return (
      <div style={styles.root} onContextMenu={(e) => handleContextMenuPageBody(e, props.state)}>
        {getComponent(props.route)}
      </div>
    );
  }
  return null
}


const mapStateToProps = createSelector(
  state => state.app.route,
  (route) => ({ route })
)

export default connect(mapStateToProps)(AppPage);