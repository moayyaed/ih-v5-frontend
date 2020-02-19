import React from 'react';
import BaseTable, { AutoResizer, Column } from 'react-base-table'
import 'react-base-table/styles.css'



const styles = {
  root: {
    margin: 12,
  }
}

function transformColumns(columns) {
  return columns.map(i => {
    return { ...i, key: i.prop, dataKey: i.prop, width: 150 };
  });
}

function transformData(data) {
  return data.map((i, k)=> {
    return { ...i, id: k.toString() };
  });
}


function Table(props) {
  console.log()
  return (
    <AutoResizer>
      {({ width, height }) => (
        <BaseTable
          fixed
          width={width}
          height={height}
          columns={transformColumns(props.options.columns)} 
          data={transformData(props.data)}  
        />
      )}
    </AutoResizer>
  )
}


export default Table;
