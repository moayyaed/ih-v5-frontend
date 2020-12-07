import React, { Component } from 'react';
import core from 'core';



class Content extends Component {

  componentDidMount() {
    core.transfer.sub('refresh_content', this.handleUpdate);
    const { route, scheme } = this.props;
    this.props.onRequest(route, scheme);
  }

  componentWillUnmount() {
    core.transfer.unsub('refresh_content', this.handleUpdate);
  }

  handleUpdate = () => {
    const { route, scheme } = this.props;
    this.props.onRequest(route, scheme);
  }

  render({ route, state } = this.props) {
    return null;
  }

}


export default Content;
