import React from 'react';

const styles = {
  active: {
    position: 'absolute', 
    width: '100%', 
    height: '100%', 
    border: '1px solid #F44336',
    background: 'repeating-linear-gradient(45deg, rgba(239, 83, 80, 0.2), rgba(239, 83, 80, 0.2) 10px, rgba(239, 154, 154, 0.2) 10px, rgba(239, 154, 154, 0.2) 20px)',
    opacity: 0.7
  },
  admin: {
    width: '100%', 
    height: '100%', 
  },
  user: {
    background: 'red',
    width: '100%', 
    height: '100%', 
  }
}


function Action(props) {
  if (props.mode === 'user') {
    return (
      <div style={styles.user} />
    )
  }
  if (props.mode === 'admin') {
    return (
      <div style={styles.admin} />
    )
  }
  return <div style={styles.active} />
}


export default Action;