import React from 'react';


const styles = {
  span: {
    whiteSpace: 'pre',
    display: 'inline-block',
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
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

function scale(value) {
  switch (Math.sign(value)) {
    case 1:
      return (100 + value) / 100;
    case -1:
      return (100 + (value)) / 100;
    default:
      return 1;
  }
}

function Button(props) {
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
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: `scale(${props.item.flipH ? -1 : 1}, ${props.item.flipV ? -1 : 1}) rotate(${props.item.rotate}deg)`,
        transformOrigin: props.item.transformOrigin.id,
      }}
    >
      <div
        style={{
          ...styles.img,
          backgroundImage: `url(${props.item.img})`,
          transform: `scale(${scale(props.item.imgSize)}) rotate(${props.item.imgRotate}deg)`,
        }}
      />
      <svg 
        style={{
          position: 'absolute', 
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


export default Button;