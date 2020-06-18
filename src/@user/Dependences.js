import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import 'typeface-roboto';
import 'normalize.css/normalize.css';

import App from 'components/App';

const theme = createMuiTheme();


function Dependences() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}


export default Dependences;