import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import widgets from 'components/@Widgets';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
};

const classes = theme => ({

});



class AppLayout extends Component {

  componentDidMount() {
    const params = {
      layoutId: this.props.route.layout || this.props.app.auth.layout,
    };

    core
      .request({ method: 'applayout', params })
      .ok(data => {
        core.actions.layout.data(data);
    });
  }

  realtime = (value) => {
    core.actions.layout.updateTemplates(value);
  }

  handleClick = (id) => {

  }

  render({ id, route, state, auth, classes } = this.props) {
    return (
      <div style={styles.root}>
        USER_INTERFACE
      </div>
    );
  }
}


const mapStateToProps = createSelector(
  state => state.app.route,
  state => state.layout,
  state => state.app,
  (route, state, app) => ({ route, state, app })
)

export default connect(mapStateToProps)(withStyles(classes)(AppLayout));
