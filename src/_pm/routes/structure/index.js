import React from 'react';

import Box from 'components/basic/Box';
import AppToolBar from 'components/AppToolBar';
import Explorer from 'components/Explorer';
import Table from 'components/Table';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  }
};

function Structure() {
  return (
    <div style={styles.root}>
      <AppToolBar />
      <div style={styles.container}>
        <Explorer />
        <Table />
      </div>
    </div>
  );
}


export default Structure;