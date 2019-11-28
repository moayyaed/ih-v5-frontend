import React, { Component } from 'react';
import core from 'core';


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

class AppPage extends Component {

  componentDidMount() {
    core.event('app:page', this.props.params.pageid, this.props.params.component);
  }

  render() {
    return (
      <div style={styles.root}>
        {getComponent(this.props.params.component)}
      </div>
    );
  }
}

export default AppPage;