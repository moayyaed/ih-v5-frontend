import React, { Component } from 'react';
import core from 'core';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { withStyles } from '@material-ui/core/styles';

import css from './main.module.css';


const styles = {
  page: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  zone: {
    position: 'absolute',
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
    // zIndex: 1000,
  }
};

const classes = theme => ({
  root: {
  },
});

function getProportion(type, data, pos, old) {
  switch (type) {
    case 'TL':
      return { 
        x: old.x - (old.w * (pos.h  / old.h) - old.w),
        y: pos.y,
        w: old.w * (pos.h  / old.h),
        h: pos.h,
      };
    case 'TR':
      return { 
        x: pos.x,
        y: pos.y,
        w: (pos.h  / old.h) * old.w,
        h: pos.h,
      };
    case 'BL':
      return { 
        x: pos.x,
        y: pos.y,
        w: pos.w,
        h: (pos.w  / old.w) * old.h
      };
    case 'BR':
        return { 
          x: pos.x,
          y: pos.y,
          w: pos.w,
          h: (pos.w  / old.w) * old.h
        };
    default:
      return pos;
  }
}


function getPositionContainer(e, type, settings, data) {
  switch (type) {
    case 'TL':
      return { 
        x: settings.x + data.x,
        y: settings.y + data.y,
        w: settings.w - data.x,
        h: settings.h - data.y,
      };
    case 'TR':
      return { 
        x: settings.x,
        y: settings.y + data.y,
        w: data.x + styles.sizecontrol.width, 
        h: settings.h - data.y,
      };
    case 'BL':
      return { 
        x: settings.x + data.x,
        y: settings.y,
        w: settings.w - data.x,
        h: data.y + styles.sizecontrol.height,
      };
    case 'BR':
        return { 
          x: settings.x,
          y: settings.y,
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
  const selectBlock = props.selects.block;
  return (
    <Draggable 
      disabled={selectBlock.containers}
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
        onClick={(e) => props.onClickContainer(e, props.data, null, props.selects)}
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
        <SizeControl disabled={selectBlock.containers || !(selectType === 'one' || selectType === null)} op="TL" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl disabled={selectBlock.containers || !(selectType === 'one' || selectType === null)} op="TR" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl disabled={selectBlock.containers || !(selectType === 'one' || selectType === null)} op="BL" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl disabled={selectBlock.containers || !(selectType === 'one' || selectType === null)} op="BR" settings={settings} onPosition={props.onPositionSizeControl} />
      </div>
    </Draggable>
  )
}

class Graph extends Component {

  componentDidMount() {
    this.lastDragSC = { x: null, y: null };
    this.lastDragSCG = { x: null, y: null };
    this.lastDragLayout = false;
    this.z = { x: 0, y: 0, w: 0, h: 0 };

    document.addEventListener('keyup', this.handleKeyUp);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyUp);
    document.removeEventListener('keydown', this.handleKeyDown);
    
    this.z = null;
    this.lastDragSC = null;
    this.lastDragSCG = null;
    this.lastDragLayout = null;
  }

  linkPage = (e) => {
    this.page = e;
  }

  linkZone = (e) => {
    this.zone = e;
  }

  handleMouseMovePage = (e) => {
    this.zone.style.width = (e.clientX - this.page.offsetLeft) - this.z.x + 'px';
    this.zone.style.height = (e.clientY - this.page.offsetTop) - this.z.y + 'px';
  }

  handleMouseUpPage = (e) => {
    if (this.page !== null) {
      
      this.zone.style.display = 'none';
      this.zone.style.zIndex = 0;
      this.zone.style.backgroundColor = 'none';
      this.zone.style.left = '0px'
      this.zone.style.top = '0px'
      this.zone.style.width = '0px';
      this.zone.style.height = '0px';
      
      this.page.removeEventListener('mousemove', this.handleMouseMovePage);
    }
  }

  handleMouseDownPage = (e) => {
    console.log('down')
    if (this.page !== null) {
      this.z.x = e.nativeEvent.layerX;
      this.z.y = e.nativeEvent.layerY;
 
      this.zone.style.display = 'block';
      this.zone.style.zIndex = 3000;
      this.zone.style.backgroundColor = 'rgba(33, 150, 243, 0.3)';
      this.zone.style.border = '1px solid #64B5F6';
      this.zone.style.left = e.nativeEvent.layerX  + 'px';
      this.zone.style.top = e.nativeEvent.layerY + 'px';
      this.zone.style.width = '0px';
      this.zone.style.height = '0px';

      this.page.addEventListener('mousemove', this.handleMouseMovePage);
    }
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 32) {
      document.body.style.cursor = 'auto';
      core.components.graph.selectBlock({ layout: true, containers: false });
    }
    if (e.keyCode === 16) {
      core.components.graph.selectBlock({ shift: false, containers: false });
    }
    // console.log(e.keyCode, 'up')
  }

  handleKeyDown = (e) => {
    if (e.repeat === false) {
      if (e.keyCode === 32) {
        document.body.style.cursor = 'grab';
        core.components.graph.selectBlock({ layout: false, containers: true });
      }
      if (e.keyCode === 16) {
        core.components.graph.selectBlock({ shift: true, containers: true });
      }
      // console.log(e.keyCode, 'down')
    }
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

  handleDragLayout = (e, data) => {
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
      let position = getPositionContainer(e, op, settings, data);
      if (e.ctrlKey || e.metaKey) {
        position = getProportion(op, data, position, settings);
      }
      core.components.graph.setSettingsContainer(settings.id, position);
    } 
  }

  handlePositionSizeControlGroup = (e, type, op, settings, data) => {
    if (type === 'start') {
      this.lastDragLayout = true;
      e.preventDefault();
      e.stopPropagation();
    } 
    if (type === 'stop' || type === 'drag' && (this.lastDragSCG.x !== data.x || this.lastDragSCG.y !== data.y)) {
      this.lastDragSCG = { x: data.x, y: data.y };
      let position = getPositionContainer(e, op, settings, data);
      if (e.ctrlKey || e.metaKey) {
        position = getProportion(op, data, position, settings);
      }
      core.components.graph.setResizeGroupContainer(e, position, this.props.state.selects, this.props.state.map);
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

  handleClickContainer = (e, item, data, selects)  => {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.state.selects.block.shift) {
      this.handlePositionStartContainer(e, item, data, selects);
    }
  } 

  handleContextMenuContainer = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    core.event('contextmenu', 'graph:item', e, item);
  }

  render({ id, state, match, classes, onClick } = this.props) {
    // console.log(state)
    const group = state.selects.group;
    const block = state.selects.block;
    return (
      <div
        ref={this.linkPage}
        style={styles.page}
        onMouseUp={this.handleMouseUpPage}
        onMouseDown={this.handleMouseDownPage} 
      >
        <div ref={this.linkZone} style={styles.zone} />
        <Draggable 
          disabled={block.layout}
          position={{ x: state.settings.x, y: state.settings.y }} 
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
              disabled={block.containers}
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
                  zIndex: block.shift ? 0 : 2000,
                }} 
              >
                 <SizeControl disabled={block.containers} op="TL" settings={group} onPosition={this.handlePositionSizeControlGroup} />
                 <SizeControl disabled={block.containers} op="TR" settings={group} onPosition={this.handlePositionSizeControlGroup} />
                 <SizeControl disabled={block.containers} op="BL" settings={group} onPosition={this.handlePositionSizeControlGroup} />
                 <SizeControl disabled={block.containers} op="BR" settings={group} onPosition={this.handlePositionSizeControlGroup} />
              </div>
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