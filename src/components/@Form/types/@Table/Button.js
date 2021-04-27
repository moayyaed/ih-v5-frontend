import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    top: -2,
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 27,
    textTransform: 'unset',
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