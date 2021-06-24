import React from 'react';
import { transform } from './tools';

const styles = {
  root: {
    width: '100%', 
    height: '100%', 
  },
}

function Iframe(props) {
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value * (props.scale || 1)}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value * (props.scale || 1),
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: transform(props.item),
        // animation: props.item.animation.active ? props.item.animation.value : 'unset',
        overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
        visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
      }}
    >
      <div style={{ ...styles.root, pointerEvents: props.mode === 'user' ? 'all' : 'none' }}>
        <iframe src={props.item.url.value} frameBorder="0" width="100%" height="100%" />
      </div>  
    </div>
  );
}


export default Iframe;