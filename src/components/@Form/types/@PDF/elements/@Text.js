import React from 'react';


function Text(props) {
  return (
    <div
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        fontSize: props.item.textSize.value,
        fontWeight: props.item.textBold.value ? 'bold' : '',
        fontStyle: props.item.textItalic.value ? 'italic': '',
      }}
    >
      {props.item.text.value}
    </div>
  );
}


export default Text;