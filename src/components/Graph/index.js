import React, { Component } from 'react';
import core from 'core';

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import { withStyles } from '@material-ui/core/styles';

import css from './main.module.css';
import Properties from './Properties';

const styles = {
  page: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    perspective: 1000,
    WebkitPerspective: 1000,
  },
  zone: {
    display: 'none',
    position: 'absolute',
  },
  paper: {
    transformOrigin: '0 0',
    position: 'absolute',
    borderRadius: 0,
    backgroundSize: '50px 50px',
    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogPGxpbmUgeDE9IjEwMCIgeTE9IjAiIHgyPSIxMDAiIHkyPSIxMDAiIHN0cm9rZT0iIzc1NzU3NSIgLz4NCiA8bGluZSB4MT0iMCIgeTE9IjEwMCIgeDI9IjEwMCIgeTI9IjEwMCIgc3Ryb2tlPSIjNzU3NTc1IiAvPg0KPC9zdmc+')",
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
  },
  properties: {
    paddingTop: 35,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 250,
    height: '100%',
    background: '#37474F',
    color: '#F5F5F5'
    // zIndex: 1500,
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
      scale={props.scale}
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
      scale={props.scale}
      disabled={selectBlock.containers}
      position={{ x: settings.x, y: settings.y }} 
      bounds=".parent"
      onStart={(e, data) => props.onPositionStart(e, props.data, data, props.selects)}
      onDrag={(e, data) => props.onPositionDrag(e, props.data, data, props.selects)}
      onStop={(e, data) => props.onPositionStop(e, props.data, data, props.selects)}
    >
      <div
        className="container"  
        style={{ 
          width: settings.w,
          height: settings.h,
          position: 'absolute',
          outline: !settings.parent && selectsData[settings.id] && settings.group === undefined ? '2px dashed #ff00ff' : '0px dashed #ff00ff',
          zIndex: settings.group && !settings.parent ?  1500: 'unset',
        }}
        onClick={(e) => props.onClick(e, props.data, null, props.selects)}
        onContextMenu={(e) => props.onContextMenu(e, props.data, props.selects)}
      >
        <div 
          style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            border: `${settings.borderSize}px solid ${settings.borderColor}`,
            backgroundColor: settings.backgroundColor,
          }} 
        />
        <SizeControl scale={props.scale} disabled={selectBlock.containers || !(selectType === 'one' || selectType === null)} op="TL" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl scale={props.scale} disabled={selectBlock.containers || !(selectType === 'one' || selectType === null)} op="TR" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl scale={props.scale} disabled={selectBlock.containers || !(selectType === 'one' || selectType === null)} op="BL" settings={settings} onPosition={props.onPositionSizeControl} />
        <SizeControl scale={props.scale} disabled={selectBlock.containers || !(selectType === 'one' || selectType === null)} op="BR" settings={settings} onPosition={props.onPositionSizeControl} />
      </div>
    </Draggable>
  )
}

class Graph extends Component {

