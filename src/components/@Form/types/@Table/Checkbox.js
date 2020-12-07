import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    padding: 0,
  }
}


function handleChange(e, props) {
  const id = props.container.props.id;
  const options = props.container.props.options;
  const column = props.column;
  const row = props.rowData;

  props.container.props.onChange(id, options, { op: 'edit', column, row }, Number(e.target.checked))
}


function TableCheckboxComponent(props) {
  return (
    <div style={styles.root}>
      <Checkbox 
        color="primary"
        style={styles.checkbox}
        checked={Boolean(props.cellData)}
        onChange={e => handleChange(e, props)} 
      />
    </div>
  )
}


export default TableCheckboxComponent; 