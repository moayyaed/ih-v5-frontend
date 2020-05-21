import React from 'react';


function Template(props) {
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
      {`template ID: ${props.params.templateId}`}
    </div>
  );
}


export default Template;