import React from 'react';


const styles = {
  img: {
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
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

function Image(props) {
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
        boxShadow: props.item.boxShadow,
      }}
    >
      <div
        style={{
          ...styles.img,
          backgroundImage: `url(${props.item.img})`,
          transform: `scale(${scale(props.item.imgSize)}) rotate(${props.item.imgRotate}deg)`,
        }}
      />
    </div>
  );
}


export default Image;