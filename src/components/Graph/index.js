import React, { Component } from 'react';
import core from 'core';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { withStyles } from '@material-ui/core/styles';

import css from './main.module.css';


const styles = {
  box: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  paper: {
    width: 550,
    height: 550,
    position: 'absolute',
    borderRadius: 0,
  },
  sizecontrol: {
    opacity: 0,
    position: 'absolute',
    width: 10,
    height: 10,
    border: '1px solid #1b7ac5',
    backgroundColor: '#2196F3',
  }
};

const classes = theme => ({
  root: {
  },
});

function getPositionContainer(type, settings, data) {
  switch (type) {
    case 'TL':
      return { 
        y: settings.y + data.y,
        x: settings.x + data.x,
        w: settings.w - data.x,
        h: settings.h - data.y,
      };
    case 'TR':
      return { 
        y: settings.y + data.y,
        w: data.x + styles.sizecontrol.width, 
        h: settings.h - data.y,
      };
    case 'BL':
      return { 
        x: settings.x + data.x,
        w: settings.w - data.x,
        h: data.y + styles.sizecontrol.height,
      };
    case 'BR':
        return { 
          w: data.x + styles.sizecontrol.width, 
          h: data.y + styles.sizecontrol.height,
        };
    default:
      return settings;
  }
}

function getPositionSizeControl(type, x, y, w, h) {
  switch (type) {
    case 'TL':
      return { x: 0, y: 0 };
    case 'TR':
        return { x: w - styles.sizecontrol.height, y: 0 };
    case 'BL':
        return { x: 0, y: h - styles.sizecontrol.height };
    case 'BR':
        return { x: w - styles.sizecontrol.height, y: h - styles.sizecontrol.height };
    default:
      return { x: 0, y: 0 };
  }
}

function SizeControl(props) {
  const { x, y, w, h } = props.settings;
  const position = getPositionSizeControl(props.op, x, y, w, h);
  return (
    <Draggable 
      position={position} 
      onStart={(e) => props.onPosition(e, 'start', props.op)} 
      onDrag={(e, data) => props.onPosition(e, 'drag', props.op, props.settings, data)} 
      onStop={(e, data) => props.onPosition(e, 'stop', props.op, props.settings, data)} 
    >
      <div className={css.sizecontrol} style={{ ...styles.sizecontrol }} />
    </Draggable>
  );
}

function Container(props) {
  const settings = props.data.settings;
  return (
    <Draggable 
      position={{ x: settings.x, y: settings.y }} 
      bounds=".parent"
      onStart={(e, data) => props.onPositionStartContainer(e, props.data, data)}
      onStop={(e, data) => props.onPositionStopContainer(e, props.data, data)}
    >
      <div
        className="container"  
        style={{ 
          width: settings.w,
          height: settings.h,
          position: 'absolute',
          outline: props.selects.data[settings.id] ? '2px dashed #ff00ff' : '0px dashed #ff00ff',
        }}
        onClick={(e) => props.onClickContainer(e, props.data)}
        onContextMenu={(e) => props.onContextMenuContainer(e, props.data)}
      >
        <div 
          style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            border: '2px solid ' + settings.color
          }} 
        />
        <SizeControl op="TL" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl op="TR" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl op="BL" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl op="BR" settings={settings} onPosition={props.onPositionSizeControl} />
      </div>
    </Draggable>
  )
}

class Graph extends Component {

  componentDidMount() {
    this.lastDragSC = { x: null, y: null };
    this.lastDragLayout = false;
  }

  handleClickLayout = (e, params) => {
    if (this.lastDragLayout) {
      this.lastDragLayout = false;
    } else {
      core.components.graph.clearAllSelects();
    }
  } 

  handleContextMenuLayout = (e, params) => {
    e.preventDefault();
    e.stopPropagation();
    core.event('contextmenu', 'graph:layout', e, params);
  }

  handleDragLayout = () => {
    if (this.lastDragLayout === false) {
      this.lastDragLayout = true;
    }
  }

  handlePositionLayout = (e, data) => {
    core.components.graph.setPositionLayout(data.x, data.y);
  }

  handlePositionSizeControl = (e, type, op, settings, data) => {
    if (type === 'start') {
      e.preventDefault();
      e.stopPropagation();
    } 
    if (type === 'stop' || type === 'drag' && (this.lastDragSC.x !== data.x || this.lastDragSC.y !== data.y)) {
      this.lastDragSC = { x: data.x, y: data.y };
      const position = getPositionContainer(op, settings, data);
      core.components.graph.setSettingsContainer(settings.id, position);
    } 

  }

  handlePositionStartContainer = (e, item, data) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.shiftKey) {
      core.components.graph.selectMultiContainers(item.settings.id, 'one');
    } else {
      core.components.graph.selectOneContainer(item.settings.id, 'one');
    }
  }

  handlePositionStopContainer = (e, item, data) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.settings.x !== data.x || item.settings.y !== data.y) {
      core.components.graph.setPositionContainer(item.settings.id, data.x, data.y);
    }
  }

  handleClickContainer = (e, item)  => {
    e.preventDefault();
    e.stopPropagation();
    // core.components.graph.selectContainer(item.settings.id, 'one');
  } 

  handleContextMenuContainer = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    core.event('contextmenu', 'graph:item', e, item);
  }

  render({ id, state, match, classes, onClick } = this.props) {
    console.log(state)
    return (
      <div style={styles.box}>
        <Draggable 
          position={state.options.position} 
          onDrag={this.handleDragLayout}
          onStop={this.handlePositionLayout}
        >
          <Paper
            ref={this.refList}
            elevation={2} 
            className="parent" 
            style={styles.paper}
            onClick={(e) => this.handleClickLayout(e, state)}
            onContextMenu={(e) => this.handleContextMenuLayout(e, state)}
          >
            {Object
            .keys(state.map)
            .map(key => {
              return (
                <Container 
                  key={key.toString()}
                  data={state.map[key]}
                  selects={state.selectid}
                  onClickContainer={this.handleClickContainer}
                  onPositionStartContainer={this.handlePositionStartContainer}
                  onPositionStopContainer={this.handlePositionStopContainer}
                  onPositionSizeControl={this.handlePositionSizeControl}
                  onContextMenuContainer={this.handleContextMenuContainer}
                />
              );
            })}
          </Paper>
        </Draggable>
      </div>
    );
  }
}



export default core.connect(withStyles(classes)(Graph));