import React from 'react';


const styles = {
  input: {
    fontSize: 13,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 'unset', 
    height: 28,
  },
}


function TableInputComponent(props) {
  console.log(props)
  return (
    <input 
      style={styles.input} 
      defaultValue={props.cellData} 
      onChange={e => console.log(props.container.props.id, props.column, e.target.value)} 
    />
  )
}


export default TableInputComponent; 