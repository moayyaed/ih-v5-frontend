import React from 'react';
import ReactDOM from 'react-dom';

import core from 'core';

import { Provider } from 'react-redux';

import options from './options';
import Dependences from './Dependences';


core.settings(options);


ReactDOM.render(
  <Provider store={core.store}>
    <Dependences />
  </Provider>,
  document.getElementById('root')
);