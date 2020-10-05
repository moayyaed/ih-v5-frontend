import React from 'react';


function Text(props) {
  return (
    <div style={{ color: props.item.color, fontSize: props.item.size, ...props.item.style}}>
      {props.data}
    </div>
  );
}


export default Text;