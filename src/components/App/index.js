import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';


class App extends Component {
  render() {
    return React.createElement(core.options.pages.main);
  }
}


const mapStateToProps = createSelector(
  state => state.app,
  (state) => ({ state })
)

export default connect(mapStateToProps)(App);
