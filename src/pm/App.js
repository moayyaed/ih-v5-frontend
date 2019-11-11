import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NProgressBar from 'components/basic/NProgressBar/NProgressBar';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';

import Dashboard from './routes/dashboard';
import Page from './routes/page';

import Structure from './routes/structure';
import Layout from './routes/layouts';
import NotFound from './routes/404';
import Test from './routes/test';


function App() {
  return (
    <Router>
      <NProgressBar />
      <AppBar />
      <div className="container">
        <AppMenu id="appmenu"/>
        <div className="content">
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/:id" exact component={Page} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;