import React from 'react';

import './App.css';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';

import AppNav from 'components/AppNav';
import AppTabs from 'components/AppTabs';
import AppPage from 'components/AppPage';
import AppDialog from 'components/AppDialog';


const styles = {
  box: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  body: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
};


function App(props) {
  return (
    <>
      <AppDialog />
      <AppBar />
      <div className="container">
        <AppMenu />
        <div style={styles.box}>
          <AppNav key={props.route.menuid} stateid="appnav" />
          <div style={styles.body}>
            <AppTabs />
            <AppPage />
          </div>
        </div>
      </div>
    </>
  );
}


export default App;

