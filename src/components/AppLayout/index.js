import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import ReactResizeDetector from 'react-resize-detector';
import elemets from 'components/@Elements';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
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
        core.tunnel.sub({ 
          method: 'sub',
          type: 'layout',
          uuid: params.layoutId,
          id: params.layoutId,
        }, this.realtimeLayout);
        data.layout.list.forEach(id => {
          if (data.layout.elements[id].type === 'container') {
            core.tunnel.sub({ 
              method: 'sub',
              type: 'container',
              uuid: id,
              id: data.layout.elements[id].containerId.id,
            }, (realtime) => this.realtimeContainer(data.layout.elements[id].containerId.id, realtime));
          }
        });
    });
  }

  realtimeLayout = (data) => {
    core.actions.layout.updateElementsLayout(data);
  }

  realtimeContainer = (containerId, data) => {
    core.actions.layout.updateElementsContainer(containerId, data);
  }

  handleClick = (id) => {

  }

  handleRender = (id, item, scaleW, scaleH) => {
    if (item.type === 'group') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x.value * scaleW,
            top: item.y.value * scaleH,
            width: item.w.value * scaleW,
            height: item.h.value * scaleH,
            opacity: item.opacity.value / 100,
            zIndex: item.zIndex.value,
            overflow: item.overflow && item.overflow.value ? 'hidden' : 'unset',
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
          }}
        >
          {item.elements.map(cid => this.handleRender(cid, this.props.state.layout.elements[cid], scaleW, scaleH))}
        </div>
      )
    }
    if (item.type === 'template') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x.value * scaleW,
            top: item.y.value * scaleH,
            width: item.w.value * scaleW,
            height: item.h.value * scaleH,
            zIndex: item.zIndex.value,
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
          }}
        >
          {elemets(this.props.state.layout.elements[id].type, { mode: 'user', item: this.props.state.layout.elements[id], template: this.props.state.templates[item.templateId] })}
        </div>
      )
    }
    if (item.type === 'container') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x.value * scaleW,
            top: item.y.value * scaleH,
            width: item.w.value * scaleW,
            height: item.h.value * scaleH,
            zIndex: item.zIndex.value,
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
          }}
        >
          {elemets(this.props.state.layout.elements[id].type, { mode: 'user', item: this.props.state.layout.elements[id], container: this.props.state.containers[this.props.state.layout.elements[id].containerId.id], templates: this.props.state.templates, scaleW, scaleH })}
        </div>
      )
    }
    return (
      <div
        key={id}
        style={{ 
          position: 'absolute', 
          left: item.x.value * scaleW,
          top: item.y.value * scaleH,
          width: item.w.value * scaleW,
          height: item.h.value * scaleH,
          zIndex: item.zIndex.value,
          animation: item.animation && item.animation.active ? item.animation.value : 'unset',
        }}
      >
        {elemets(this.props.state.layout.elements[id].type, { mode: 'user', item: this.props.state.layout.elements[id] })}
      </div>
    )
  }

  render({ id, route, state, auth, classes } = this.props) {
    return (
        <ReactResizeDetector handleWidth handleHeight>
          {({ width, height }) => {
            if (width && state.layout.settings) {
              return (
                <div style={styles.root}>
                  {state.layout.list.map(id => this.handleRender(id, state.layout.elements[id], width / state.layout.settings.w.value, height / state.layout.settings.h.value))}
                </div>
              )
            }
            return <div />;
          }}
        </ReactResizeDetector>
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
