import React, { Component } from 'react';
import core from 'core';

import Form from 'components/@Form';


class Content extends Component {

  componentDidMount() {
    const { route, scheme } = this.props;
    this.props.onRequest(route, scheme);
  }

  render({ debug, state } = this.props) {
    return (
      <Form 
        key={state.id} 
        debug={debug} 
        scheme={state.options} 
        data={state.data}
        error={state.error}
        onChange={this.props.onChange} 
      />
    )
  }

}


export default Content;
