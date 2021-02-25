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

function getPositionContainer(type, position, grid, data) {
  switch (type) {
    case 'TL':
      return { 
        x: position.x + Math.round(data.x / grid) * grid,
        y: position.y + Math.round(data.y / grid) * grid,
        w: position.w - Math.round(data.x / grid) * grid,
        h: position.h - Math.round(data.y / grid) * grid,
      };
    case 'TR':
      return { 
        x: position.x,
        y: position.y + Math.round(data.y / grid) * grid,
        w: Math.round((data.x + styles.control.width) / grid) * grid, 
        h: position.h - Math.round(data.y / grid) * grid,
      };
    case 'BL':
      return { 
        x: position.x + Math.round(data.x / grid) * grid,
        y: position.y,
        w: position.w - Math.round(data.x / grid) * grid,
        h: Math.round((data.y + styles.control.height) / grid) * grid, 
      };
    case 'BR':
        return { 
          x: position.x,
          y: position.y,
          w: Math.round((data.x + styles.control.width) / grid) * grid, 
          h: Math.round((data.y + styles.control.height) / grid) * grid, 
        };
    default:
      return position;
  }
}

function getSize(isProportion, type, pos, grid, data) {
  const position = { x: pos.x.value, y: pos.y.value, w: pos.w.value, h: pos.h.value, }
  const newPosition = getPositionContainer(type, position, grid, data);
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
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TL', props.position, props.grid, data), 'start')}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TL', props.position, props.grid, data), 'move')}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TL', props.position, props.grid, data), 'stop')}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        bounds=".parent2"
        grid={[1, 1]}
        scale={props.scale} 
        position={{ x: positions.topRight.x.value , y: positions.topRight.y.value }}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TR', props.position, props.grid, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TR', props.position, props.grid, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TR', props.position, props.grid, data))}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        bounds=".parent2"
        grid={[1, 1]}
        scale={props.scale} 
        position={{ x: positions.bottomLeft.x.value , y: positions.bottomLeft.y.value }}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BL', props.position, props.grid, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BL', props.position, props.grid, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BL', props.position, props.grid, data))}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        bounds=".parent2"
        grid={[1, 1]}
        scale={props.scale} 
        position={{ x: positions.bottomRight.x.value , y: positions.bottomRight.y.value }}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BR', props.position, props.grid, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BR', props.position, props.grid, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BR', props.position, props.grid, data))}     
      >
        <div style={styles.control} />
      </Draggable>
    </>
  )
}


export default ResizeControls;