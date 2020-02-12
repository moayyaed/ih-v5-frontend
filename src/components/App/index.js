import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { createBrowserHistory } from 'history';


const history = createBrowserHistory();


class App extends Component {
  componentDidMount() {
    core.history = history;
    history.listen(core.options.routeParse);
  }

  render() {
    return React.createElement(core.options.pages.main);
  }
}


const mapStateToProps = createSelector(
  state => state.app,
  (state) => ({ state })
)

export default connect(mapStateToProps)(App);
