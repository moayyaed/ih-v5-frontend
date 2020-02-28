import React from 'react';

import 'react-base-table/styles.css'

import { ContextMenu } from "@blueprintjs/core";
import BaseTable, { AutoResizer, Column } from 'react-base-table'

import Menu from 'components/Menu';

import components from './components';

const styles = {
  rowBasic: {

  },
  rowRemove: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(244, 67, 54, 0.5)',
  }
}


function handleContextMenuBody(e) {
  e.preventDefault();
  e.stopPropagation();

  ContextMenu.show(
    null, 
    { left: e.clientX, top: e.clientY }
  );
}

function handleContextMenuRow(props, { event, rowData }) {
  event.preventDefault();
  event.stopPropagation();
  
  const pos = { left: event.clientX, top: event.clientY };

  const scheme = {
    main: [
      { id: 'add', title: 'Add' },
      { id: 'delete', title: 'Delete', click: () => handleRowDelete(props, rowData)  }
    ]
  }

  ContextMenu.show(<Menu scheme={scheme} />, pos);
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

  function Row({ key, index, children, rowid, ...rest }) {
    return (
      <div key={key} index={index} {...rest}>
        <div style={props.cache.remove && props.cache.remove[rowid] ? styles.rowRemove : styles.rowBasic}/>
        {children}
      </div>
    )
  }

  function rowProps(props) {
    return {
      tagName: Row,
      rowid: props.rowData.id,
      index: props.rowIndex,
    }
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
            rowProps={rowProps}
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
