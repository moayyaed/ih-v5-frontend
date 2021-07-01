import React, { Component } from 'react';

import Table from 'components/@Form/types/@Table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', 
    height: '100%', 
    backgroundColor: '#f5f5f5',
    padding: 12,
    alignItems: 'flex-end'
  },
  container: {
    width: '100%', 
    height: '100%', 
    padding: 8,
  },
  button: {
    marginTop: 12,
    flexShrink: 0,
  },
}

const EMPTY = {};
const EMPTY2 = () => ({});

function RigtPanel(props) {
  return (
    <div style={styles.root}>
      <Paper style={styles.container} >
         {props.options.columns.length ? 
          <Table
            options={props.options}
            data={props.data}
            cache={EMPTY}
            global={EMPTY}
            route={EMPTY}
            onChange={props.onChangeChannel}
            getStyle={EMPTY2} 
          />
          : 
          null}
      </Paper>
      <Button style={styles.button} onClick={props.onSubmit} variant="contained" color="primary" >
        Добавить каналы
      </Button>
    </div>
  )
}


export default RigtPanel;