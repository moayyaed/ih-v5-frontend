import React from 'react';

import BaseTable, { AutoResizer, Column } from 'react-base-table'
import 'react-base-table/styles.css'


import components from './components';


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
          data={transformData(props.data)}
          components={components}
        >
          {props.options.columns.map(i => 
            <Column 
              {...i}
              resizable 
              key={i.prop} 
              dataKey={i.prop}
              width={i.width || 150}
            />
          )}
        </BaseTable>
      )}
    </AutoResizer>
  )
}


export default Table;
