import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import Panel from 'components/Panel';


const styles = {
  panel: {
    height: '100%',
    backgroundColor: '#ECEFF1',
    padding: 0,
    flexShrink: 0,
    overflow: 'hidden',
    borderRight: '1px solid #d3d3d3',
  }
};

const classes = theme => ({

});


class AppNav extends Component {
  render() {
    if (this.props.route.menuid) {
      return (
        <Panel width={200} position="right" style={styles.panel}>
          {this.props.route.menuid}
        </Panel>
      );
    }
    return null;
  }
}


const mapStateToProps = createSelector(
  state => state.app.route,
  state => state.appmenu,
  (route, state) => ({ route, state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppNav));