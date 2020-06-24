import React from 'react';


function CCTV(props) {
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundColor: props.item.backgroundColor,
        border: `${props.item.borderSize}px solid ${props.item.borderColor}`, 
      }}
    >
      CCTV
    </div>
  );
}


export default CCTV;