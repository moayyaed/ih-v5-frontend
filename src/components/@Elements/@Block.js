import React from 'react';


function Block(props) {
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize}px ${props.item.borderStyle.id} ${props.item.borderColor}`,
        borderRadius: (Math.min(props.item.w, props.item.h) / 2 / 100) * props.item.borderRadius,
        opacity: props.item.opacity / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: `scale(${props.item.flipH ? -1 : 1}, ${props.item.flipV ? -1 : 1}) rotate(${props.item.rotate}deg)`,
        transformOrigin: props.item.transformOrigin.id,
      }}
    />
  );
}


export default Block;