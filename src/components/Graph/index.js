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
  },
  group: {
    outline: '2px dashed #ff00ff' , 
    position: 'absolute',
    width: 100,
    height: 100,
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
  if (props.disabled) {
    return null;
  }
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
  const selectsData = props.selects.data;
  const selectType = props.selects.type;
  return (
    <Draggable 
      position={{ x: settings.x, y: settings.y }} 
      bounds=".parent"
      onStart={(e, data) => props.onPositionStartContainer(e, props.data, data, props.selects)}
      onDrag={(e, data) => props.onPositionDragContainer(e, props.data, data, props.selects)}
      onStop={(e, data) => props.onPositionStopContainer(e, props.data, data, props.selects)}
    >
      <div
        className="container"  
        style={{ 
          width: settings.w,
          height: settings.h,
          position: 'absolute',
          outline: selectsData[settings.id] ? '2px dashed #ff00ff' : '0px dashed #ff00ff',
        }}
        onClick={(e) => props.onClickContainer(e, props.data, props.selects)}
        onContextMenu={(e) => props.onContextMenuContainer(e, props.data, props.selects)}
      >
        <div 
          style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            border: '2px solid ' + settings.color
          }} 
        />
        <SizeControl disabled={selectsData[settings.id]} op="TL" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl disabled={selectsData[settings.id]} op="TR" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl disabled={selectsData[settings.id]} op="BL" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl disabled={selectsData[settings.id]} op="BR" settings={settings} onPosition={props.onPositionSizeControl} />
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
      core.components.graph.clearAllSelects();
    } 
    if (type === 'stop' || type === 'drag' && (this.lastDragSC.x !== data.x || this.lastDragSC.y !== data.y)) {
      this.lastDragSC = { x: data.x, y: data.y };
      const position = getPositionContainer(op, settings, data);
      core.components.graph.setSettingsContainer(settings.id, position);
    } 

  }

  handlePositionStartGroup = (e, data, selects) => {
    e.preventDefault();
    e.stopPropagation();
    this.lastDragLayout = true;
  }

  handlePositionDragGroup = (e, data, selects) => {
    e.preventDefault();
    e.stopPropagation();
    core.components.graph.setPositionGroupContainer(data, selects, this.props.state.map);
  }

  handlePositionStopGroup = (e, data, selects) => {
    e.preventDefault();
    e.stopPropagation();
    core.components.graph.setPositionGroupContainer(data, selects, this.props.state.map);
  }
   
  handlePositionStartContainer = (e, item, data, selects) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.shiftKey && selects.type !== null) {
      core.components.graph.selectMultiContainers(item.settings.id, selects.data, this.props.state.map);
    } else {
      if (selects.type === 'multi' && selects.data[item.settings.id]) {

      } else {
        core.components.graph.selectOneContainer(item.settings.id, 'one');
      }
    }
  }

  handlePositionDragContainer = (e, item, data, selects) => {
    if (selects.type === 'multi' && selects.data[item.settings.id]) {
      // core.components.graph.setPositionGroupContainer(selects.data, data.x, data.y);
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
    // console.log(state)
    const group = state.selects.group;
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
            <Draggable 
              bounds=".parent"
              position={{ x: group.x, y: group.y }}
              onStart={(e, data) => this.handlePositionStartGroup(e, data, state.selects)}
              onDrag={(e, data) => this.handlePositionDragGroup(e, data, state.selects)}
              onStop={(e, data) => this.handlePositionStopGroup(e, data, state.selects)}
            >
              <div 
                style={{ 
                  ...styles.group, 
                  display: group.enabled ? 'block' : 'none',
                  width: group.w, 
                  height: group.h,
                }} 
              />
            </Draggable>
            {Object
            .keys(state.map)
            .map(key => {
              return (
                <Container 
                  key={key.toString()}
                  data={state.map[key]}
                  selects={state.selects}
                  onClickContainer={this.handleClickContainer}
                  onPositionStartContainer={this.handlePositionStartContainer}
                  onPositionDragContainer={this.handlePositionDragContainer}
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