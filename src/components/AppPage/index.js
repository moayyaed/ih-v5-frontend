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

function getComponent(route, state) {
  const scheme = core.options.componentsScheme[route.componentid];
  
  if (core.options.components[route.componentid] !== undefined) {
    return React.createElement(core.options.components[route.componentid], { 
      key: route.componentid, 
      scheme, 
      route,
      state,
    })
  }
  return React.createElement(core.options.components.default, { 
    key: route.componentid, 
    scheme, 
    route,
    state,
  })
}


function AppPage(props) {
  if (props.route.componentid) {
    return (
      <div style={styles.root} onContextMenu={(e) => handleContextMenuPageBody(e, props.state)}>
        {getComponent(props.route, props.state)}
      </div>
    );
  }
  return null
}


const mapStateToProps = createSelector(
  state => state.app.route,
  state => state.apppage,
  (route, state) => ({ route, state })
)

export default connect(mapStateToProps)(AppPage);