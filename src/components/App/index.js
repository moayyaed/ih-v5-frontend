import React, { Component } from 'react';
import core from 'core';

import { createBrowserHistory } from 'history';

import { withStyles } from '@material-ui/core/styles';

const history = createBrowserHistory();

const styles = {
  root: {

  }
};

const classes = theme => ({

});


class App extends Component {
  componentDidMount() {
    core.nav.history = history;

    history.listen(core.router);
  }

  render() {
    if (this.props.state.auth) {
      return React.createElement(core._options.pages.main);
    }
    return React.createElement(core._options.pages.login);
  }
}


export default core.connect(withStyles(classes)(App));