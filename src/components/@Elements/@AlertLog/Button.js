import React from 'react';
import core from 'core';

import Button from '@material-ui/core/Button';

import shortid from 'shortid';

const styles = {
  root: {
    top: -1,
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


function handleClick(row) {
  core.tunnel.command({
    uuid: shortid.generate(),
    method: 'row_command',
    type:'command',
    command: row._command,
    id: row.id,
  });
}

function TableButtonComponent(props) {
  if (props.cellData.hide) {
    return <div style={styles.root} className={props.className} />
  }
  return (
    <div style={styles.root} className={props.className}>
      <Button disabled={props.cellData.disabled} style={styles.button} variant="contained" color="primary" onClick={() => handleClick(props.rowData)}>
        {props.cellData.title || 'Подтвердить'}
      </Button>
    </div>
  )
}


export default TableButtonComponent; 