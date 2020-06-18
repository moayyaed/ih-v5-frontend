import React from 'react';

import './App.css';

import AppLayout from 'components/AppLayout';


const styles = {
  box: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  body: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
};


function App(props) {
  return <AppLayout key={props.route.layout} />;
}


export default App;

