import React from 'react';


function Text(props) {
  return (
    <div style={{ 
      color: props.item.titleColor, 
      fontSize: props.item.titleSize,
      textAlign: props.item.titleAlign,
      fontWeight: props.item.titleBold ? 600 : 'unset',
      fontStyle: props.item.titleItalic ? 'italic' : 'unset',
      marginTop: props.item.offsetTop,
      marginBottom: props.item.offsetBottom, 
      ...props.item.style
    }}>
      {props.item.title}
    </div>
  );
}


export default Text;