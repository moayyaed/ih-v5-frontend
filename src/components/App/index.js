import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import CircularProgress from '@material-ui/core/CircularProgress';
import NProgressBar from 'components/NProgressBar/NProgressBar';
import Backdrop from '@material-ui/core/Backdrop';

import Alert from 'components/Alert';

import { createBrowserHistory } from 'history';


const history = createBrowserHistory();


function getPage(state, layoutId) {
  if (state.auth === false) {
    return React.createElement(core.options.pages.login, { route: state.route, network: state.network, layoutId })
  }
  return React.createElement(core.options.pages.main, { route: state.route, network: state.network, layoutId })
}


const styles = {
  backdrop: {
    zIndex: 1399,
    color: '#fff',
  },
}


class App extends Component {
  componentDidMount() {
    core.history = history;
    history.listen(this.handleChageRoute);

    document.addEventListener('keydown', this.handleKeyDown);
    this.handleChageRoute(history.location);
  }

  handleChageRoute = (location, action) => {
    if (core.lastPath !== location.pathname) {
      // const store = core.store.getState();
      // const prevParams = core.options.routeParse(core.lastPath || location.pathname);
      const params = core.options.routeParse(location.pathname);

      params.user = action === 'PUSH';
      core.lastPath = location.pathname;

      core.actions.app.route(params);
    }
  }
  handleKeyDown = (e) => {
    if (e.keyCode == '27') {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('rememberme');
      window.sessionStorage.removeItem('key');
      window.sessionStorage.removeItem('target');

      if (window.__ihp2p) {
        clearTimeout(window.__ihp2p.timer);
        window.__ihp2p.close = null;
        window.location.href = "/";
      } else {
        core.network.realtime.destroy();
        core.actions.app.auth(false);

        if (core.options.type === 'user') {
          window.location.href = "/";
        } else {
          window.location.href = "/admin";
        }
      }
    }
  }

  handleCloseAlert = () => {
    core.actions.app.alertClose();
  }

  handleCloseBackdrop = () => {

  }

  render({ alert, route, restart, network } = this.props.state) {
    return (
      <>
        <NProgressBar />
        <Backdrop style={styles.backdrop} open={restart} onClick={this.handleCloseBackdrop}>
          {restart ? <CircularProgress color="inherit" /> : null}
        </Backdrop>
        <Alert 
          open={alert.open} 
          severity={alert.severity} 
          message={alert.message} 
          onClose={this.handleCloseAlert}
        />
        {getPage(this.props.state, this.props.layoutId)}
      </>
    )
  }
}


const mapStateToProps = createSelector(
  state => state.app,
  state => state.layout ? state.layout.layoutId : null,
  (state, layoutId) => ({ state, layoutId })
)

export default connect(mapStateToProps)(App);
