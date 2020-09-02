import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';


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
    core.transfer.sub('show_dialog_command', this.handleShowDialogCommand);
  }

  handleShowDialogCommand = (data) => {
    console.log(data)
  }

  render({ id, route, state, auth, classes } = this.props) {
    return <div>DIALOG</div>;
  }
}


const mapStateToProps = createSelector(
  state => state.dialog,
  state => state.app,
  (route, state, app) => ({ route, state, app })
)

export default connect(mapStateToProps)(withStyles(classes)(AppLayout));
