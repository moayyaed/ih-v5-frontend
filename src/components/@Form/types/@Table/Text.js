import React from 'react';


const styles = {
  text: {
    fontSize: 13,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.87)',
  }
}


function TableTextComponent(props) {
  return (
    <div style={styles.text} className={props.className}>{props.cellData}</div>
  )
}


export default TableTextComponent; 