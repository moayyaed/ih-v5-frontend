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
          }}
        >
          {elemets(this.props.state.layout.elements[id].type, { item: this.props.state.layout.elements[id], template: this.props.state.templates[item.templateId] })}
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
          }}
        >
          {elemets(this.props.state.layout.elements[id].type, { item: this.props.state.layout.elements[id], container: this.props.state.containers[this.props.state.layout.elements[id].containerId.id], templates: this.props.state.templates, scaleW, scaleH })}
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
        }}
      >
        {elemets(this.props.state.layout.elements[id].type, { item: this.props.state.layout.elements[id] })}
      </div>
    )
  }

  render({ id, route, state, auth, classes } = this.props) {
    return (
        <ReactResizeDetector handleWidth handleHeight>
          {({ width, height }) => {
            if (width && state.layout.settings) {
              console.log(width, width / state.layout.settings.w)
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
