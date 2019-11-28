import React, { Component } from 'react';

import AppNav from 'components/AppNav';
import AppPage from 'components/AppPage';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  }
};


class AppBody extends Component {

  render({ path, url, params } = this.props.match) {
    return (
      <div style={styles.root}>
        <AppNav key={params.navid} navid={params.navid} />
        <AppPage />
      </div>
    );
  }
}

export default AppBody;