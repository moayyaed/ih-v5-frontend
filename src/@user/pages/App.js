import React from 'react';

import './App.css';

import AppLayout from 'components/AppLayout';
import AppLayoutDialog from 'components/AppLayoutDialog';
import { YMInitializer } from 'react-yandex-metrika';


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
  return (
    <>
      <YMInitializer accounts={[68453362]} options={{webvisor: true, clickmap:true }} version="2"/>
      <AppLayout />
      <AppLayoutDialog />
    </>
  ) 
}


export default App;

