import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import MultiBackend from 'react-dnd-multi-backend';
import HTML5ToTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch';
import { DndProvider as DndProvider2 } from 'react-mosaic-component/node_modules/react-dnd';

import 'typeface-roboto';
import 'normalize.css/normalize.css';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

import App from 'components/App';

const theme = createMuiTheme();

function Dependences() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <DndProvider2 backend={MultiBackend} options={HTML5ToTouch}>
          <App />
        </DndProvider2>
      </DndProvider>
    </ThemeProvider>
  )
}


export default Dependences;