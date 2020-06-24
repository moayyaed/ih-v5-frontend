import React from 'react';


const styles = {
  span: {
    whiteSpace: 'pre',
    display: 'inline-block',
  }
}

function getTextAnchor(v) {
  switch(v) {
    case 'flex-start':
      return 'start';
    case 'flex-end':
      return 'end';
    default:
      return 'middle';
  }
}

function getX(v) {
  switch(v) {
    case 'flex-start':
      return '0%';
    case 'flex-end':
      return '100%';
    default:
      return '50%';
  }
}

function getY(v, size, h, b) {
  switch(v) {
    case 'flex-start':
      return size / 2 + 'px';
    case 'flex-end':
      return (h - (b * 2)) - (size / 2) + 'px';
    default:
      return '50%';
  }
}

function Text(props) {
  return (
      <svg 
        style={{
          display: 'flex',
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          backgroundColor: props.item.backgroundColor,
          border: `${props.item.borderSize}px solid ${props.item.borderColor}`,
          // fontSize: `${props.item.textSize}px`,
          // justifyContent: props.item.textAlignH.id,
          // alignItems: props.item.textAlignV.id, 
          overflow: 'hidden',
        }}
      >
        <text 
          x={getX(props.item.textAlignH.id)} 
          y={getY(props.item.textAlignV.id, props.item.textSize, props.item.h, props.item.borderSize)} 
          textAnchor={getTextAnchor(props.item.textAlignH.id)} 
          alignmentBaseline="middle" 
          fontSize={props.item.textSize}>{props.item.text}
        </text>
      </svg>
  );
}


export default Text;