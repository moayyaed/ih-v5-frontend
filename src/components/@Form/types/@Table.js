import React from 'react';
import core from 'core';

import Link from '@material-ui/core/Link';

import BaseTable, { AutoResizer, Column } from 'react-base-table'
import 'react-base-table/styles.css'



const styles = {
  root: {
    margin: 12,
  },
  numberDisabled: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
    border: 'unset', 
    cursor: 'no-drop',
    width: '100%',
    height: 28,
    textAlign: 'right',
  },
  numberNormal: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 'unset', 
    height: 28,
    textAlign: 'right',
  },
  input: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 'unset', 
    height: 28,
  },
  text: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.87)',
  }
}

const sizes = [
  220,
  100,
  100,
  100,
  100,
  120,
  150,
  80,
  128
]

function transformColumns(columns) {
  return columns.map((i, k)=> {
    if (k === 6) {
      return { ...i, key: i.prop, dataKey: i.prop, width: 150, resizable: true, width: sizes[k], type: 'link' };
    }
    return { ...i, key: i.prop, dataKey: i.prop, width: 150, resizable: true, width: sizes[k] };
  });
}

function transformData(data) {
  return data.map((i, k)=> {
    return { ...i, id: k.toString() };
  });
}

function handleClickLink(e) {
  e.preventDefault();
  core.actions.appdialog.data({ open: true })
}


const Cell = cellProps => {
  const type = cellProps.columns[cellProps.columnIndex].type;
  
  if (type === 'link') {
    return (
      <Link href="" onClick={handleClickLink}>
        {cellProps.cellData}
      </Link>
    )
  }

  if (type === 'input') {
    return (
      <input style={styles.input} defaultValue={cellProps.cellData} />
    )
  }
  if (type === 'number') {
    return (
      <input 
        type="number"
        style={cellProps.cellData === undefined ? styles.numberDisabled : styles.numberNormal} 
        disabled={cellProps.cellData === undefined} 
        defaultValue={cellProps.cellData} 
      />
    )
  }
  return <div style={styles.text} className={cellProps.className}>{cellProps.cellData}</div>
}

const components = {
  TableCell: Cell,
}


function Table(props) {
  return (
    <AutoResizer>
      {({ width, height }) => (
        <BaseTable
          fixed
          rowHeight={35}
          width={width}
          height={height}
          columns={transformColumns(props.options.columns)} 
          data={transformData(props.data)}
          components={components}
        />
      )}
    </AutoResizer>
  )
}


export default Table;
