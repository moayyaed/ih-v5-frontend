import React from 'react';

import BaseTable, { AutoResizer, Column } from 'react-base-table'
import 'react-base-table/styles.css'


import components from './components';


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
