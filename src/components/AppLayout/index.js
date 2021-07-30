import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import element from 'components/@Elements';

import { requestDefaultLayout } from './requests';

class AppLayout extends Component {

  state = { name: '', img: '', rw: 1, rh: 1 }

  requestDefaultLayout = requestDefaultLayout;

  componentDidMount() {
    this.root = document.getElementById('root');
    window.addEventListener('resize', this.resize);

    this.requestDefaultLayout();
  }

  componentWillUnmount() {

  }

  componentDidUpdate(prevProps) {
  
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
    const item = {
      ...elements[id],
      x: { value: elements[id].x.value * this.state.rw },
      y: { value: elements[id].y.value * this.state.rh },
      w: { value: elements[id].w.value * this.state.rw },
      h: { value: elements[id].h.value * this.state.rh },
    };

    if (item.type === 'group') {
      return <div key={id} />
    }

    if (item.type === 'container') {
      return <div key={id} />
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
        {element(elements[id].type, { id, mode: 'user', item: item })}
      </div>
    )

  }
  
  render({ id, route, state, auth, classes } = this.props) {
    if (state.layoutid) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: state.settings.colorback,
            backgroundImage:  `url(${window.__ihp2p ? this.state.img : state.settings.image})${state.settings.colorback}`,
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
