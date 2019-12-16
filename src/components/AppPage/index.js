import React, { Component } from 'react';


import Table from 'components/Table';
import Options from 'components/Options';
import Graph from 'components/Graph';


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
};


function getComponent(type) {
  switch (type) {
    case 'table':
      return <Table />;
    case 'options':
      return <Options />;
    case 'graph':
      return <Graph />;
    default:
      return null;
  }
}


function AppPage(props) {
  if (props.state.open) {
    return getComponent(props.state.component);
  }
  return null
}


export default AppPage;