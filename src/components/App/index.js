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


function getPage(state, layoutId, hasError) {
  if (state.auth === false) {
    return React.createElement(core.options.pages.login, { route: state.route, network: state.network, layoutId, hasError })
  }
  return React.createElement(core.options.pages.main, { route: state.route, network: state.network, layoutId, hasError })
}

function isElectron() {
  if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
      return true;
  }
  if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
      return true;
  }
  if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
      return true;
  }
  return false;
}

const styles = {
  backdrop: {
    zIndex: 1399,
    color: '#fff',
  },
}


class App extends Component {
  state = { hasError: true }

  componentDidMount() {
    core.history = history;
    history.listen(this.handleChageRoute);

    document.addEventListener('keydown', this.handleKeyDown);
    this.handleChageRoute(history.location);
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: { 
        title: error.message,
        stack: error.stack,
        info: '',
      } 
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ 
      hasError: { 
        title: error.message,
        stack: error.stack,
        info: errorInfo.componentStack,
      } 
    });
  }

  handleChageRoute = (location, action) => {
    if (core.lastPath !== location.pathname) {
      // const store = core.store.getState();
      // const prevParams = core.options.routeParse(core.lastPath || location.pathname);
      const params = core.options.routeParse(location.pathname);

      params.user = action === 'PUSH';
      core.lastPath = location.pathname;

      core.actions.app.route(params);

      if (this.state.hasError) {
        this.setState({ hasError: false })
      }
    }
  }
  handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      core.cache.variant2 = !core.cache.variant2
    }
    /*
    if (e.keyCode == '27') {
      if (isElectron()) {
        const electron = window.require('electron');
        const ipcRenderer  = electron.ipcRenderer;
    
        ipcRenderer.send('exit')
      } else {
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
    */
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
        {getPage(this.props.state, this.props.layoutId, this.state.hasError)}
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
