import React from 'react';

import './App.css';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';


function App() {
  return (
    <>
      <AppBar />
      <div className="container">
        <AppMenu />
      </div>
    </>
  );
}


export default App;