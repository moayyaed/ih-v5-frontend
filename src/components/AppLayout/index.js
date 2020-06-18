import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';


const styles = {
  root: {

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
      .ok(res => console.log(res));
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
  state => state.applayout,
  state => state.app,
  (route, state, app) => ({ route, state, app })
)

export default connect(mapStateToProps)(withStyles(classes)(AppLayout));
