import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import store from './store';

import App from './App';

const theme = createMuiTheme();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