  componentDidMount() {
    this.lastDragSC = { x: null, y: null };
    this.lastDragSCG = { x: null, y: null };
    this.lastDragLayout = false;
    this.z = { x: 0, y: 0, w: 0, h: 0, t: 0, l: 0 };

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

  linkList = (e) => {
    this.list = e;
  }

  linkZone = (e) => {
    this.zone = e;
  }

  handleMouseWhell = (e) => {
    const isTouchPad = e.nativeEvent.wheelDeltaY ? e.nativeEvent.wheelDeltaY === -3 * e.nativeEvent.deltaY : e.nativeEvent.deltaMode === 0;
    const offset = this.page.getBoundingClientRect();
 
    let x = this.props.state.settings.x;
    let y = this.props.state.settings.y;
    let s = this.props.state.settings.scale;

    const px = e.pageX - offset.left;
    const py = e.pageY - offset.top;

    const tx = (px - x) / s;
    const ty = (py - y) / s;
  
    if (isTouchPad) {
      if (e.deltaY > 0) {
        s -= (e.deltaY * 1 / 450)
      } else {
        s += (e.deltaY * -1 / 450)
      }
    } else {
      s += Math.max(-1, Math.min(1, e.deltaY)) * -0.1 * s;
    }

    if (s > 8) {
      s = 8;
    }
    if (s < 0.1 ) {
      s = 0.1;
    }

    x = -tx * s + px
    y = -ty * s + py
  
    core.components.graph.setPositionLayout(x, y, s);
  }

  handleSelectMouseMove = (pos) => {
    let temp = {};
    Object
      .keys(this.props.state.map)
      .forEach(key => {
    
        const s = this.props.state.map[key].settings;
        const a = (pos.x <= s.x && s.x <= pos.x + pos.w) && (pos.y <= s.y && s.y <= pos.y + pos.w);
        const b = (pos.x <= s.x + s.w && s.x + s.w <= pos.x + pos.w) && (pos.y <= s.y && s.y <= pos.y + pos.h);
        const c = (pos.x <= s.x + s.w && s.x + s.w <= pos.x + pos.w) && (pos.y <= s.y + s.h && s.y + s.h <= pos.y + pos.h);
        const d = (pos.x <= s.x && s.x <= pos.x + pos.w) && (pos.y <= s.y + s.h && s.y + s.h <= pos.y + pos.h);
        
        if (a && b && c && d && !s.parent) {
          if (s.group) {
            temp[s.id] = true;
            temp = { ...temp, ...s.group }
          } else {
            temp[s.id] = true;
          }
        }
      });
     const list = Object.keys(temp);
     if (list.length === 1) {
      core.components.graph.selectOneContainer(list[0], 'one');
     } else if (list.length > 1) {
      core.components.graph.selectMultiContainers(list[list.length - 1], temp, this.props.state.map);
     }
  }

  handleMouseMovePage = (e) => {
    if (this.zone.style.display === 'none') {
      this.zone.style.display = 'block';
      this.zone.style.zIndex = 3000;
      this.zone.style.backgroundColor = 'rgba(33, 150, 243, 0.3)';
      this.zone.style.border = '1px solid #64B5F6';
      this.zone.style.left = this.z.l + 'px';
      this.zone.style.top = this.z.t + 'px';
      this.zone.style.width = '0px';
      this.zone.style.height = '0px';
    }
    const w = (e.clientX - this.page.offsetLeft) - this.z.l;
    const h = (e.clientY - this.page.offsetTop) - this.z.t;

    if (w > 0) {
      this.z.wr = false;
      this.z.x = this.z.l - this.props.state.settings.x;
      this.z.w = w;
      this.zone.style.width =  w + 'px';
    } else {
      this.z.wr = true;
      this.z.x = this.z.l + w - this.props.state.settings.x;
      this.z.w = w * -1;
      this.zone.style.left = this.z.l + w + 'px';
      this.zone.style.width =  w * -1 + 'px';
    }

    if (h > 0) {
      this.z.hr = false;
      this.z.y = this.z.t - this.props.state.settings.y;
      this.z.h = h;
      this.zone.style.height =  h + 'px';
    } else {
      this.z.hr = true;
      this.z.y = this.z.t + h - this.props.state.settings.y;
      this.z.h = h * -1;
      this.zone.style.top = this.z.t + h + 'px';
      this.zone.style.height =  h * -1 + 'px';
    }    
  }

  handleMouseUpPage = (e) => {
    if (e.button === 0 && this.page !== null) {
      this.zone.style.display = 'none';
      this.zone.style.zIndex = 0;
      this.zone.style.backgroundColor = 'none';
      this.zone.style.left = '0px'
      this.zone.style.top = '0px'
      this.zone.style.width = '0px';
      this.zone.style.height = '0px';
      
      this.page.removeEventListener('mousemove', this.handleMouseMovePage);
      if (this.z.w !== 0 || this.z.h !== 0) {
        if (this.z.p == false && this.z.wr == false && this.z.hr == false) {
          this.lastDragLayout = true;
        }
        this.handleSelectMouseMove(this.z);
      }
      this.z = { x: 0, y: 0, w: 0, h: 0, t: 0, l:0 };
    }
  }

  handleMouseDownPage = (e) => {
    const { space, shift } =  this.props.state.selects.block;
    if (e.button === 0 && e.target === this.page) {
      if (this.lastDragLayout) {
        this.lastDragLayout = false;
      } else {
        core.components.graph.clearAllSelects();
      }
    }
    if (e.button === 0 && space === false && shift === false && this.page !== null) {
      this.z.p = e.target === this.page;
      this.z.l = e.nativeEvent.layerX;
      this.z.t = e.nativeEvent.layerY;
      this.page.addEventListener('mousemove', this.handleMouseMovePage);
    }
  }
  

  handleKeyUp = (e) => {
    if (e.keyCode === 32) {
      document.body.style.cursor = 'auto';
      core.components.graph.selectBlock({ space: false, layout: true, containers: false });
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
        core.components.graph.selectBlock({ space: true, layout: false, containers: true });
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
    core.components.graph.setPositionLayout(data.x, data.y, this.props.state.settings.scale);
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

  handleContextMenuGroup = (e, selects) => {
    e.preventDefault();
    e.stopPropagation();
    const params = []
    Object
      .keys(selects.data)
      .forEach(key => {
        params.push(this.props.state.map[key]);
      });
    core.event('contextmenu', 'graph:group', e, params, this.props.state);
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
      if (item.settings.group !== undefined) {
        core.components.graph
        .selectMultiContainers(item.settings.id, { ...selects.data, ...item.settings.group }, this.props.state.map);
      } else {
        core.components.graph.selectMultiContainers(item.settings.id, selects.data, this.props.state.map);
      }
    } else {
      if (selects.type === 'multi' && selects.data[item.settings.id]) {
       
      } else {
        if (item.settings.group !== undefined) {
          this.lastDragLayout = true;
          core.components.graph
            .selectMultiContainers(item.settings.id, item.settings.group, this.props.state.map);
        } else {
          core.components.graph.selectOneContainer(item.settings.id, 'one');
        }
      }
    }
  }

  handlePositionDragContainer = (e, item, data, selects) => {
    if (item.settings.group !== undefined) {
      core.components.graph.setPositionGroupContainer(data, selects, this.props.state.map);
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
    const group = state.selects.group;
    const block = state.selects.block;
    return (
      <>
      <div
        ref={this.linkPage}
        style={styles.page}
        onMouseUp={this.handleMouseUpPage}
        onMouseDown={this.handleMouseDownPage}
        onWheel={this.handleMouseWhell}
      >
        <div ref={this.linkZone} style={styles.zone} />
        <Draggable 
          disabled={block.layout}
          position={{ x: state.settings.x, y: state.settings.y, scale: state.settings.scale }} 
          onDrag={this.handleDragLayout}
          onStop={this.handlePositionLayout}
        >
          <Paper
            ref={this.linkList}
            elevation={2} 
            className="parent" 
            style={{ ...styles.paper, width: state.settings.w, height: state.settings.h }}
            onClick={(e) => this.handleClickLayout(e, state)}
            onContextMenu={(e) => this.handleContextMenuLayout(e, state)}
            
          >
            <Draggable
              scale={state.settings.scale}
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
                onContextMenu={(e) => this.handleContextMenuGroup(e, state.selects, state)}
              >
                 <SizeControl scale={state.settings.scale} disabled={block.containers} op="TL" settings={group} onPosition={this.handlePositionSizeControlGroup} />
                 <SizeControl scale={state.settings.scale} disabled={block.containers} op="TR" settings={group} onPosition={this.handlePositionSizeControlGroup} />
                 <SizeControl scale={state.settings.scale} disabled={block.containers} op="BL" settings={group} onPosition={this.handlePositionSizeControlGroup} />
                 <SizeControl scale={state.settings.scale} disabled={block.containers} op="BR" settings={group} onPosition={this.handlePositionSizeControlGroup} />
              </div>
            </Draggable>
            {Object
            .keys(state.map)
            .map(key => {
              return (
                <Container 
                  key={key.toString()}
                  scale={state.settings.scale}
                  data={state.map[key]}
                  selects={state.selects}
                  onClick={this.handleClickContainer}
                  onPositionStart={this.handlePositionStartContainer}
                  onPositionDrag={this.handlePositionDragContainer}
                  onPositionStop={this.handlePositionStopContainer}
                  onPositionSizeControl={this.handlePositionSizeControl}
                  onContextMenu={this.handleContextMenuContainer}
                />
              );
            })}
          </Paper>
        </Draggable>
      </div>
      <Properties
        select={this.props.state.selectvar}
        vars={this.props.state.vars}
        onClickAdd={this.handleClickPropsAdd}
        onClickRemove={this.handleClickPropsRemove}
        onChange={this.handleChangePropsContainer}
        onClick={this.handleClickPropsClick}
        onChangev={this.handleClickPropsChangev}
      />
      </>
    );
  }

  handleClickPropsChangev = (type, id, e) => {
    let v = e.target.value;
    if (type === 'k') {
      if (this.props.state.selectvar === id) {
        const vars = Object.keys(this.props.state.vars).reduce((p, c) => {
          if (this.props.state.vars[c].id === id) {
            return { ...p, [v]: { ...this.props.state.vars[c], id: v, } };
          }
          return { ...p, [c]: this.props.state.vars[c] };
        }, {});
        core.components.graph.forceData({ selectvar: v,  vars });
      } else {
        const vars = Object.keys(this.props.state.vars).reduce((p, c) => {
          if (this.props.state.vars[c].id === id) {
            return { ...p, [v]: { id: v, ...this.props.state.vars[c] } };
          }
          return { ...p, [c]: this.props.state.vars[c] };
        }, {});
        core.components.graph.forceData({ vars });
      }
    }
    if (type === 'v') { 
      const vars = Object.keys(this.props.state.vars).reduce((p, c) => {
        if (this.props.state.vars[c].id === id) {
          return { ...p, [c]: { ...this.props.state.vars[c], value: v } };
        }
        return { ...p, [c]: this.props.state.vars[c] };
      }, {});
    
      const oldv = this.props.state.vars[id].value;
      const mode = vars[id].mode;
      let s = vars[id].state[v];

      if (id === 'default') {
        s = vars[id].state;
      } else {
        if (this.props.state.selectvar === 'default') {
          s = {}
          Object.keys(this.props.state.vars).forEach(k => {
            if (this.props.state.vars[k].state[this.props.state.vars[k].value] !== undefined) {
              Object.keys(this.props.state.vars[k].state[this.props.state.vars[k].value]).forEach(i => {
                if (s[i] === undefined) {
                  s[i] = this.props.state.vars[k].state[this.props.state.vars[k].value][i]
                } else {
                  s[i] = { ...s[i], ...this.props.state.vars[k].state[this.props.state.vars[k].value][i] }
                }
              })
            }
          })

          Object.keys(vars[id].state[v] || {}).forEach(i => {
            if (s[i] === undefined) {
              s[i] = vars[id].state[v][i];
            } else {
              s[i] = { ...s[i], ...vars[id].state[v][i] };
            }
          })

        }
      }


      if (mode === 'M') {
        if (s !== undefined) {
          const state = this.props.state;
          const map = Object.keys(state.map).reduce((p, c) => {
            if (s[c]!== undefined) {
              return { 
                ...p, 
                [c]: {
                  ...state.map[c],
                  settings: {
                    ...state.map[c].settings,
                    ...s[c],
                  }
                } 
              };
            }
            return { ...p, [c]: state.map[c] };
          }, {});
          core.components.graph.forceData({ map, vars });
        } else {
          core.components.graph.forceData({ vars });
        }
      }

    if (mode === 'D') {
        const d = vars.default.state;
        const os = vars[id].state[oldv];
        const state = this.props.state;
        const map = Object.keys(state.map).reduce((p, c) => {
          let styles = state.map[c].settings;
          if (os && os[c]!== undefined) {
            Object.keys(os[c]).forEach(k => {
              styles[k] = d[c][k];
            });
          }
          if (id === 'default') {
            delete s[c].x;
            delete s[c].y;
            delete s[c].w;
            delete s[c].h;
          }
          if (s && s[c]!== undefined) {
            return { 
              ...p, 
              [c]: {
                ...state.map[c],
                settings: {
                  ...styles,
                  ...s[c],
                }
              } 
            };
          } else {
            return { 
              ...p, 
              [c]: {
                ...state.map[c],
                settings: {
                  ...styles,
                }
              } 
            };
          }
       
        }, {});
        core.components.graph.forceData({ map, vars });
     }

     if (mode === 'I') {
      if (s !== undefined) {
        const state = this.props.state;
        const map = Object.keys(state.map).reduce((p, c) => {
          if (s[c]!== undefined) {
            return { 
              ...p, 
              [c]: {
                ...state.map[c],
                settings: {
                  ...state.map[c].settings,
                  ...s[c],
                }
              } 
            };
          }
          return { ...p, [c]: state.map[c] };
        }, {});
        core.components.graph.forceData({ map, vars });
      } else {
        core.components.graph.forceData({ vars });
      }
    }

    }
  }

  handleClickPropsClick = (e, type, id, value) => {
    e.stopPropagation();
    if (type === 's' && this.props.state.selectvar !== id) {
      core.components.graph.forceData({ selectvar: id });
      const v = { target: { value: this.props.state.vars[id].value } }
      this.handleClickPropsChangev('v', id, v)
    }

    if (type === 'm') {
      let v = 'D';
      if (value === 'D') {
        v = 'M'
      }
      if (value === 'M') {
        v = 'I'
      }
      if (value === 'I') {
        v = 'D'
      }
      const vars = Object.keys(this.props.state.vars).reduce((p, c) => {
        if (this.props.state.vars[c].id === id) {
          return { ...p, [c]: { ...this.props.state.vars[c], mode: v } };
        }
        return { ...p, [c]: this.props.state.vars[c] };
      }, {});
      core.components.graph.forceData({ vars });
    }
  }

  handleClickPropsAdd = () => {
    let i = 1;
    const name = 'value';
    function create(vars) {
      if (vars[name + i] == undefined) {
        core.components.graph.forceData({ selectvar: name + i, vars: {
          ...vars,
          [name + i]: { id: name + i, value: 0  }
        } });
      } else {
        i = i + 1;
        create(vars);
      }
    }
    create(this.props.state.vars);
  }

  handleClickPropsRemove = () => {
    if (this.props.state.selectvar !== 'default') {
      const vars = Object.keys(this.props.state.vars).reduce((p, c) => {
        if (this.props.state.vars[c].id === this.props.state.selectvar) {
          return p;
        }
        return { ...p, [c]: this.props.state.vars[c] };
      }, {});
      const keys = Object.keys(vars);
      const selectvar = keys.length === 0 ? null : keys[keys.length - 1];
      core.components.graph.forceData({ selectvar, vars });
    }
  }

  handleChangePropsContainer = (name, e) => {
    const state = this.props.state;
    let v = e;
    if (name === 'borderColor') {
      v = e.target.value;
    }
    if (name === 'backgroundColor') {
      v = e.target.value;
    }

    const map = Object.keys(state.map).reduce((p, c) => {
      if (!state.map[c].settings.group && state.selects.data[c]) {
        return { 
          ...p, 
          [c]: {
            ...state.map[c],
            settings: {
              ...state.map[c].settings,
              [name]: v,
            }
          } 
        };
      }
      return { ...p, [c]: state.map[c] };
    }, {});

      const vars = {
        ...state.vars
      }
  
      Object.keys(state.selects.data).forEach(k => {
        if (state.selectvar !== 'default') {
          if (vars[state.selectvar]) {
            if (vars[state.selectvar].state[vars[state.selectvar].value] === undefined) {
              vars[state.selectvar].state[vars[state.selectvar].value] = {}
            }
            if (vars[state.selectvar].state[vars[state.selectvar].value][k] === undefined) {
              vars[state.selectvar].state[vars[state.selectvar].value] = {
                ...vars[state.selectvar].state[vars[state.selectvar].value],
                [k]: { [name]: v }
              }
            } else {
              vars[state.selectvar].state[vars[state.selectvar].value][k] = {
                ...vars[state.selectvar].state[vars[state.selectvar].value][k],
                [name]: v,
              }
            }
          }
        } else {
          if (vars[state.selectvar]) {
            if (vars[state.selectvar].state === undefined) {
              vars[state.selectvar].state = {
                [k]: { [name]: v }
              }
            } else {
              vars[state.selectvar].state = {
                ...vars[state.selectvar].state,
                [k]: { [name]: v }
              }
            }
          }
        }
      });
      
      
      core.components.graph.forceData({ vars, map });

    // core.components.graph.setPropertiesContainer(this.props.state.selects.data, name, v);
  }
  
}



export default core.connect(withStyles(classes)(Graph));