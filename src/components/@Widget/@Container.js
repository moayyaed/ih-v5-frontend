import React, { Component } from 'react';


class Container extends Component {
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