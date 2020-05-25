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
          backgroundColor: props.params.backgroundColor,
          border: `${props.params.borderSize}px solid ${props.params.borderColor}`,
          // fontSize: `${props.params.textSize}px`,
          // justifyContent: props.params.textAlignH.id,
          // alignItems: props.params.textAlignV.id, 
          overflow: 'hidden',
        }}
      >
        <text 
          x={getX(props.params.textAlignH.id)} 
          y={getY(props.params.textAlignV.id, props.params.textSize, props.params.h, props.params.borderSize)} 
          textAnchor={getTextAnchor(props.params.textAlignH.id)} 
          alignmentBaseline="middle" 
          fontSize={props.params.textSize}>{props.params.text}
        </text>
      </svg>
  );
}


export default Text;