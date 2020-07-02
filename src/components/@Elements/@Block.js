import React from 'react';


function Block(props) {
  const borderStyle = props.item.borderStyle ? props.item.borderStyle.id : 'solid';
  const borderRadius = props.item.borderRadius ? (Math.min(props.item.w, props.item.h) / 2 / 100) * props.item.borderRadius : 0;
  const opacity = props.item.opacity ? props.item.opacity / 100 : 1;
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundColor: props.item.backgroundColor,
        border: `${props.item.borderSize}px ${borderStyle} ${props.item.borderColor}`,
        borderRadius: borderRadius,
        opacity: opacity,
      }}
    />
  );
}


export default Block;