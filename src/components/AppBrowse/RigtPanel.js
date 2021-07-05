import React, { Component } from 'react';

import Table from 'components/@Form/types/@Table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    position: 'relative',
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
  loading: {
    position: 'absolute',
    display: 'flex',
    width: 'calc(100% - 24px)', 
    height: 'calc(100% - 129px)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    top: 69,
    left: 12,
    zIndex: 100
  },
  loadingProgress: {
    width: 250,
    marginBottom: 4,
  },
  loadingText: {
    marginTop: 4,
  }
}

const EMPTY = {};
const EMPTY2 = () => ({});

function RigtPanel(props) {
  return (
    <div style={styles.root}>
      {props.loading ?
        <div style={styles.loading}>
          <LinearProgress style={styles.loadingProgress}/> 
          <div style={styles.loadingText}>Загрузка данных с плагина...</div>
        </div> 
        : 
        null
      }
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