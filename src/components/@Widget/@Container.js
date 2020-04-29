import React, { Component } from 'react';
import core from 'core';


const styles = {
  root: {
    width: '100%',
    height: '100%',
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

  render() {
    return (
      <div style={styles.root}>
        {this.state.list
          .map(key => {
            const element = this.state.elements[key]
            return (
              <div
                key={key} 
                style={{
                  position: 'absolute',
                  transform: `translate3d(${element.x}px, ${element.y}px, 0px)`,
                  width: element.w,
                  height: element.h,
                  border: `1px solid ${element.borderColor}`
                }} 
              />
            )
          })}
      </div>
    )
  }
}


export default Container;