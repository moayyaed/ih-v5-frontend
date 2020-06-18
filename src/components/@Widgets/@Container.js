import React, { Component } from 'react';
import core from 'core';

import ReactResizeDetector from 'react-resize-detector';
import elemets from 'components/@Elements';


const styles = {
  root: {
    width: 100,
    height: 100,
  }
}

class Container extends Component {
  state = { settings: {}, list: [], elements: {} }

  componentDidMount() {
    if (this.props.params.containerId.id) {
      this.handleRequest(this.props.params.containerId.id)
    }
  }

  handleRequest = (id) => {
    core
      .request({ method: 'widget_container', params: id })
      .ok(res => {
        this.setState(state => {
          return { ...state, ...res }
        })
      })
  }

  componentDidUpdate(lastProps) {
    if (lastProps.params.containerId.id !== this.props.params.containerId.id) {
      this.handleRequest(this.props.params.containerId.id)
    }
  }

  handleRender = (id, item) => {
    if (item.type === 'group') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x,
            top: item.y,
            width: item.w,
            height: item.h,
          }}
        >
          {item.elements.map(cid => this.handleRender(cid, this.state.elements[cid]))}
        </div>
      )
    }
    if (item.type === 'template') {
      return (
        <div
          key={id}
          style={{ 
            position: 'absolute', 
            left: item.x,
            top: item.y,
            width: item.w,
            height: item.h,
          }}
        >
          {elemets(id, item, this.state.templates[item.templateId])}
        </div>
      )
    }
    return (
      <div
        key={id}
        style={{ 
          position: 'absolute', 
          left: item.x,
          top: item.y,
          width: item.w,
          height: item.h,
        }}
      >
        {elemets(id, this.state.elements[id], null)}
      </div>
    )
  }

  render({ list, settings, elements } = this.state) {
    return (
      <ReactResizeDetector handleWidth handleHeight>
        {({ width, height }) => {
          if (width && settings.w) {
            const scale = Math.min((width) / settings.w, (height) / settings.h);
            return (
              <div style={{ position: 'relative', width: settings.w, height: settings.h, zoom: scale }}>
                {list.map(id => this.handleRender(id, elements[id]))}
              </div>
            )
          }
          return <div />;
        }}
      </ReactResizeDetector>
    )
  }
}


export default Container;