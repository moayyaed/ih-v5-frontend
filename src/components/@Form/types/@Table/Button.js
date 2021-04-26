import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 22,
  },
}


function TableButtonComponent(props) {
  return (
    <div style={styles.root} className={props.className}>
      <Button style={styles.button} variant="contained" color="primary">
        {props.cellData.title || ''}
      </Button>
    </div>
  )
}


export default TableButtonComponent; 