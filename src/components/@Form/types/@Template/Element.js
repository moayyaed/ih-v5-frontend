import React, { Component } from 'react';
import core from 'core';

import Draggable from 'libs/Draggable';

import ResizeControls from './ResizeControls';


const styles = {

}


function Element(props) {
  if (props.selectToolbar !== 'events' && props.item.type === 'action') {
    return null;
  }
  return (
    <Draggable
      bounds=".parent2"
      stopevents={props.stopevents}
      grid={[props.grid, props.grid]}
      scale={props.scale}
      position={{ x: props.item.x.value , y: props.item.y.value }}
      disabled={props.move ? true : props.isGroup || props.selectType === 'some'}
      onStart={(e, data) => props.onStartMove(e, props.id, data)}
      onDrag={(e, data) => props.onMove(e, props.id, data)}
      onStop={(e, data) => props.onStopMove(e, props.id, data)}
    >
      <div
        style={{ 
          position: 'absolute',
          width: props.item.w.value, 
          height: props.item.h.value, 
          outline: props.select ? '2px dashed #ff00ff' : '2px dashed transparent',
          zIndex: props.item.zIndex.value,
        }}
        elementid={props.id}
        onClick={(e) => props.isGroup || props.onClick(e, props.id)}
        onContextMenu={(e) => props.isGroup || props.onContextMenu(e, props.id)} 
      >
        {props.onRenderElement(props.id, props.item)}
        <ResizeControls
          id={props.id}
          disabled={props.isGroup || !props.select || props.selectType === 'some'}
          position={props.item}
          grid={props.grid}
          scale={props.scale}
          settings={props.settings} 
          forceProportion={props.item.type === 'group'}
          onChange={props.onChangeSize}
        />
      </div>
    </Draggable>
  );
}

export default Element;