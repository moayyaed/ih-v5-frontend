import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Tabs from './Tabs';
import Tab from './Tab';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
};

const classes = theme => ({

});


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
}

function handleChangeTabs(v, route) {
  core.route(`${route.menuid}/${route.rootid}/${route.componentid}/${route.nodeid}/${v}`);
}


function AppPage(props) {
  if (props.route.componentid) {
    const schema = core.options.componentScheme[props.route.componentid];
    return (
      <div style={styles.root} onContextMenu={(e) => handleContextMenuPageBody(e, props.state)}>
        <div >
          <Tabs value={props.route.tab} onChange={(_, v) => handleChangeTabs(v, props.route)} >
            {schema.tabs.map(i => <Tab key={i.id} value={i.id} label={i.title} />)}
          </Tabs>
          <Typography className={classes.padding} />
        </div>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5', padding: 20 }}>
          CONTENT
        </div>
      </div>
    );
  }
  return null
}


const mapStateToProps = createSelector(
  state => state.app.route,
  state => state.appnav,
  (route, state) => ({ route, state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppPage));