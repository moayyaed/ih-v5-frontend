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

function getPosition(settings) {

  switch(settings.position.value.id) {
    case 'right':
    case 'left':
      return { w: settings.w.value, h: '100%' }
    case 'top':
    case 'bottom':
      return { w: '100%', h: settings.h.value }
    default:
      return { w: settings.w.value, h: settings.h.value }
  }
}

function Dialog(props) {
  const pos = getPosition(props.settings);
  return (
    <div 
      style={{ 
        width: pos.w, 
        height: pos.h,
      }}>
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
        position: data.settings.position.value.id, 
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
