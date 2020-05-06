import React from 'react';


function Block(props) {
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        border: `1px solid ${props.params.borderColor}`, 
      }}
    />
  );
}


export default Block;