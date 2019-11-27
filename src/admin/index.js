import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppProgressBar from 'components/AppProgressBar';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import core from 'core';

import theme from './theme';
import dependencies from './dependencies';

import App from './App';


ReactDOM.render(
  <Provider store={core.store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProgressBar />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);