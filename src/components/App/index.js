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

    this.handleChageRoute(history.location);
  }

  handleRequestSave = (route, scheme, forcePayload) => {
    /*
    const tab = scheme.tabs.find(i => i.id === route.tab);
      
    if (tab && (forcePayload || this.saveData[route.tab] !== undefined)) {
      const params = { formid: tab.component[0].id, ...route };
      const payload = forcePayload || this.saveData[route.tab];

      core
      .request({ method: 'components_tabs_form_save', params, payload })
      .ok(res => {})
    }
    */
  }

  handleSave = (store) => {
    /*
    const route = store.app.route;
    const scheme = core.options.componentsScheme[route.componentid];
    const state = store.apppage;

    if (typeof state.save === 'string') {
      core.transfer.send(
        state.save, 
        'save', 
        payload => this.handleRequestSave(route, scheme, payload), 
        () => {},
      );
    } else {
      this.handleRequestSave(route, scheme);
    } 
    */
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
