import React from 'react';

import BaseTable, { AutoResizer, Column } from 'react-base-table'
import 'react-base-table/styles.css'


import components from './components';


function Table(props) {
  return (
    <AutoResizer>
      {({ width, height }) => (
        <BaseTable
          fixed
          id={props.id}
          rowHeight={35}
          width={width}
          height={height}
          rowProps={props.error}
          data={props.data}
          options={props.options}
          onChange={props.onChange}
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
