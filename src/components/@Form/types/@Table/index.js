import React from 'react';

import { ContextMenu } from "@blueprintjs/core";
import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

import BaseTable, { AutoResizer, Column } from 'react-base-table'
import 'react-base-table/styles.css'


import components from './components';


function handleContextMenuBody(e) {
  e.preventDefault();
  e.stopPropagation();

  ContextMenu.show(
    <Menu className={Classes.ELEVATION_1}>
      <MenuItem text="Add" />
      <MenuItem disabled text="Delete" />
    </Menu>, 
    { left: e.clientX, top: e.clientY }
  );
}

function handleContextMenuRow(props, { event, rowData }) {
  event.preventDefault();
  event.stopPropagation();

  ContextMenu.show(
    <Menu className={Classes.ELEVATION_1}>
      <MenuItem text="Add" onClick={handleRowAdd} />
      <MenuItem text="Delete" onClick={() => handleRowDelete(props, rowData)} />
    </Menu>, 
    { left: event.clientX, top: event.clientY }
  );
}

function handleRowAdd() {

}

function handleRowDelete(props, row) {
  const id = props.id;
  const options = props.options;

  props.onChange(id, options, { op: 'delete', row })
}




function Table(props) {
  
  const rowEventHandlers = {
    onContextMenu: _handleContextMenuRow,
  }

  function _handleContextMenuRow(data) {
    handleContextMenuRow(props, data);
  }

  return (
    <div style={{ width: '100%', height: '100%' }} onContextMenu={handleContextMenuBody}>
      <AutoResizer>
        {({ width, height }) => (
          <BaseTable
            fixed
            id={props.id}
            rowHeight={35}
            width={width}
            height={height}
            data={props.data}
            options={props.options}
            onChange={props.onChange}
            rowEventHandlers={rowEventHandlers}
            components={components}
          >
            {props.options.columns.map(i => 
              <Column 
                {...i}
                resizable 
                key={i.prop} 
                dataKey={i.prop}
                width={i.width || 150}
                cache={props.cache}
              />
            )}
          </BaseTable>
        )}
      </AutoResizer>
    </div>
  )
}


export default Table;
