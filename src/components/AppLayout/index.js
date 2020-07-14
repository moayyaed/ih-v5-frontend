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
        data.layout.list.forEach(id => {
          if (data.layout.elements[id].type === 'container') {
            core.tunnel.sub({ 
              method: 'sub',
              type: 'container',
              uuid: id,
              id: data.layout.elements[id].containerId.id,
            }, (realtime) => this.realtime(data.layout.elements[id].containerId.id, realtime));
          }
        });
    });
  }

  realtime = (containerId, data) => {
    core.actions.layout.updateTemplates(containerId, data);
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
            left: item.x * scaleW,
            top: item.y * scaleH,
            width: item.w * scaleW,
            height: item.h * scaleH,
            opacity: item.opacity / 100,
            zIndex: item.zIndex,
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
            left: item.x * scaleW,
            top: item.y * scaleH,
            width: item.w * scaleW,
            height: item.h * scaleH,
            zIndex: item.zIndex,
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
            left: item.x * scaleW,
            top: item.y * scaleH,
            width: item.w * scaleW,
            height: item.h * scaleH,
            zIndex: item.zIndex,
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
          left: item.x * scaleW,
          top: item.y * scaleH,
          width: item.w * scaleW,
          height: item.h * scaleH,
          zIndex: item.zIndex,
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
                  {state.layout.list.map(id => this.handleRender(id, state.layout.elements[id], width / state.layout.settings.w, height / state.layout.settings.h))}
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
