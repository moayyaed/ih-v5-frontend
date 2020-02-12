import React from 'react';

import './App.css';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';

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


function App() {
  return (
    <>
      <AppBar />
      <div className="container">
        <AppMenu />
        <div style={styles.box}>
          <AppNav />
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

