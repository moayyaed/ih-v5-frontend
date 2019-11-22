import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';

import AppToolBar from 'components/AppToolBar';
import AppPage from 'components/AppPage';

import Explorer from 'components/Explorer';


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  }
};


class AppNav extends Component {

  componentDidMount() {
  }

  render({ path, url, params } = this.props.match) {
    return (
      <div style={styles.root}>
        <AppToolBar />
        <div style={styles.container}>
          <Explorer 
            id="explorer"
            key={params.navid} 
            navid={params.navid}
            history={this.props.history}
            path={url}
          />
          <Switch>
            <Route path={`${path}/:pagesh/:pageid/:select?/:property?`} component={AppPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default AppNav;