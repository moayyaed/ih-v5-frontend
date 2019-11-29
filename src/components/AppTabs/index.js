import React, { Component } from 'react';
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
}

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

const data = [
]

class Tabs extends Component {
  state = { data: data, select: null }

  componentDidMount() {
  }

  componentWillUnmount() {
  
  }

  handleClick = (e, type, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'select') {
      this.props.onClick(item);
    }
    if (type === 'close') {
      this.props.onClose(item);
    }
  }

  render({ onClick } = this.props) {
    return (
      <div style={this.props.data.length === 0 ? styles.root : styles.rootA }>
        <div style={styles.box}>
          {this.props.data.map(i => 
          <Tab 
            key={i.id} 
            select={this.props.select}
            item={i} 
            onClick={this.handleClick}
          />)}
        </div>
      </div>
    );
  }
}


export default Tabs;