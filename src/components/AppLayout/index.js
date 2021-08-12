import React, { Component } from 'react';
import core from 'core';

import shortid from 'shortid';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import element from 'components/@Elements';

import { 
  requestDefaultLayout, 
  requestChangeLayout, 
  requestChangeContainer,
} from './requests';
import { layoutCommand } from './commands';

class AppLayout extends Component {

  state = { name: '', img: '', rw: 1, rh: 1 }

  requestDefaultLayout = requestDefaultLayout;
  requestChangeLayout = requestChangeLayout;
  requestChangeContainer = requestChangeContainer;

  command = layoutCommand;

  componentDidMount() {
    if (window.__ihp2p) {
      this.uuid = shortid.generate();
    }
    this.cache = {};
    
    this.root = document.getElementById('root');
    window.addEventListener('resize', this.resize);

    core.transfer.sub('command_layout', this.command.bind(this));
    core.transfer.sub('chartdata', this.realtimecharts);

    this.requestDefaultLayout();
  }

  componentDidUpdate(prevProps) {
    if (this.props.route.user === false) {
      if (prevProps.route.layout !== this.props.route.layout) {
        this.usercommand(this.props.route.layout, this.props.route.frames);
      } else {
        if (prevProps.route.uframes !== this.props.route.uframes) {
          this.usercommand(this.props.route.layout, this.props.route.frames);
        }
      }
    }

    if (window.__ihp2p) {
      const prevImg = prevProps.state.elements.__layout ? prevProps.state.elements.__layout.image.value : ''
      const nextImg = this.props.state.elements.__layout ? this.props.state.elements.__layout.image.value : ''  
      if (prevImg !== nextImg) {
        window.__ihp2p.image(this.uuid, nextImg, this.handleLoadImage);
      }
    }
  }

  handleLoadImage = (name, url) => {
    this.setState({ name, img: url })
  }
  
  usercommand = (layoutid, frames) => {
    const targetFrameTable = [];

    if (frames) {
      Object
        .keys(frames)
        .forEach(key => {
          const params = frames[key];
          const target_frame = { id: key.replace(layoutid + '_', '')}
          const container_id = { id: params.containerid }
          const device_id = { id: params.linkid }
          const multichart_id = { id: params.multichartid };
          const timelinechart_id = { id: params.timelineid };
          const journal_id = { id: params.journalid };
          const alertjournal_id = { id: params.alertjournalid };

          targetFrameTable.push({ 
            target_frame, 
            container_id, 
            device_id, 
            multichart_id, 
            timelinechart_id, 
            journal_id, 
            alertjournal_id 
          });
        })
    }

    core.tunnel.command({
      uuid: shortid.generate(),
      type: 'command',
      method: 'action',
      command: 'layout',
      id: layoutid,
      targetFrameTable,
    });
  }

  realtime = (data) => {
    core.actions.layout.updateElementsAll(data);
  }

  realtimecharts = (data) => {
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


  resize = (e) => {
    const state = this.props.state;
    const settings = state.settings || e;
    const width = this.root.offsetWidth;
    const height = this.root.offsetHeight;

    const rw = width / settings.w;
    const rh = height / settings.h;

    this.setState(state => {
      return { ...state, rw, rh };
    })
  }

  elementRender = (id) => {
    const elements = this.props.state.elements;
    const templates = this.props.state.templates;
    const item = elements[id];

    const params = { id, mode: 'user', item };

    if (item.type === 'group') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x.value * this.state.rw,
            top: item.y.value * this.state.rh,
            width: item.w.value * this.state.rw,
            height: item.h.value * this.state.rh,
            zIndex: item.zIndex.value,
            animation: item.animation.active ? item.animation.value : 'unset',
          }}
        >
          {item.list.map(this.elementRender)}
        </div>
      )
    }

    if (item.type === 'container') {
      params.rw = this.state.rw;
      params.rh = this.state.rh;
      params.elements = elements;
      params.templates = templates;
    }

    return (
      <div
        key={id}
        style={{ 
          position: 'absolute', 
          left: item.x.value * this.state.rw,
          top: item.y.value * this.state.rh,
          width: item.w.value * this.state.rw,
          height: item.h.value * this.state.rh,
          zIndex: item.zIndex.value,
          animation: item.animation.active ? item.animation.value : 'unset',
        }}
      >
        {element(elements[id].type, params)}
      </div>
    )
  }
  
  render({ state } = this.props) {
    if (state.layoutid) {
      const img = window.__ihp2p ? this.state.img : state.elements.__layout.image.value;
      const src =  img.indexOf('://') !== -1 ? img : '/images/' + img;
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: state.settings.colorback,
            backgroundImage:  `url(${encodeURI(src)})${state.settings.colorback2}`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div style={{ width: '100%', height: '100%', background: state.settings.colorfront }}>
            {state.list.map(this.elementRender)}
          </div>
        </div>
      );
    }
    return null;
  }
}


const mapStateToProps = createSelector(
  state => state.app.route,
  state => state.layout,
  state => state.app,
  (route, state, app) => ({ route, state, app })
)


export default connect(mapStateToProps)(AppLayout);
