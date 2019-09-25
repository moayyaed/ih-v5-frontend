import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import NProgressBar from 'components/core/NProgressBar/NProgressBar';


function App() {
  return (
    <Router>
      <NProgressBar />
      <p>INTRAHOUSE PM</p>
    </Router>
  );
}


export default App;