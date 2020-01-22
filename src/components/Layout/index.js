import React, { Component } from 'react';
import core from 'core';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { withStyles } from '@material-ui/core/styles';

import css from './main.module.css';
import Properties from './Properties';
import { Toolbar } from '@material-ui/core';

import { Icon } from "@blueprintjs/core";



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
    // margin: 20,
    // backgroundColor: 'grey'
    // border: '2px dashed #d5dadf', 
    // padding: 10, 
  },
  stub: { 
    display: 'flex',
    position: 'relative',
    backgroundColor: '#71d7f7',
    opacity: 0.9,
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
  toolbard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    height: 84,
    width: 125,
    zIndex: 100,
    boxShadow: '0 2px 6px rgba(0,0,0,.2)',
    cursor: 'move',
    color: '#556068',
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
    this.dragsection = false;
  }

  componentWillUnmount() {
    this.dragsection = null;
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
    if (this.dragsection === false) {
      core.components.layout.sectionOut(item.id);
    }
  }

  handleColumnMouseOver = (e, section, item) => {
    if (this.dragsection === false) {
      core.components.layout.columnOver(section.id, item.id);
    }
  }

  handleToolbarSectionEvent = (e, type, item, data) => {
    e.stopPropagation();
    // console.log(type)
    if (type === 'dragstart') {
    }

    if (type === 'dragmove') {  
      if (this.dragsection === false) {
        this.dragsection = true;
        document.body.style.cursor = 'move';

        const x = e.clientX - this.layout.offsetLeft;
        const y = e.clientY - this.layout.offsetTop;
        let min = 0;
        let max = 0;
        let last = null;
        for (let i of this.props.state.list) {
          
          if (i.id === item.id) {
            min = (min - last.height) + (last.height / 2);
            break;
          }
          last = i;
          min = min + i.height;
        }
        core.components.layout.sectionDragStart(item.id, 'section', x, y, min, max);
      } else {
        
        const x = e.clientX - this.layout.offsetLeft;
        const y = e.clientY - this.layout.offsetTop;
        if (y < this.props.state.toolbar.min) {
          console.log('!!!');
        }
        core.components.layout.sectionDragMove(x, y);
      }
    }

    if (type === 'dragstop') {
      this.dragsection = false;
      document.body.style.cursor = 'auto';
      core.components.layout.sectionDragStop(item.id);
    }

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

  linkLayout = (e) => {
    this.layout = e;
  }

  render({ id, state, match, classes, onClick } = this.props) {
    return (
      <div style={styles.root} onClick={this.handleClickLayout} >
        <Paper ref={this.linkLayout} style={styles.paper} elevation={2} >
         <ToolbarDrag data={this.props.state.toolbar} />
          {this.props.state.list.map(i =>
            <Row 
              key={i.id} 
              item={i} 
              onMouseSectionOut={this.handleSectionMouseOut}
              onMouseColumnOver={this.handleColumnMouseOver}
              onEventToolbarSection={this.handleToolbarSectionEvent}
              onClickToolbarColumn={this.handleToolbarColumnClick}
            />
          )}
        </Paper>
        <Properties />
      </div>
    );
  }

} 

function ToolbarDrag(props) {
  if (props.data.enabled) {
    return (
      <div style={{ ...styles.toolbard, transform: `translate3d(${props.data.x}px,${props.data.y}px,0px)`}}>
        <Icon icon="vertical-distribution" iconSize={24} />
        <div style={{ marginTop: 10 }}>{props.data.element}</div>
      </div>
    );
  }
  return null;
} 

function ToolbarSection(props) {
  return (
    <div style={{ ...styles.toolbars, display: props.item.focus || props.item.active ? 'flex' : 'none' }} >
      <div className={css.tsbutton} style={styles.tsbutton}></div>
      <Draggable 
        position={{ x: 0, y: 0 }} 
        onStart={(e, data) => props.onEvent(e, 'dragstart', props.item, data)}
        onDrag={(e, data) => props.onEvent(e, 'dragmove', props.item, data)}
        onStop={(e, data) => props.onEvent(e, 'dragstop', props.item, data)}
      >
        <div 
          className={css.tsbutton} 
          style={styles.tsbutton} 
          onClick={(e) => props.onEvent(e, 'select', props.item)}
        >...</div>
      </Draggable>
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

function Row(props) {
  if (props.item.type === 'stub') {
    return (
      <div className={css.test} style={{ ...styles.stub, height: props.item.height }} />
    );
  }
  return (
    <div 
      style={{ ...styles.section,
        height: props.item.height,
        display: props.item.hide ? 'none' : 'flex',
        transition: props.item.focus ? 'outline 0.5s ease' : 'none',  
        outline: props.item.focus || props.item.active ? '1px solid #03A9F4' : '1px solid transparent',
      }} 
      onMouseLeave={(e) => props.onMouseSectionOut(e, props.item)}
    >
      <ToolbarSection item={props.item} onEvent={props.onEventToolbarSection} />
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