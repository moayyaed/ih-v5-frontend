import React, { Component } from 'react';
import core from 'core';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { withStyles } from '@material-ui/core/styles';

import css from './main.module.css';
import Properties from './Properties';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  paper: {
    width: '100%',
    margin: 20,
  },
  section: { 
    position: 'relative',
    height: 50, 
    margin: 20,
    border: '2px dashed #d5dadf', 
    padding: 10, 
  },
  sectionBody: {
    width: '100%',
    height: '100%',
    border: '1px dashed #d5dadf',
  },
  toolbars: {
    position: 'absolute',
    width: 70,
    height: 25,
    boxShadow: '0 -2px 8px rgba(0,0,0,.05)',
    backgroundColor: '#03A9F4',
    top: -27,
    left: 'calc(50% - 35px)',
  }
};

const classes = theme => ({
  root: {
  },
});


class Layout extends Component {

  componentDidMount() {

  }

  componentWillUnmount() {
 
  }

  hanleSectionMouseOver = (e, item) => {
    const list = this.props.state.list.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          focus: true,
        }
      }
      return i;
    });
    core.components.layout.forceData({ list });
  }

  hanleSectionMouseOut = (e, item) => {
    const list = this.props.state.list.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          focus: false,
        }
      }
      return i;
    });
    core.components.layout.forceData({ list });
  }

  handleSectionClick = (e, item) => {
    e.stopPropagation();
    const list = this.props.state.list.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          focus: true,
          active: true,
        }
      }
      return i;
    });
    core.components.layout.forceData({ list });
  }

  handleClickLayout = () => {
    const list = this.props.state.list.map(i => {
      return {
        ...i,
        focus: false,
        active: false,
      }
    });
    core.components.layout.forceData({ list });
  }

  linkToolbars = (e) => {
    this.toolbars = e;
  }

  render({ id, state, match, classes, onClick } = this.props) {
    console.log(state)
    return (
      <div style={styles.root} onClick={this.handleClickLayout} >
        <Paper style={styles.paper} elevation={2} >
          {this.props.state.list.map(i =>
            <Section 
              key={i.id} 
              item={i} 
              onMouseOver={this.hanleSectionMouseOver} 
              onMouseOut={this.hanleSectionMouseOut}
              onClick={this.handleSectionClick}
            />
          )}
        </Paper>
        <Properties />
      </div>
    );
  }

} // '1px dashed #616161'

function Section(props) {
  return (
    <div 
      style={{ ...styles.section,
        transition: props.item.focus ? 'border 0.5s ease' : 'none',  
        border: props.item.focus || props.item.active ? '1px solid #03A9F4' : '1px solid transparent',
        outline: props.item.focus ? '1px dashed #616161' : props.item.active ? '1px solid #03A9F4' : 'none'
      }} 
      onMouseOver={(e) => props.onMouseOver(e, props.item)} 
      onMouseOut={(e) => props.onMouseOut(e, props.item)}
      onClick={(e) => props.onClick(e, props.item)}
    >
      <div style={{ ...styles.toolbars, display: props.item.focus || props.item.active ? 'block' : 'none' }} />
      <div style={styles.sectionBody} />
    </div>
  );
}


export default core.connect(withStyles(classes)(Layout));