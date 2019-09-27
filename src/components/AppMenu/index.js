import React from 'react';

import Box from 'components/core/Box';

const styles = {
    box: {
      width: 70,
      height: '100%',
      backgroundColor: '#607d8b',
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px',
      overflow: 'hidden',
      flexShrink: 0,
      zIndex: 100,
    },
  };

function AppMenu() {
  return (
    <Box style={styles.box}>
    </Box>
  );
}


export default AppMenu;