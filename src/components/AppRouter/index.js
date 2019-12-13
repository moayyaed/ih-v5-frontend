import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import core from 'core';

class RouterCore extends Component {

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

function AppRouter() {
  return (
    <Router>
      <Route path="*" component={RouterCore} />
    </Router>
  )
}

export default AppRouter;