import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';


function App() {
  return (
    <Router>
      <AppBar />
      <div className="container">
        <Route path="/:menuid?" component={AppMenu} />
        <div className="content">
          content
        </div>
      </div>
    </Router>
  );
}


export default App;