import React, { Component } from 'react';
import core from 'core';

import Draggable from 'libs/Draggable';


const styles = {
  control: {
    position: 'absolute',
    width: 8,
    height: 8,
    // border: '1px solid rgba(33, 150, 243, 0.5)',
    backgroundColor: '#ff00ff',
    cursor: 'crosshair',
    zIndex: 9999,
  },
}

function getProportionContainer(type, data, pos, old) {
  const grid = 1;
  const scaleX = pos.w  / old.w;
  const scaleY = pos.h  / old.h;
  const delta = scaleX >  scaleY ? 'X' : 'Y'; 

  switch (type + delta) {
    case 'TLX':
      return { 
        x: pos.x,
        y: old.y - (((old.h * (pos.w  / old.w) - old.h)) / grid) * grid,
        w: pos.w,
        h: ((old.h * (pos.w  / old.w)) / grid) * grid,
      };
    case 'TLY':
      return { 
        x: old.x - (((old.w * (pos.h  / old.h) - old.w)) / grid) * grid,
        y: pos.y,
        w: ((old.w * (pos.h  / old.h)) / grid) * grid,
        h: pos.h,
      };
    case 'TRX':
      return { 
        x: pos.x,
        y: old.y - (((old.h * (pos.w  / old.w) - old.h)) / grid) * grid,
        w: pos.w,
        h: ((old.h * (pos.w  / old.w)) / grid) * grid,
      };
    case 'TRY':
      return { 
        x: pos.x,
        y: pos.y,
        w: (((pos.h  / old.h) * old.w) / grid) * grid, 
        h: pos.h,
      };
    case 'BLX':
      return { 
        x: pos.x,
        y: pos.y,
        w: pos.w,
        h: (((pos.w  / old.w) * old.h) / grid) * grid
      };
    case 'BLY':
      return { 
        x: old.x - ((old.w * (pos.h  / old.h) - old.w) / grid) * grid,
        y: pos.y,
        w: ((old.w * (pos.h  / old.h)) / grid) * grid,
        h: pos.h,
      };
    case 'BRX':
      return { 
        x: pos.x,
        y: pos.y,
        w: pos.w,
        h: (((pos.w  / old.w) * old.h) / grid) * grid,
      };
    case 'BRY':
      return { 
        x: pos.x,
        y: pos.y,
        w: (((pos.h  / old.h) * old.w) / grid) * grid,
        h: pos.h
      };
    default:
      return pos;
  }
}

function _grid(type, v, grid, settings, pos) {
  if (type === 'x' && v <= 0) {
    return 0;
  }
  if (type === 'x' && v + styles.control.width >= settings.w.value) {
    return settings.w.value;
  }

  if (type === 'y' && v <= 0) {
    return 0;
  }
  if (type === 'y' && v + styles.control.height >= settings.h.value) {
    return settings.h.value;
  }

  if (type === 'w' && pos.x + v >= settings.w.value) {
    return settings.w.value - pos.x;
  }

  if (type === 'h' && pos.y + v >= settings.h.value) {
    return settings.h.value - pos.y;
  }

  return Math.round(v / grid) * grid;
}

function getPositionContainer(type, position, grid, settings, data) {
  switch (type) {
    case 'TL':
      const _tlx = _grid('x', position.x + data.x, grid, settings, position);
      const _tlw = position.w - (_tlx - position.x);
      const _tly = _grid('y', position.y + data.y, grid, settings, position);
      const _tlh = position.h - (_tly - position.y);
      return { 
        x: _tlx,
        y: _tly,
        w: _tlw <= 0 ? 0 : _tlw,
        h: _tlh <= 0 ? 0 : _tlh,
      };
    case 'TR':
      const _try = _grid('y', position.y + data.y, grid, settings, position);
      const _trh = position.h - (_try - position.y);
      return { 
        x: position.x,
        y: _try,
        w: _grid('w', (data.x + styles.control.width), grid, settings, position), 
        h: _trh <= 0 ? 0 : _trh,
      };
    case 'BL':
      const _blx = _grid('x', position.x + data.x, grid, settings, position);
      const _blw = position.w - (_blx - position.x);
      return { 
        x: _blx,
        y: position.y,
        w: _blw <= 0 ? 0 : _blw,
        h: _grid('h', (data.y + styles.control.height), grid, settings, position), 
      };
    case 'BR':
        return { 
          x: position.x,
          y: position.y,
          w: _grid('w', (data.x + styles.control.width), grid, settings, position), 
          h: _grid('h', (data.y + styles.control.height), grid, settings, position), 
        };
    default:
      return position;
  }
}

function getSize(isProportion, type, props, data) {
  const grid = props.grid;
  const pos = props.position;
  const position = { x: pos.x.value, y: pos.y.value, w: pos.w.value, h: pos.h.value, }
  const newPosition = getPositionContainer(type, position, grid, props.settings, data);
  if (isProportion) {
    const newPositionProportion = getProportionContainer(type, data, newPosition, position, grid);
    return {
      x: { ...pos.x, value: newPositionProportion.x },
      y: { ...pos.y, value: newPositionProportion.y },
      w: { ...pos.w, value: newPositionProportion.w },
      h: { ...pos.h, value: newPositionProportion.h },
      w2: { ...pos.w2, value: newPositionProportion.w  },
      h2: { ...pos.h2, value: newPositionProportion.h },
    };
  }
  return {
    x: { ...pos.x, value: newPosition.x },
    y: { ...pos.y, value: newPosition.y },
    w: { ...pos.w, value: newPosition.w },
    h: { ...pos.h, value: newPosition.h },
    w2: { ...pos.w2, value: newPosition.w },
    h2: { ...pos.h2, value: newPosition.h },
  };
}

function getPositionsControls(pos) {
  const x =  pos.x.value;
  const y =  pos.y.value;
  const w =  pos.w.value;
  const h =  pos.h.value;

  return {
    topLeft: { x: { value: 0 }, y: { value: 0 } },
    topRight: { x: { value: w - styles.control.height }, y: { value: 0 } },
    bottomLeft: { x: { value: 0 }, y: { value: h - styles.control.height } },
    bottomRight: { x: { value: w - styles.control.height }, y: { value: h - styles.control.height } }, 
  }
}


function ResizeControls(props) {
  if (props.disabled) {
    return null;
  }
  const positions = getPositionsControls(props.position);
  return (
    <>
      <Draggable
        bounds=".parent2"
        grid={[1, 1]}
        scale={props.scale} 
        position={{ x: positions.topLeft.x.value , y: positions.topLeft.y.value }}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TL', props, data), 'start')}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TL', props, data), 'move')}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TL', props, data), 'stop')}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        bounds=".parent2"
        grid={[1, 1]}
        scale={props.scale} 
        position={{ x: positions.topRight.x.value , y: positions.topRight.y.value }}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TR', props, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TR', props, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TR', props, data))}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        bounds=".parent2"
        grid={[1, 1]}
        scale={props.scale} 
        position={{ x: positions.bottomLeft.x.value , y: positions.bottomLeft.y.value }}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BL', props, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BL', props, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BL', props, data))}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        bounds=".parent2"
        grid={[1, 1]}
        scale={props.scale} 
        position={{ x: positions.bottomRight.x.value , y: positions.bottomRight.y.value }}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BR', props, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BR', props, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BR', props, data))}     
      >
        <div style={styles.control} />
      </Draggable>
    </>
  )
}


export default ResizeControls;