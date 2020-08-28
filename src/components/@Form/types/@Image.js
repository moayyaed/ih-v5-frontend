import React from 'react';
import core from 'core';


const styles = {
  root: {
  
  },
  img: {
    width: 120,
    height: 120,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
}


function Images(props) {
  return (
    <div style={{ backgroundImage: `url(/images/${encodeURI(props.data)})`, ...styles.img }} />
  )
}


export default React.memo(Images);