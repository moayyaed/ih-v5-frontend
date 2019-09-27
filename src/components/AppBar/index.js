import React from 'react';

import Box from 'components/core/Box';

const styles = {
  box: {
    display: 'flex',
  },
  logo: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: 5,
  },
  stub: {
    width: 70,
    height: 35,
    backgroundColor: '#607d8b',
    flexShrink: 0,
    zIndex: 101,
  },
  container: {
    width: '100%',
    height: 35,
    backgroundColor: '#607d8b',
    boxShadow: 'rgba(0, 0, 0, 0.157) 0px 3px 10px, rgba(0, 0, 0, 0.227) 0px 3px 10px',
    overflow: 'hidden',
    zIndex: 100,
  },
};

function AppBar() {
  return (
    <Box style={styles.box}>
      <div style={styles.logo}>
        LOGO
      </div>
      <div style={styles.stub}/>
      <div style={styles.container}/>
    </Box>
  );
}


export default AppBar;