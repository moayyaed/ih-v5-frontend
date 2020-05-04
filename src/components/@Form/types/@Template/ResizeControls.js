import React, { Component } from 'react';
import core from 'core';

import Draggable from 'components/Draggable';


const styles = {
  control: {
    position: 'absolute',
    width: 8,
    height: 8,
    border: '1px solid rgba(33, 150, 243, 0.5)',
    backgroundColor: 'rgba(33, 150, 243, 0.3)',
    cursor: 'crosshair',
  },
}

function getProportionContainer(type, data, pos, old) {
  const scaleX = pos.w  / old.w;
  const scaleY = pos.h  / old.h;
  const delta = scaleX >  scaleY ? 'X' : 'Y'; 
  switch (type + delta) {
    case 'TLX':
      return { 
        x: pos.x,
        y: old.y - (old.h * (pos.w  / old.w) - old.h),
        w: pos.w,
        h: old.h * (pos.w  / old.w),
      };
    case 'TLY':
      return { 
        x: old.x - (old.w * (pos.h  / old.h) - old.w),
        y: pos.y,
        w: old.w * (pos.h  / old.h),
        h: pos.h,
      };
    case 'TRX':
      return { 
        x: pos.x,
        y: old.y - (old.h * (pos.w  / old.w) - old.h),
        w: pos.w,
        h: pos.w,
      };
    case 'TRY':
      return { 
        x: pos.x,
        y: pos.y,
        w: (pos.h  / old.h) * old.w,
        h: pos.h,
      };
    case 'BLX':
      return { 
        x: pos.x,
        y: pos.y,
        w: pos.w,
        h: (pos.w  / old.w) * old.h
      };
    case 'BLY':
      return { 
        x: old.x - (old.w * (pos.h  / old.h) - old.w),
        y: pos.y,
        w: old.w * (pos.h  / old.h),
        h: pos.h,
      };
    case 'BRX':
      return { 
        x: pos.x,
        y: pos.y,
        w: pos.w,
        h: (pos.w  / old.w) * old.h,
      };
    case 'BRY':
      return { 
        x: pos.x,
        y: pos.y,
        w: (pos.h  / old.h) * old.w,
        h: pos.h
      };
    default:
      return pos;
  }
}

function getPositionContainer(type, position, data) {
  switch (type) {
    case 'TL':
      return { 
        x: position.x + data.x,
        y: position.y + data.y,
        w: position.w - data.x,
        h: position.h - data.y,
      };
    case 'TR':
      return { 
        x: position.x,
        y: position.y + data.y,
        w: data.x + styles.control.width, 
        h: position.h - data.y,
      };
    case 'BL':
      return { 
        x: position.x + data.x,
        y: position.y,
        w: position.w - data.x,
        h: data.y + styles.control.height,
      };
    case 'BR':
        return { 
          x: position.x,
          y: position.y,
          w: data.x + styles.control.width, 
          h: data.y + styles.control.height,
        };
    default:
      return position;
  }
}

function getSize(isProportion, type, position, data) {
  const newPosition = getPositionContainer(type, position, data);
  if (isProportion) {
    const newPositionProportion = getProportionContainer(type, data, newPosition, position);
    return {
      x: Math.round(newPositionProportion.x * 1e2 ) / 1e2,
      y: Math.round(newPositionProportion.y * 1e2 ) / 1e2,
      w: Math.round(newPositionProportion.w * 1e2 ) / 1e2,
      h: Math.round(newPositionProportion.h * 1e2 ) / 1e2,
    };
  }
  return {
    x: Math.round(newPosition.x * 1e2 ) / 1e2,
    y: Math.round(newPosition.y * 1e2 ) / 1e2,
    w: Math.round(newPosition.w * 1e2 ) / 1e2,
    h: Math.round(newPosition.h * 1e2 ) / 1e2,
  };
}

function getPositionsControls({ x, y, w, h }) {
  return {
    topLeft: { x: 0, y: 0 },
    topRight: { x: w - styles.control.height, y: 0 },
    bottomLeft: { x: 0, y: h - styles.control.height },
    bottomRight: { x: w - styles.control.height, y: h - styles.control.height }, 
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
        scale={props.scale} 
        position={positions.topLeft}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TL', props.position, data), 'start')}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TL', props.position, data), 'move')}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TL', props.position, data), 'stop')}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        test
        scale={props.scale} 
        position={positions.topRight}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TR', props.position, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TR', props.position, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'TR', props.position, data))}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        scale={props.scale} 
        position={positions.bottomLeft}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BL', props.position, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BL', props.position, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BL', props.position, data))}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        scale={props.scale} 
        position={positions.bottomRight}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BR', props.position, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BR', props.position, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey || props.forceProportion, 'BR', props.position, data))}     
      >
        <div style={styles.control} />
      </Draggable>
    </>
  )
}


export default ResizeControls;