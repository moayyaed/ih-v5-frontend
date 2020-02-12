import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { createBrowserHistory } from 'history';


const history = createBrowserHistory();


class App extends Component {
  componentDidMount() {
    core.history = history;
    history.listen(this.handleChageRoute);

    this.handleChageRoute(history.location);
  }

  handleChageRoute = (location) => {
    const params = core.options.routeParse(location.pathname)
    core.actions.app.route(params);
  }

  render({ route } = this.props.state) {
    return React.createElement(core.options.pages.main, { route });
  }
}


const mapStateToProps = createSelector(
  state => state.app,
  (state) => ({ state })
)

export default connect(mapStateToProps)(App);
