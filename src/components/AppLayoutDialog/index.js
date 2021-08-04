import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';

import elemets from 'components/@Elements';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
  drawer: {
    backgroundColor: 'transparent',
  }
};

const classes = theme => ({
  paper: {
    margin: 0,
    maxWidth: 'unset',
    backgroundColor: 'transparent',
  }
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

function RenderCore(props) {
  const pos = getPosition(props.settings);
  return (
    <div 
      style={{ 
        width: pos.w, 
        height: pos.h,
      }}>
      {elemets('dialog', { key: props.id, mode: 'user', item: { ...DEFAULT, ...props.settings, dialogId: props.id, containerId: { id: null } }, container: props, templates: {}, scaleW: 1, scaleH: 1 })}
    </div>
  )
}


class AppLayoutDialog extends Component {

  componentDidMount() {
    core.transfer.sub('show_dialog_command', this.handleShowDialogCommand);
    core.transfer.sub('close_dialog_command', this.handleCloseDialogCommand);
  }

  handleShowDialogCommand = (data) => {
    this.request(data);
  }

  handleCloseDialogCommand = () => {
    this.handleClose();
  }

  handleClose = () => {
    this.clearAnimation();
    if (this.props.state.settings.outsideClose && this.props.state.settings.outsideClose.value) {
      core.actions.layoutDialog.data({ open: false, position: undefined });
    }
    if (this.lastId) {
      core.tunnel.unsub({ 
        method: 'unsub',
        type: 'dialog',
        uuid: this.lastId,
        id: this.lastId,
      }, this.realtimeDialog);
    }
    this.lastId = null;
  }

  clearAnimation = () => {
    const temp = []

    Object
      .keys(document.styleSheets[0].rules)
      .forEach(id => {
        if (document.styleSheets[0].rules[id].type === CSSRule.KEYFRAMES_RULE) {
          const keys = document.styleSheets[0].rules[id].name.split('_');
          if (keys[0] === 'dialog') {
            temp.push(id)
          }
        }
      })

      temp
        .reverse()
        .forEach(id => {
          document.styleSheets[0].deleteRule(id);
      })
  }

  realtimeDialog = (data) => {
    core.actions.layoutDialog.updateElements(data);
  }

  request = ({ id, contextId }) => {
    if (this.lastId) {
      core.tunnel.unsub({ 
        method: 'unsub',
        type: 'dialog',
        uuid: id,
        id: id,
      }, this.realtimeDialog);
    }
    core
    .request({ 
      method: 'applayout_dialog', 
      params: { id, contextId, layoutId: this.props.route.layout, username: this.props.app.auth.name } 
    })
    .ok(data => {
      this.lastId = id;
      core.tunnel.sub({ 
        method: 'sub',
        type: 'dialog',
        uuid: id,
        id: id,
        contextId,
      }, this.realtimeDialog);
      core.actions.layoutDialog.data({
        ...data,
        open: true,
        contextId,
        parentId: this.props.state.open ? this.props.state.parentId : id,
        initContextId: this.props.state.open ? this.props.state.initContextId : contextId,
        position: data.settings.position.value.id, 
        id,
      });
    })
  }

  render({ id, route, state, auth, classes } = this.props) {
    const openDialog = state.position === 'center' && state.open;
    const openDrawer = state.position && state.position !== 'center' && state.open;
    return (
      <>
        <Drawer PaperProps={{ style: styles.drawer }} anchor={state.position === 'center' ? 'right' : state.position} open={openDrawer} onClose={this.handleClose} >
          {openDrawer ? React.createElement(RenderCore, state): null}
        </Drawer>
        <Dialog 
          open={openDialog}
          onClose={this.handleClose}
          classes={classes}
        >
          {openDialog ? React.createElement(RenderCore, state): null}
        </Dialog>
      </>
    );
  }
}


const mapStateToProps = createSelector(
  state => state.app.route,
  state => state.layoutDialog,
  state => state.app,
  (route, state, app) => ({ route, state, app })
)

export default connect(mapStateToProps)(withStyles(classes)(AppLayoutDialog));
