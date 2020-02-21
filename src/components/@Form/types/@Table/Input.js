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

function handleChange(e, props) {
  const id = props.container.props.id;
  const options = props.container.props.options;
  const column = props.column;
  const row = props.rowData;

  props.container.props.onChange(id, options, { op: 'edit', column, row }, e.target.value)
}


function TableInputComponent(props) {

  return (
    <input 
      style={styles.input} 
      value={props.cellData} 
      onChange={e => handleChange(e, props)} 
    />
  )
}


export default TableInputComponent; 