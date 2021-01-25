import React from 'react';

import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  paper: {
    width: 448,
    height: 500,
  }
}


function PortalAuth(props) {
  return (
    <div style={styles.root}>
      <Paper style={styles.paper} />
    </div>
  )
}


export default React.memo(PortalAuth);