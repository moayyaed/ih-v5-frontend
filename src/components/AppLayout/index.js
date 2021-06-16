import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import ReactResizeDetector from 'react-resize-detector';
import elemets from 'components/@Elements';

import shortid from 'shortid';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
};

const classes = theme => ({

});



class AppLayout extends Component {

  state = { name: '', img: '' }

  componentDidMount() {
    if (window.__ihp2p) {
      this.uuid = shortid.generate();
    }

    core.transfer.sub('command_layout', this.commandLayout);
    core.transfer.sub('chartdata', this.realtimeCharts);

    this.cache = {};
    this.subs = {}
    this.request();
  }

  componentWillUnmount() {
    if (this.uuid) {
      window.__ihp2p.image(this.uuid, null);
      this.uuid = null;
    }
  }

  handleLoadImage = (name, url) => {
    this.setState({ name, img: url })
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
      if (this.props.state.layoutId === data.id) {
        if (data.target_container_id && data.target_frame) {
          core
          .request({ method: 'get_container', params: data.target_container_id })
          .ok(res => {
            const container = this.props.state.layout.elements[data.target_frame];
            if (container) {
              core.tunnel.unsub({ 
                method: 'unsub',
                type: 'container',
                uuid: container.widgetlinks.link.id,
                id: container.widgetlinks.link.id,
              }, this.subs[container.widgetlinks.link.id]);
              delete this.subs[container.widgetlinks.link.id]

              this.subs[data.target_container_id] = (realtime) => this.realtimeContainer(data.target_container_id, realtime)
              core.tunnel.sub({ 
                method: 'sub',
                type: 'container',
                uuid: data.target_container_id,
                id: data.target_container_id,
              }, this.subs[data.target_container_id]);
              core.actions.layout.changeContainer(data.target_frame, data.target_container_id, res);
            }
          });
        }
      } else {
        core.route(data.id);
      }
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

    if ( data.command === 'synccharts_dialog') {
      core.actions.layoutDialog.syncCharts(data.range, data.realtime);
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
            id: this.props.state.layout.elements[id].widgetlinks.link.id,
          }, this.subs[this.props.state.layout.elements[id].widgetlinks.link.id]);
          delete this.subs[this.props.state.layout.elements[id].widgetlinks.link.id]
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
            this.subs[data.layout.elements[id].widgetlinks.link.id] = (realtime) => this.realtimeContainer(data.layout.elements[id].widgetlinks.link.id, realtime)
            core.tunnel.sub({ 
              method: 'sub',
              type: 'container',
              uuid: id,
              id: data.layout.elements[id].widgetlinks.link.id,
            }, this.subs[data.layout.elements[id].widgetlinks.link.id]);
          }
        });
    });
  }

  handleRender = (id, _item, scaleW, scaleH) => {
    const item = {
      ..._item,
      x: { value: _item.x.value * scaleW },
      y: { value: _item.y.value * scaleH },
      w: { value: _item.w.value * scaleW },
      h: { value: _item.h.value * scaleH },
    };
    if (item.type === 'group') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x.value,
            top: item.y.value,
            width: item.w.value,
            height: item.h.value,
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
            left: item.x.value,
            top: item.y.value,
            width: item.w.value,
            height: item.h.value,
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
          key={(item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id) || id}
          style={{ 
            position: 'absolute', 
            left: item.x.value,
            top: item.y.value,
            width: item.w.value,
            height: item.h.value,
            zIndex: item.zIndex.value,
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
          }}
        >
          {elemets(this.props.state.layout.elements[id].type, { id, layoutId: this.props.state.layoutId, mode: 'user', item: this.props.state.layout.elements[id], container: this.props.state.containers[this.props.state.layout.elements[id].widgetlinks.link.id], templates: this.props.state.templates, scaleW, scaleH })}
        </div>
      )
    }
    return (
      <div
        key={id}
        style={{ 
          position: 'absolute', 
          left: item.x.value,
          top: item.y.value,
          width: item.w.value,
          height: item.h.value,
          zIndex: item.zIndex.value,
          animation: item.animation && item.animation.active ? item.animation.value : 'unset',
        }}
      >
        {elemets(this.props.state.layout.elements[id].type, { id, layoutId: this.props.state.layoutId, mode: 'user', item: item })}
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route.layout !== this.props.route.layout) {
      this.request();
    }

    if (prevProps.state.layout.settings === undefined || this.props.state.layout.settings.backgroundImage.value !== prevProps.state.layout.settings.backgroundImage.value) {
      if (window.__ihp2p) {
        window.__ihp2p.image(this.uuid, this.props.state.layout.settings.backgroundImage.value, this.handleLoadImage);
      }
    }
  }
  
  render({ id, route, state, auth, classes } = this.props) {
    if (state.layoutId === null) {
      return null;
    }
    const img = window.__ihp2p ? this.state.img : state.layout.settings.backgroundImage.value;
    const type = state.layout.settings.backgroundColor.type;
    const color = type === 'fill' ? '' : ', ' + state.layout.settings.backgroundColor.value;
    const src =  img.indexOf('://') !== -1 ? img : '/images/' + img
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
