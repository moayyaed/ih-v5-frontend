import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

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

const classes = theme => ({

});


function AppBody(props) {
  return (
    <div style={styles.box}>
      <AppNav state={props.state.nav} />
      <div style={styles.body}>
        <AppTabs enabled={props.state.nav.open}/>
        <AppPage state={props.state.page}/>
      </div>
    </div>
  );
}

AppBody.defaultProps = {
  id: 'appbody'
};

export default core.connect(withStyles(classes)(AppBody));