import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import NProgressBar from 'components/NProgressBar/NProgressBar';

import Alert from 'components/Alert';

import { createBrowserHistory } from 'history';


const history = createBrowserHistory();


function getPage(state) {
  if (state.auth === false) {
    return React.createElement(core.options.pages.login, { route: state.route })
  }
  return React.createElement(core.options.pages.main, { route: state.route })
}

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

  handleCloseAlert = () => {
    core.actions.app.alertClose();
  }

  render({ alert, route } = this.props.state) {
    return (
      <>
        <NProgressBar />
        <Alert 
          open={alert.open} 
          severity={alert.severity} 
          message={alert.message} 
          onClose={this.handleCloseAlert}
        />
        {getPage(this.props.state)}
      </>
    )
  }
}


const mapStateToProps = createSelector(
  state => state.app,
  (state) => ({ state })
)

export default connect(mapStateToProps)(App);
