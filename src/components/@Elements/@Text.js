import React from 'react';


const styles = {
  span: {
    whiteSpace: 'pre',
    display: 'inline-block',
  }
}

function getTextStyle(params) {
  const size = params.textSize;
  const family = params.textFontFamily ? params.textFontFamily.id : 'Arial';
  const italic = params.textItalic ? 'italic': '';
  const bold = params.textBold ? 'bold' : '';
  return {
    font: `${italic} ${bold} ${size}px ${family}`
  };
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
      return b + 'px';
    case 'flex-end':
      return (h - (b * 2)) - (size / 2) + 'px';
    default:
      return '50%';
  }
}

function Text(props) {
  const borderStyle = props.item.borderStyle ? props.item.borderStyle.id : 'solid';
  const borderRadius = props.item.borderRadius ? (Math.min(props.item.w, props.item.h) / 2 / 100) * props.item.borderRadius : 0;
  const opacity = props.item.opacity ? props.item.opacity / 100 : 1;
  return (
    <div
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundColor: props.item.backgroundColor,
        border: `${props.item.borderSize}px ${borderStyle} ${props.item.borderColor}`,
        borderRadius: borderRadius,
        opacity: opacity,
      }}
    >
      <svg 
        style={{
          display: 'flex',
          width: '100%', 
          height: '100%', 
          overflow: 'hidden',
          transform: `rotate(${props.item.textRotate}deg)`,
        }}
      >
        <text 
          x={getX(props.item.textAlignH.id)} 
          y={getY(props.item.textAlignV.id, props.item.textSize, props.item.h, props.item.borderSize)} 
          textAnchor={getTextAnchor(props.item.textAlignH.id)} 
          alignmentBaseline="middle"
          style={getTextStyle(props.item)}
        >
          {props.item.text}
        </text>
      </svg>
    </div>
  );
}


export default Text;