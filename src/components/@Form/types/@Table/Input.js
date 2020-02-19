import React from 'react';


const styles = {
  input: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 'unset', 
    height: 28,
  },
}


function TableInputComponent(props) {
  return (
    <input style={styles.input} defaultValue={props.cellData} />
  )
}


export default TableInputComponent; 