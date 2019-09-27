import React from 'react';

import Box from 'components/core/Box';
import AppToolBar from 'components/AppToolBar';
import Explorer from 'components/Explorer';

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
        <div>Table</div>
      </div>
    </div>
  );
}


export default Structure;