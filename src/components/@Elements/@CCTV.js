import React from 'react';


function CCTV(props) {
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundColor: props.params.backgroundColor,
        border: `${props.params.borderSize}px solid ${props.params.borderColor}`, 
      }}
    >
      CCTV
    </div>
  );
}


export default CCTV;