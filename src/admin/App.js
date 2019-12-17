import React from 'react';

import './App.css';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';
import AppRouter from 'components/AppRouter';
import AppBody from 'components/AppBody';
import AppContextMenu from 'components/AppContextMenu';


function App() {
  return (
    <>
      <AppBar />
      <AppRouter />
      <div className="container">
        <AppMenu />
        <AppBody />
        <AppContextMenu />
      </div>
    </>
  );
}


export default App;