import React, { useState } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';


const styles = {
  root: {
    top: 35,
    position: 'absolute',
    width: '100%',
    height: 'calc(100% - 35px)',
  }
};


function handleContextMenuPageBody(e, params) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDebug(e, debug, setDebug) {
  if (e.altKey && e.keyCode === 68) {
    setDebug(!debug)
  }
}


function getComponent(debug, route, state) {
  const scheme = core.options.componentsScheme[route.componentid];
  
  if (core.options.components[route.componentid] !== undefined) {
    return React.createElement(core.options.components[route.componentid], { 
      key: route.componentid,
      debug,
      scheme, 
      route,
      state,
    })
  }
  return React.createElement(core.options.components.default, { 
    key: route.componentid,
    debug,
    scheme, 
    route,
    state,
  })
}


function AppPage(props) {
  const [debug, setDebug] = useState(false);
  if (props.route.componentid) {
    return (
      <div 
        className="apppage"
        tabIndex="0" 
        style={styles.root} 
        onKeyDown={(e) => handleDebug(e, debug, setDebug)} 
        onContextMenu={(e) => handleContextMenuPageBody(e, props.state)}
      >
        {getComponent(debug, props.route, props.state)}
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