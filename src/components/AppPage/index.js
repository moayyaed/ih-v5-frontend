import React, { Component } from 'react';
import core from 'core';

import Table from 'components/Table';
import Options from 'components/Options';
import Graph from 'components/Graph';
import Test from 'components/Test';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  }
};


function getComponent(type, id) {
  switch (type) {
    case 'table':
      return <Table />;
    case 'options':
      return <Options />;
    case 'graph':
      return <Graph key={id} />;
    case 'test':
      return <Test />;
    default:
      return null;
  }
}

function handleContextMenuPageBody(e, params) {
  e.preventDefault();
  e.stopPropagation();
  core.event('contextmenu', 'page', e, params);
}


function AppPage(props) {
  if (props.state.open) {
    return (
      <div style={styles.root} onContextMenu={(e) => handleContextMenuPageBody(e, props.state)}>
        {getComponent(props.state.component, props.state.id)}
      </div>
    );
  }
  return null
}


export default AppPage;