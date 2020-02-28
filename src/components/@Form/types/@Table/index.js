import React, { Component } from 'react';

import 'react-base-table/styles.css'

import { ContextMenu } from "@blueprintjs/core";
import BaseTable, { AutoResizer, Column } from 'react-base-table';

import shortid from 'shortid';
import Menu from 'components/Menu';

import components from './components';


const styles = {
  root: {
    width: '100%', 
    height: '100%',
  },
  rowBasic: {

  },
  rowRemove: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(244, 67, 54, 0.5)',
  }
}


function getDefault(type) {
  switch(type) {
    case 'number':
      return 0;
    case 'input':
      return '';
    case 'link':
      return '';
    case 'droplist':
      return { id: '-', title: '-' };
    default:
      return '';
  }
}


class Table extends Component {

  handleRowAdd = () => {
    const { id, options } = this.props;
    const row = options.columns
      .reduce((p, c) => {
        return { ...p, [c.prop]: getDefault(c.type) }
      }, { id: '__' + shortid.generate() });

    this.props.onChange(id, options, { op: 'add', row })
  }

  handleRowDelete = (row) => {
    const { id, options } = this.props;
    this.props.onChange(id, options, { op: 'delete', row })
  }

  handleContextMenuBody = (event) => {
    event.preventDefault();
    event.stopPropagation();
  
    const pos = { left: event.clientX, top: event.clientY };
    const scheme = {
      main: [
        { id: 'add', title: 'Add', click: this.handleRowAdd },
      ]
    }
  
    ContextMenu.show(<Menu scheme={scheme} />, pos);
  }

  handleContextMenuRow = ({ event, rowData }) => {
    event.preventDefault();
    event.stopPropagation();

    const { cache } = this.props;
    const pos = { left: event.clientX, top: event.clientY };
    const deleteTitle = cache && cache.remove && cache.remove[rowData.id] ? 
    'Undelete' : 'Delete';

    const scheme = {
      main: [
        { id: 'add', title: 'Add', click: this.handleRowAdd },
        { id: 'delete', title: deleteTitle, click: () => this.handleRowDelete(rowData)  }
      ]
    }

    ContextMenu.show(<Menu scheme={scheme} />, pos);
  }

  renderRow = ({ key, index, children, rowid, ...rest }) => {
    return (
      <div key={key} index={index} {...rest}>
        <div style={this.props.cache.remove && this.props.cache.remove[rowid] ? styles.rowRemove : styles.rowBasic}/>
        {children}
      </div>
    )
  }

  rowProps = (props) => {
    return {
      tagName: this.renderRow,
      rowid: props.rowData.id,
      index: props.rowIndex,
    }
  }

  render() {
    return (
      <div style={styles.root} onContextMenu={this.handleContextMenuBody}>
        <AutoResizer>
          {({ width, height }) => (
            <BaseTable
              fixed
              id={this.props.id}
              rowHeight={35}
              width={width}
              height={height}
              data={this.props.data}
              options={this.props.options}
              onChange={this.props.onChange}
              rowProps={this.rowProps}
              rowEventHandlers={{ onContextMenu: this.handleContextMenuRow }}
              components={components}
            >
              {this.props.options.columns.map(i => 
                <Column 
                  {...i}
                  resizable 
                  key={i.prop} 
                  dataKey={i.prop}
                  width={i.width || 150}
                  cache={this.props.cache}
                />
              )}
            </BaseTable>
          )}
        </AutoResizer>
      </div>
    )
  }
}



export default Table;
