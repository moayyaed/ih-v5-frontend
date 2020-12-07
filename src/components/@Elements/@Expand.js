import React from 'react';


const styles = {
  active: {
    position: 'absolute', 
    width: '100%', 
    height: '100%',
    borderTop: '4px dashed rgb(54, 67, 244)',
    cursor: 'ns-resize',
    // border: '1px solid #3643f4',
    // background: 'repeating-linear-gradient(45deg, rgba(80, 83, 239, 0.2), rgba(80, 83, 239, 0.2) 10px, rgba(154, 154, 239, 0.2) 10px, rgba(154, 154, 239, 0.2) 20px)',
    opacity: 0.7
  },
  user: {
    width: '100%', 
    height: '100%',
  }
}


function Expand(props) {
  if (props.mode === 'admin' || props.mode === 'user') {
    return <div style={styles.user} />
  }
  return <div style={styles.active} />
}


export default Expand;