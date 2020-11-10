import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import 'typeface-roboto';
import 'normalize.css/normalize.css';

import App from 'components/App';

const theme = createMuiTheme();


function Dependences() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}


export default Dependences;