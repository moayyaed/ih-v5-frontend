import React from 'react';


function Block(props) {
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: `scale(${props.item.flipH.value ? -1 : 1}, ${props.item.flipV.value ? -1 : 1}) rotate(${props.item.rotate.value}deg)`,
        transformOrigin: props.item.transformOrigin.value ? props.item.transformOrigin.value.id : 'unset'
      }}
    />
  );
}


export default Block;