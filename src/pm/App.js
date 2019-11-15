import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NProgressBar from 'components/basic/NProgressBar/NProgressBar';

import AppBar from 'components/AppBar';
import AppMenu from 'components/AppMenu';
import AppNav from 'components/AppNav';

import Dashboard from './routes/dashboard';
import NotFound from './routes/404';


function App() {
  return (
    <Router>
      <NProgressBar />
      <AppBar />
      <div className="container">
        <Route path={['/:navid', '/']} component={AppMenu} />
        <div className="content">
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/:navid" component={AppNav} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}


export default App;