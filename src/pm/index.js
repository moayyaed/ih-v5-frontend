import './main.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import context from 'context';

import dependencies from './dependencies';

import App from './App';

context.create(dependencies);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F5F5F5',
    }
  }
});

ReactDOM.render(
  <Provider store={context.store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
