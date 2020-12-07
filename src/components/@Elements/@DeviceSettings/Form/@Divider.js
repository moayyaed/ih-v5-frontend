import React from 'react';


function Divider(props) {
  return (
    <div style={{ 
        borderBottom: `${props.item.size}px solid ${props.item.color}`, 
        height: props.item.offsetTop + props.item.size,
        marginBottom: props.item.offsetBottom, 
        ...props.item.style
      }} 
    />
  );
}


export default Divider;