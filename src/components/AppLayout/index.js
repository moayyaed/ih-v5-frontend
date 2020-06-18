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
    /*
    core
      .request({ method: 'applayout' })
      .ok(core.actions.appmenu.data);
    */
  }

  handleClick = (id) => {

  }

  render({ id, route, state, classes } = this.props) {
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
  (route, state) => ({ route, state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppLayout));
