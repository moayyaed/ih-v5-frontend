import React from 'react';

import Box from 'components/basic/Box';

const styles = {
  box: {
    width: '100%',
    height: 35,
    backgroundColor: '#78909c',
    flexShrink: 0,
    // boxShadow: 'rgba(0, 0, 0, 0.157) 0px 3px 10px, rgba(0, 0, 0, 0.227) 0px 3px 10px',
    overflow: 'hidden',
  },
};

function AppBar() {
  return (
    <Box style={styles.box}>

    </Box>
  );
}


export default AppBar;