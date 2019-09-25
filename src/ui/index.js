import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import store from './store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
