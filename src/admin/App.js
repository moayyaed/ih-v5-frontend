import React from 'react';

import './App.css';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';
import AppBody from 'components/AppBody';


function App() {
  return (
    <>
      <AppBar />
      <div className="container">
        <AppMenu />
        <AppBody />
      </div>
    </>
  );
}


export default App;