import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import element from 'components/@Elements';

import { requestDefaultLayout, requestChangeContainer } from './requests';
import { layoutCommand } from './commands';

class AppLayout extends Component {

  state = { name: '', img: '', rw: 1, rh: 1 }

  requestDefaultLayout = requestDefaultLayout;
  requestChangeContainer = requestChangeContainer;

  command = layoutCommand;

  componentDidMount() {
    this.root = document.getElementById('root');
    window.addEventListener('resize', this.resize);

    core.transfer.sub('command_layout', this.command.bind(this));
    
    this.requestDefaultLayout();
  }

  componentWillUnmount() {

  }

  componentDidUpdate(prevProps) {
  
  }

  realtime = (data) => {
    core.actions.layout.updateElementsAll(data);
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
      return <div key={id} />
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
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: state.settings.colorback,
            backgroundImage:  `url(${window.__ihp2p ? this.state.img : state.settings.image})${state.settings.colorback2}`,
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
