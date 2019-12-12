import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import Draggable from 'react-draggable';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import css from './main.module.css';


const styles = {
  root: {
    height: 35,
  },
  rootA: {
    height: 60,
    borderBottom: '2px solid #eceff1',
  },
  box: {
    display: 'flex',
    width: '100%',
    height: 35,
    backgroundColor: '#90a4ae',
    flexShrink: 0,
    overflow: 'hidden',
  },
  tab: {
    // width: 145,
    // background: '#78909c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #607D8B',
    flexShrink: 0,
    paddingLeft: 34,
    paddingRight: 34,
    cursor: 'pointer',
    marginTop: 7,
    marginBottom: 7,
  },
  tabA: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    paddingLeft: 34,
    paddingRight: 34,
    cursor: 'pointer',
    backgroundColor: '#fafafa',
  },
  icon: {
    position: 'absolute',
    right: 5,
    display: 'none',
  },
  iconA: {
    position: 'absolute',
    right: 5,
    display: 'inline-flex',
  }
};

const classes = theme => ({

});


function Tab(props) {
  return (
  <Draggable
    axis='x'
    handle="strong"
    position={{ x: 0, y: 0 }}
  >
    <div 
      className={css.tab} 
      style={props.select === props.item.id ? styles.tabA : styles.tab} 
      onClick={(e) => props.onClick(e,'select', props.item)}
    >
      {props.item.label}
      <IconButton
        size="small"
        className={css.button} 
        style={props.select === props.item.id ? styles.iconA : styles.icon} 
        onClick={(e) => props.onClick(e, 'close', props.item)} 
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </div>
  </Draggable>
  )
}

class AppTabs extends Component {

  handleClick = (e, type, item) => {
    e.preventDefault();
    e.stopPropagation();

    const { menuid, navcomponent } = core.nav.state;
    
    if (type === 'select') {
      core.nav.history.push(`/${menuid}/${navcomponent}/${item.id}`);
    }
    if (type === 'close') {
      core.components.apptabs.removeItem(item);

      const store = core.store.getState()
      const index = store.apptabs.list.length;

      if (index !== 0) {
        const item = store.apptabs.list[index - 1];
        core.nav.history.push(`/${menuid}/${navcomponent}/${item.id}`);
      } else {
        core.nav.history.push(`/${menuid}`);
      }
    }
  }

  render({ id, state, classes } = this.props) {
    return (
      <div style={this.props.data.length === 0 ? styles.root : styles.rootA }>
        <div style={styles.box}>
          {state.list.map(i => 
            <Tab 
              key={i.id} 
              select={state.selectid}
              item={i} 
              onClick={this.handleClick}
            />)}
        </div>
      </div>
    );
  }
}


export default core.connect(withStyles(classes)(AppTabs));