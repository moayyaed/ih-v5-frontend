import React from 'react';

import './App.css';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';
import AppRouter from 'components/AppRouter';
import AppBody from 'components/AppBody';


function App() {
  return (
    <>
      <AppBar />
      <AppRouter />
      <div className="container">
        <AppMenu />
        <AppBody />
      </div>
    </>
  );
}


export default App;