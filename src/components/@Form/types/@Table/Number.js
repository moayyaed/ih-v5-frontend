import React from 'react';


const styles = {
  disabled: {
    display: 'none', 
    cursor: 'no-drop',
  },
  normal: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 'unset', 
    height: 28,
    textAlign: 'right',
  },
}


function TableNumberComponent(props) {
  return (
    <input 
      type="number"
      style={props.cellData === undefined ? styles.disabled : styles.normal} 
      disabled={props.cellData === undefined} 
      defaultValue={props.cellData} 
    />
  )
}


export default TableNumberComponent; 