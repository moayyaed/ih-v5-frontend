import React, { Component } from 'react';




class Content extends Component {

  componentDidMount() {
    const { route, scheme } = this.props;
    this.props.onRequest(route, scheme);
  }

  render({ route, state } = this.props) {
    return null;
  }

}


export default Content;
