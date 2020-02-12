import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import core from 'core';
import App from 'components/App';

import options from './options';


core.settings(options);


ReactDOM.render(
  <Provider store={core.store}>
    <App />
  </Provider>,
  document.getElementById('root')
);