import React from 'react';

import Box from 'components/core/Box';
import Grid from 'components/core/Grid';

import { makeStyles, withStyles } from '@material-ui/core/styles';

const styles = {
  box: {
    width: '100%',
    height: '100%',
  },
};

const useStyles = makeStyles({

});


function Table() {
  return (
    <Box style={styles.box}>
      <Grid />
    </Box>
  );
}


export default Table;