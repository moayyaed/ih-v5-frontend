import React, { Component } from 'react';
import core from 'core';

import Draggable from 'react-draggable';

import ResizeControls from './ResizeControls';


const styles = {

}


function Element(props) {
  return (
    <Draggable
      bounds=".parent"
      scale={props.scale}
      position={props.item}
      onStart={(e, data) => props.onStartMove(e, props.id, data)}
      onDrag={(e, data) => props.onMove(e, props.id, data)}
      onStop={(e, data) => props.onStopMove(e, props.id, data)}
    >
      <div
        style={{ 
          position: 'absolute',
          width: props.item.w, 
          height: props.item.h, 
          outline: '2px dashed #ff00ff'
        }} 
      >
        <div 
          style={{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            border: `1px solid ${props.item.borderColor}`, 
          }}
        />
        <ResizeControls
          id={props.id}
          position={props.item} 
          scale={props.scale} 
          onChange={props.onChangeSize}
        />
      </div>
    </Draggable>
  );
}

export default Element;