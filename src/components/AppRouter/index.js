import React, { Component } from 'react';
import core from 'core';

class AppRouter extends Component {

  componentDidMount() {
    core.nav.history = this.props.history;

    this.props.history.listen(core.router)
    core.router(this.props.location);
  }

  componentWillUnmount() {

  }

  render() {
    return null;
  }
}

export default AppRouter;