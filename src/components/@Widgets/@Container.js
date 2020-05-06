import React, { PureComponent } from 'react';
import core from 'core';

import ReactResizeDetector from 'react-resize-detector';


const styles = {
  root: {
    width: 100,
    height: 100,
  }
}

class Container extends PureComponent {
  state = { settings: {}, list: [], elements: {} }

  componentDidMount() {
    if (this.props.params.containerId.id) {
      this.handleRequest(this.props.params.containerId.id)
    }
  }

  handleRequest = (id) => {
    console.log(id)
    core
      .request({ method: 'widget_container', params: id })
      .ok(res => {
        this.setState(state => {
          console.log(res)
          return { ...state, ...res }
        })
      })
  }

  componentDidUpdate(lastProps) {
    if (lastProps.params.containerId.id !== this.props.params.containerId.id) {
      this.handleRequest(this.props.params.containerId.id)
    }
  }

  render({ settings, list } = this.state) {
    return (
      <ReactResizeDetector handleWidth handleHeight>
        {({ width, height }) => {
          if (width) {
            const ratio = Math.min((width - 2) / settings.w, (height - 2) / settings.h);
            return (
              <div style={{ width: settings.w * ratio, height: settings.h * ratio }}>
                {list
                  .map(key => {
                    const element = this.state.elements[key]
                    return (
                      <div
                        key={key} 
                        style={{
                          position: 'absolute',
                          transform: `translate3d(${element.x * ratio}px, ${element.y * ratio}px, 0px)`,
                          width: element.w * ratio,
                          height: element.h * ratio,
                          border: `1px solid ${element.borderColor}`
                        }} 
                      />
                    )
                  })
                }
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