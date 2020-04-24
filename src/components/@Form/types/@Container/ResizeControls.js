import React, { Component } from 'react';
import core from 'core';

import Draggable from 'react-draggable';


const styles = {
  control: {
    position: 'absolute',
    width: 10,
    height: 10,
    border: '1px solid #9E9E9E',
    backgroundColor: '#E0E0E0',
  },
}

function getProportionContainer(type, data, pos, old) {
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
    return getProportionContainer(type, data, newPosition, position);
  }
  return newPosition;
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
  const positions = getPositionsControls(props.position);
  return (
    <>
      <Draggable
        scale={props.scale} 
        position={positions.topLeft}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'TL', props.position, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'TL', props.position, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'TL', props.position, data))}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        scale={props.scale} 
        position={positions.topRight}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'TR', props.position, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'TR', props.position, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'TR', props.position, data))}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        scale={props.scale} 
        position={positions.bottomLeft}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'BL', props.position, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'BL', props.position, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'BL', props.position, data))}     
      >
        <div style={styles.control} />
      </Draggable>
      <Draggable
        scale={props.scale} 
        position={positions.bottomRight}
        onStart={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'BR', props.position, data))}
        onDrag={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'BR', props.position, data))}
        onStop={(e, data) => props.onChange(e, props.id, getSize(e.shiftKey, 'BR', props.position, data))}     
      >
        <div style={styles.control} />
      </Draggable>
    </>
  )
}


export default ResizeControls;