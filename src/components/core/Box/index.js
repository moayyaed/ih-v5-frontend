import React from 'react';


function Box(props) {
  return (
    <div style={props.style}>{props.children}</div>
  );
}


export default Box;