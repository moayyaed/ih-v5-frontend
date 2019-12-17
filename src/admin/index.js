import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import AppProgressBar from 'components/AppProgressBar';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import { FocusStyleManager } from "@blueprintjs/core";

import 'normalize.css/normalize.css';
import "@blueprintjs/core/lib/css/blueprint.css";

import core from 'core';

import theme from './theme';
import dependencies from './dependencies';

import './router';
import './actions';
import './events';

import App from './App';

FocusStyleManager.onlyShowFocusOnTabs();

core.dependencies(dependencies);

ReactDOM.render(
  <Provider store={core.store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProgressBar />
      <DragDropContextProvider backend={HTML5Backend}>
        <App />
      </DragDropContextProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);