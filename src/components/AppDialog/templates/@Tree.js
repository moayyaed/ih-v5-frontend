import React from 'react';

import AppNav from 'components/AppNav';
import core from 'core';

import component from '../components/index';

const styles = {
  body: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
}

function handleClickNode(component, nodeid) {
  core.actions.appdialog.component({ type: component, id: nodeid });
}

function TemplateTree(props) {
  return (
    <>
      <AppNav 
        disabledRoute
        key="appnav" 
        stateid="msgboxtree"
        positionPanel="right2"
        requestId={props.state.template.id}
        onClickNode={handleClickNode}
      />
       <div style={styles.body}>
        {component(props.state)}
      </div>
    </>
  )
}


export default TemplateTree;