import React, { Component } from 'react';
import core from 'core';


class Container extends Component {
  componentDidMount() {
    if (this.props.params.containerId.id) {
      this.handleRequest(this.props.params.containerId.id)
    }
  }

  handleRequest = (id) => {
    core
      .request({ method: 'widget_container', params: id })
      .ok(res => {
        console.log(res);
      })
  }

  render() {
    return (
      <>
        <div>{this.props.id}</div>
        <div>{this.props.params.type}</div>
      </>
    )
  }
}


export default Container;