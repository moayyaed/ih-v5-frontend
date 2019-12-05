import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';
import AppRouter from 'components/AppRouter';
import AppBody from 'components/AppBody';


function App() {
  return (
    <Router>
      <AppBar />
      <Route path="*" component={AppRouter} />
      <div className="container">
        <AppMenu />
        <Route path="/:navid/:component?/:pageid?" component={AppBody} />
      </div>
    </Router>
  );
}


export default App;