import React from 'react';
import { transform } from './tools';


const styles = {
  span: {
    whiteSpace: 'pre',
    display: 'inline-block',
  }
}

function getTextStyle(params, scale) {
  return {
    fill: params.textColor.value,
    font: `${params.textItalic.value ? 'italic': ''} ${params.textBold.value ? 'bold' : ''} ${params.textSize.value * (scale || 1)}px ${params.textFontFamily.value.id}`
  };
}

function getTextAnchor(v) {
  switch(v) {
    case 'left':
    case 'flex-start':
      return 'start';
    case 'right':
    case 'flex-end':
      return 'end';
    default:
      return 'middle';
  }
}

function getX(v) {
  switch(v) {
    case 'left':
    case 'flex-start':
      return '0%';
    case 'right': 
    case 'flex-end':
      return '100%';
    default:
      return '50%';
  }
}

function getY(v, size, h, b) {
  const height = (h - (b * 2));
  switch(v) {
    case 'top':
    case 'flex-start':
      return size / 2 + 'px';
    case 'bottom':
    case 'flex-end':
      return height - (size / 3.5) + 'px';
    default:
      return '50%';
  }
}

function pos(v, type, b) {
  switch(type) {
    case 'top':
    case 'left':
    case 'flex-start':
      return 0
    case 'bottom':
    case 'right': 
    case 'flex-end':
      return v - (b * 2);
    default:
      return (v - (b * 2)) / 2;
  }
}

function Text(props) {
  const w = props.item.w.value // * (props.scaleW || 1);
  const h = props.item.h.value // * (props.scaleH || 1);
  return (
    <div
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value * (props.scale || 1)}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(w, h) / 2 / 100) * props.item.borderRadius.value * (props.scale || 1),
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: transform(props.item),
        // animation: props.item.animation.active ? props.item.animation.value : 'unset',
        overflow: props.item.overflow ? 'hidden' : 'unset',
        visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
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
          transform={`rotate(${props.item.textRotate.value} ${pos(w, props.item.textAlignH.value.id, props.item.borderSize.value)} ${pos(h, props.item.textAlignV.value.id,  props.item.borderSize.value)})`}
          x={getX(props.item.textAlignH.value.id)} 
          y={getY(props.item.textAlignV.value.id, props.item.textSize.value * (props.scale || 1), h, props.item.borderSize.value)} 
          textAnchor={getTextAnchor(props.item.textAlignH.value.id)} 
          alignmentBaseline="middle"
          style={getTextStyle(props.item, props.scale)}
        >
          {props.item.text.value}
        </text>
      </svg>
    </div>
  );
}


export default Text;