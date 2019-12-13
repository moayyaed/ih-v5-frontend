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
// {getComponent(this.props.params.component)}
class AppPage extends Component {

  componentDidMount() {
  }

  componentWillUnmount() {
    // console.log(this.props.params)
  }

  render() {
    return (
      <div style={styles.root}>
        
      </div>
    );
  }
}

export default AppPage;