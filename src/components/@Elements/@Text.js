import React from 'react';


function Block(props) {
  return (
    <div 
      style={{
        display: 'flex',
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundColor: props.params.backgroundColor,
        border: `${props.params.borderSize}px solid ${props.params.borderColor}`,
        fontSize: `${props.params.textSize}px`,
        justifyContent: props.params.textAlignH.id,
        alignItems: props.params.textAlignV.id, 
      }}
    >
      {props.params.text}
    </div>
  );
}


export default Block;