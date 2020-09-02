import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import elemets from 'components/@Elements';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
};

const classes = theme => ({

});

const DEFAULT = {
  animation: {},
  zIndex: { value: 100 },
  opacity: { value: 100 },
  overflow: { value: true },
}

function Dialog(props) {
  return (
    <div style={{ width: props.settings.w.value, height: '100%' }}>
      {elemets('container', { mode: 'user', item: { ...DEFAULT, ...props.settings}, container: props, templates: {}, scaleW: 1, scaleH: 1 })}
    </div>
  )
}


class AppLayout extends Component {

  componentDidMount() {
    core.transfer.sub('show_dialog_command', this.handleShowDialogCommand);
  }

  handleShowDialogCommand = (data) => {
    this.request(data);
  }

  handleCloseDrawer = () => {
    core.actions.layoutDialog.data({ open: false });
  }

  request = ({ id }) => {
    core
    .request({ method: 'applayout_dialog', params: { id } })
    .ok(data => {
      core.actions.layoutDialog.data({
        ...data,
        open: true, 
        type: 'drawer', 
        position: 'right', 
        id,
      });
    })
  }

  render({ id, route, state, auth, classes } = this.props) {
    return (
      <Drawer anchor={state.position} open={state.open} onClose={this.handleCloseDrawer}>
        {state.open ? React.createElement(Dialog, state): null}
      </Drawer>
    );
  }
}


const mapStateToProps = createSelector(
  state => state.layoutDialog,
  state => state.app,
  (state, app) => ({ state, app })
)

export default connect(mapStateToProps)(withStyles(classes)(AppLayout));
