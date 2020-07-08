import React from 'react';


function Action(props) {
  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        border: '1px solid #F44336',
        background: 'repeating-linear-gradient(45deg, #EF5350, #EF5350 10px, #EF9A9A 10px, #EF9A9A 20px)',
        opacity: 0.7
      }}
    />
  );
}


export default Action;