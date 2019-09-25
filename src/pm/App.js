import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NProgressBar from 'components/core/NProgressBar/NProgressBar';

import Dashboard from './routes/dashboard';
import Structure from './routes/structure';
import Layout from './routes/layouts';
import NotFound from './routes/404';

function App() {
  return (
    <Router>
      <NProgressBar />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/structure" component={Structure} />
        <Route path="/layouts" component={Layout} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}


export default App;