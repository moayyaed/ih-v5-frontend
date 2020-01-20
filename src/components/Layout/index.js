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
    color: '#fff',
    display: 'flex',
    position: 'absolute',
    width: 75,
    height: 25,
    boxShadow: '0 -2px 8px rgba(0,0,0,.05)',
    backgroundColor: '#03A9F4',
    top: -26,
    left: 'calc(50% - 37.5px)',
  },
  toolbarc: {
    width: 25,
    height: 25,
    position: 'absolute',
    backgroundColor: '#495157',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tsbutton: {
    textAlign: 'center',
    width: 25,
    height: 25,
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

  handleClickLayout = () => {
    const list = this.props.state.list.map(i => {
      return {
        ...i,
        focus: false,
        active: false,
        columns: i.columns.map(x => { 
          return {  ...x, focus: false, active: false };
        })
      }
    });
    core.components.layout.forceData({ list });
  }

  handleSectionMouseOut = (e, item) => {
    core.components.layout.sectionOut(item.id);
  }

  handleColumnMouseOver = (e, section, item) => {
   core.components.layout.columnOver(section.id, item.id);
  }

  handleToolbarSectionClick = (e, type, item) => {
    e.stopPropagation();
    if (type === 'select') {
      const list = this.props.state.list.map(i => {
        if (i.id === item.id) {
          return {
            ...i,
            focus: true,
            active: true,
            columns: i.columns.map(x => {
              return { ...x, focus: false, active: false }
            }) 
          }
        }
        return { 
          ...i, 
          focus: false, 
          active: false,
          columns: i.columns.map(x => {
            return { ...x, focus: false, active: false }
          }) 
        };
      });
      core.components.layout.forceData({ list });
    }
  }

  handleToolbarColumnClick = (e, section, item) => {
    e.stopPropagation();
    core.components.layout.columnActive(section.id, item.id);
  }

  render({ id, state, match, classes, onClick } = this.props) {
    return (
      <div style={styles.root} onClick={this.handleClickLayout} >
        <Paper style={styles.paper} elevation={2} >
          {this.props.state.list.map(i =>
            <Section 
              key={i.id} 
              item={i} 
              onMouseSectionOut={this.handleSectionMouseOut}
              onMouseColumnOver={this.handleColumnMouseOver}
              onClickToolbarSection={this.handleToolbarSectionClick}
              onClickToolbarColumn={this.handleToolbarColumnClick}
            />
          )}
        </Paper>
        <Properties />
      </div>
    );
  }

} 

function ToolbarSection(props) {
  return (
    <div style={{ ...styles.toolbars, display: props.item.focus || props.item.active ? 'flex' : 'none' }} >
      <div className={css.tsbutton} style={styles.tsbutton}></div>
      <div className={css.tsbutton} style={styles.tsbutton} onClick={(e) => props.onClick(e, 'select', props.item)}>...</div>
      <div className={css.tsbutton} style={styles.tsbutton}></div> 
    </div>
  );
}

function ToolbarColumn(props) {
  return (
    <div 
      style={{ ...styles.toolbarc, display: props.item.focus || props.item.active ? 'flex' : 'none' }}
      onClick={(e) => props.onClick(e, props.section, props.item)}
    >
      i
    </div>
  );
}

function Section(props) {
  return (
    <div 
      style={{ ...styles.section,
        transition: props.item.focus ? 'outline 0.5s ease' : 'none',  
        outline: props.item.focus || props.item.active ? '1px solid #03A9F4' : '1px solid transparent',
      }} 
      onMouseLeave={(e) => props.onMouseSectionOut(e, props.item)}
    >
      <ToolbarSection item={props.item} onClick={props.onClickToolbarSection} />
      {props.item.columns.map(i => 
        <Column 
          key={i.id} 
          section={props.item} 
          item={i}
          onClickToolbarColumn={props.onClickToolbarColumn}
          onMouseOver={props.onMouseColumnOver} 
        />
      )}
    </div>
  );
}

function Column(props) {
  return (
    <div
      style={{ ...styles.sectionColumn, border: props.item.focus || props.item.active ? '1px dashed black' : '1px dashed transparent' }}
      onMouseEnter={(e) => props.onMouseOver(e, props.section, props.item)} 
    >
      <ToolbarColumn section={props.section} item={props.item} onClick={props.onClickToolbarColumn} />
      <div style={styles.content}>+</div>
    </div>
  )
}


export default core.connect(withStyles(classes)(Layout));