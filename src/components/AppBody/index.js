import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import AppNav from 'components/AppNav';
import AppTabs from 'components/AppTabs';
import AppPage from 'components/AppPage';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
};


class AppBody extends Component {

  render({ path, url, params } = this.props.match) {
    return (
      <div style={styles.box}>
        <AppNav key={params.navid} navid={params.navid} />
        <div style={styles.body}>
          <AppTabs />
          {params.pageid ? <AppPage 
            key={params.pageid} 
            params={params} 
          /> : null}
        </div>
      </div>
    );
  }
}

export default AppBody;