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
    display: 'flex',
    position: 'relative',
    height: 50, 
    margin: 20,
    // backgroundColor: 'grey'
    // border: '2px dashed #d5dadf', 
    // padding: 10, 
  },
  sectionColumn: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    margin: 5,
    border: '1px dashed #d5dadf',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
    fontSize: 20,
  },
  toolbars: {
    position: 'absolute',
    width: 70,
    height: 25,
    boxShadow: '0 -2px 8px rgba(0,0,0,.05)',
    backgroundColor: '#03A9F4',
    top: -26,
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

  hanleSectionMouseOut = (e, item) => {
    core.components.layout.sectionOut(item.id);
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

  hanleColumnMouseOver = (e, section, item) => {
   core.components.layout.columnOver(section.id, item.id);
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
    return (
      <div style={styles.root} onClick={this.handleClickLayout} >
        <Paper style={styles.paper} elevation={2} >
          {this.props.state.list.map(i =>
            <Section 
              key={i.id} 
              item={i} 
              onMouseSectionOut={this.hanleSectionMouseOut}
              onMouseColumnOver={this.hanleColumnMouseOver} 
              onClick={this.handleSectionClick}
            />
          )}
        </Paper>
        <Properties />
      </div>
    );
  }

} 

function Section(props) {
  return (
    <div 
      style={{ ...styles.section,
        transition: props.item.focus ? 'outline 0.5s ease' : 'none',  
        outline: props.item.focus || props.item.active ? '1px solid #03A9F4' : '1px solid transparent',
      }} 
      onMouseLeave={(e) => props.onMouseSectionOut(e, props.item)}
      onClick={(e) => props.onClick(e, props.item)}
    >
      <div style={{ ...styles.toolbars, display: props.item.focus || props.item.active ? 'block' : 'none' }} />
      {props.item.columns.map(i => 
        <Column 
          key={i.id} 
          section={props.item} 
          item={i}
          onMouseOver={props.onMouseColumnOver} 
        />
      )}
    </div>
  );
}

function Column(props) {
  return (
    <div
      style={{ ...styles.sectionColumn, border: props.item.focus ? '1px dashed black' : '1px dashed transparent' }}
      onMouseEnter={(e) => props.onMouseOver(e, props.section, props.item)} 
    >
        <div style={styles.content}>+</div>
    </div>
  )
}


export default core.connect(withStyles(classes)(Layout));