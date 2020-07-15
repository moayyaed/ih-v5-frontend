import React from 'react';


const styles = {
  span: {
    whiteSpace: 'pre',
    display: 'inline-block',
  }
}

function getTextStyle(params) {
  return {
    fill: params.textColor,
    font: `${params.textItalic ? 'italic': ''} ${params.textBold ? 'bold' : ''} ${params.textSize}px ${params.textFontFamily.id}`
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
      return size / 2 + 'px';
    case 'flex-end':
      return (h - (b * 2)) - (size / 2) + 'px';
    default:
      return '50%';
  }
}

function pos(v, type, b) {
  switch(type) {
    case 'flex-start':
      return 0
    case 'flex-end':
      return v - (b * 2);
    default:
      return (v - (b * 2)) / 2;
  }
}

function Text(props) {
  return (
    <div
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize}px ${props.item.borderStyle.id} ${props.item.borderColor}`,
        borderRadius: (Math.min(props.item.w, props.item.h) / 2 / 100) * props.item.borderRadius,
        opacity: props.item.opacity / 100,
        boxShadow: props.item.boxShadow.value,
      }}
      >
      <svg 
        style={{
          display: 'flex',
          width: '100%', 
          height: '100%', 
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <text
          transform={`rotate(${props.item.textRotate} ${pos(props.item.w, props.item.textAlignH.id, props.item.borderSize)} ${pos(props.item.h, props.item.textAlignV.id,  props.item.borderSize)})`}
          x={getX(props.item.textAlignH.id)} 
          y={getY(props.item.textAlignV.id, props.item.textSize, props.item.h, props.item.borderSize)} 
          textAnchor={getTextAnchor(props.item.textAlignH.id)} 
          alignmentBaseline="middle"
          style={getTextStyle(props.item)}
        >
          {props.item.text.value}
        </text>
      </svg>
    </div>
  );
}


export default Text;