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
        backgroundColor: props.params.backgroundColor,
        border: `${props.params.borderSize}px solid ${props.params.borderColor}`, 
      }}
    >
      <div
        style={{
          ...styles.img,
          backgroundImage: `url(${props.params.img})`,
          transform: `scale(${scale(props.params.imgSize)}) rotate(${props.params.imgRotate}deg)`,
        }}
      />
    </div>
  );
}


export default Image;