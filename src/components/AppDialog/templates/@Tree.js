import React from 'react';

import { Scrollbars } from 'react-custom-scrollbars';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import AppNav from 'components/AppNav';
import core from 'core';

import component from '../components/index';

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 49,
    borderBottom: '1px solid #e8e8e8',
    backgroundColor: '#fafafa',
    paddingLeft: 20,
  },
  body: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100% - 49px)',
    padding: 20,
  },
  body2: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100% - 49px)',
    padding: 0,
  },
  paper: {
    height: '100%',
  }
}

function handleClickNode(item, component, nodeid, context) {
  core.actions.appdialog.component({ title: item.node.title, type: component, id: nodeid });
}

function TemplateTree({ state }) {
  return (
    <>
      <AppNav 
        disabledRoute
        key="appnav" 
        stateid="msgboxtree"
        positionPanel="right2"
        requestId={state.template.id}
        onClickNode={handleClickNode}
        defaultSelectNodeId={state.template.selectnodeid}
        defaultSelectChildren
      />
        <div style={styles.container} >
          <div style={styles.toolbar}>
            <Typography variant="subtitle1" >
              {state.component.title}
            </Typography>
          </div>
          <div style={state.template.noscroll ? styles.body2 : styles.body}>
            {state.template.noscroll ?
              component(`${state.component.type}_${state.component.id}`, state) :
              <Paper style={styles.paper}>
                <Scrollbars  >
                  {component(`${state.component.type}_${state.component.id}`, state)}
                </Scrollbars>
              </Paper>
            }
          </div>
        </div>
    </>
  )
}


export default TemplateTree;