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
        border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: `scale(${props.item.flipH.value ? -1 : 1}, ${props.item.flipV.value ? -1 : 1}) rotate(${props.item.rotate.value}deg)`,
      }}
    >
      <div
        style={{
          ...styles.img,
          backgroundImage: `url(${props.item.img.value})`,
          transform: `scale(${scale(props.item.imgSize.value)}) rotate(${props.item.imgRotate.value}deg)`,
        }}
      />
    </div>
  );
}


export default Image;