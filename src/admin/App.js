import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';
import AppBody from 'components/AppBody';


function App() {
  return (
    <Router>
      <AppBar />
      <div className="container">
        <Route path="/:menuid?" component={AppMenu} />
        <Route path="/:navid" component={AppBody} />
      </div>
    </Router>
  );
}


export default App;