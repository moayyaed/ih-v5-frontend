import React from 'react';


function Block(props) {
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%',
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value * (props.scale || 1)}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value * (props.scale || 1), 
      }}
    />
  );
}


export default Block;