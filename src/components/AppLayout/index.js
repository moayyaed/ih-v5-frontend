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
    core.transfer.sub('command_layout', this.commandLayout);
    core.transfer.sub('chartdata', this.realtimeCharts);

    this.cache = {};
    this.subs = {}
    this.request();
  }

  realtimeLayout = (data) => {
    core.actions.layout.updateElementsLayout(data);
  }

  realtimeContainer = (containerId, data) => {
    core.actions.layout.updateElementsContainer(containerId, data);
  }

  realtimeCharts = (data) => {
    Object
      .keys(data)
      .forEach(key => {
        const json = JSON.stringify(data[key]);
        if (this.cache[key] !== json) {
          this.cache[key] = json;
          core.transfer.send('realtime_charts', { [key]: data[key]});
        }
      })
  }

  commandLayout = (data) => {
    if (data.command === 'gotolayout') {
      core.route(data.id);
    }
    if (data.command === 'showdialog') {
      core.transfer.send('show_dialog_command', data);
    }

    if (data.command === 'synccharts') {
      if (data.containerId) {
        core.actions.layout.syncChartsContainer(data.containerId, data.range, data.realtime);
      } else {
        core.actions.layout.syncChartsLayout(data.range, data.realtime);
      }
    }
  }
  
  request = () => {
    const params = {
      layoutId: this.props.route.layout || this.props.app.auth.layout,
    };

    if (this.props.state.layoutId !== null) {
     core.tunnel.unsub({ 
        method: 'unsub',
        type: 'layout',
        uuid: this.props.state.layoutId,
        id: this.props.state.layoutId,
      }, this.realtimeLayout);

      this.props.state.layout.list.forEach(id => {
        if (this.props.state.layout.elements[id].type === 'container') {
          core.tunnel.unsub({ 
            method: 'unsub',
            type: 'container',
            uuid: id,
            id: this.props.state.layout.elements[id].containerId.id,
          }, this.subs[this.props.state.layout.elements[id].containerId.id]);
          delete this.subs[this.props.state.layout.elements[id].containerId.id]
        }
      });
    }

    core
      .request({ method: 'applayout', params })
      .ok(data => {
        data.layoutId = params.layoutId;
        core.actions.layout.data(data);
        core.tunnel.sub({ 
          method: 'sub',
          type: 'layout',
          uuid: params.layoutId,
          id: params.layoutId,
        }, this.realtimeLayout);

        data.layout.list.forEach(id => {
          if (data.layout.elements[id].type === 'container') {
            this.subs[data.layout.elements[id].containerId.id] = (realtime) => this.realtimeContainer(data.layout.elements[id].containerId.id, realtime)
            core.tunnel.sub({ 
              method: 'sub',
              type: 'container',
              uuid: id,
              id: data.layout.elements[id].containerId.id,
            }, this.subs[data.layout.elements[id].containerId.id]);
          }
        });
    });
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
            visibility: item.visible && item.visible.value == false ? 'hidden' : 'unset',
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
          {elemets(this.props.state.layout.elements[id].type, { id, layoutId: this.props.state.layoutId, mode: 'user', item: this.props.state.layout.elements[id], container: this.props.state.containers[this.props.state.layout.elements[id].containerId.id], templates: this.props.state.templates, scaleW, scaleH })}
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
        {elemets(this.props.state.layout.elements[id].type, { id, layoutId: this.props.state.layoutId, mode: 'user', item: this.props.state.layout.elements[id] })}
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.layout !== this.props.route.layout) {
      this.request();
    }
  }
  render({ id, route, state, auth, classes } = this.props) {
    if (state.layoutId === null) {
      return null;
    }

    const type = state.layout.settings.backgroundColor.type;
    const color = type === 'fill' ? '' : ', ' + state.layout.settings.backgroundColor.value;
    const src =  state.layout.settings.backgroundImage.value.indexOf('://') !== -1 ? state.layout.settings.backgroundImage.value : '/images/' + state.layout.settings.backgroundImage.value
    return (
      <ReactResizeDetector handleWidth handleHeight>
        {({ width, height }) => {
          if (width && state.layout.settings) {
            return (
              <div 
                style={{
                  ...styles.root,
                  backgroundColor: state.layout.settings.backgroundColor.value,
                  backgroundImage:  `url(${encodeURI(src)})${color}`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
              >
                <div style={{ width: '100%', height: '100%', background: state.layout.settings.overlayColor.value }}>
                  {state.layout.list.map(id => this.handleRender(id, state.layout.elements[id], width / state.layout.settings.w.value, height / state.layout.settings.h.value))}
                </div>
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
