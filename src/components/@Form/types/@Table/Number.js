import React from 'react';


const styles = {
  disabled: {
    display: 'none', 
    cursor: 'no-drop',
  },
  normal: {
    fontSize: 13,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 'unset', 
    height: 28,
    textAlign: 'right',
  },
}

function handleChange(e, props) {
  const id = props.container.props.id;
  const options = props.container.props.options;
  const column = props.column;
  const row = props.rowData;
  
  props.container.props.onChange(id, options, { op: 'edit', column, row }, e.target.value)
}



function TableNumberComponent(props) {
  return (
    <input 
      type="number"
      style={props.cellData === undefined ? styles.disabled : styles.normal} 
      disabled={props.cellData === undefined} 
      value={props.cellData} 
      onChange={e => handleChange(e, props)} 
    />
  )
}


export default TableNumberComponent; 