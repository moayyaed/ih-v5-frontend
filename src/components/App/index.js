import React, { Component } from 'react';
import core from 'core';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import NProgressBar from 'components/#basic/NProgressBar/NProgressBar';

import { createBrowserHistory } from 'history';

import { withStyles } from '@material-ui/core/styles';

const history = createBrowserHistory();

const styles = {
  root: {

  }
};

const classes = theme => ({

});


function root(state) {
  if (state.auth) {
    return React.createElement(core._options.pages.main);
  }
  return React.createElement(core._options.pages.login);
}

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

class App extends Component {
  static defaultProps = {
    id: 'app'
  };

  componentDidMount() {
    core.nav.history = history;

    history.listen(core.router);
  }

  handleClose = () => {
    core.app.alert.error(null);
    // core.components.app.setAlertClose();
  }

  render() {
    return (
      <>
        <NProgressBar />
        <Snackbar open={this.props.state.alert.open} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity={this.props.state.alert.severity}>
            {this.props.state.alert.message}
          </Alert>
        </Snackbar>
        {root(this.props.state)}
      </>
    )
  }
}


export default core.connect(withStyles(classes)(App));