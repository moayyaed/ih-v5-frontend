import React, { PureComponent } from 'react';

import 'react-base-table/styles.css'

import { ContextMenu } from "@blueprintjs/core";
import BaseTable, { AutoResizer, Column } from 'react-base-table';

import shortid from 'shortid';
import Menu from 'components/Menu';

import SortableHeader from './Header';
import { getDefault, arrayMove, createColumns, saveColumns } from './tools';

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

function getValue(type, data) {
  switch(type) {
    case 'cb':
      return data === undefined ? '' : data ? 'true' : 'false';
    case 'number':
      return data || '';
    case 'input':
      return data || '';
    case 'link':
      return data.title || '';
    case 'droplist':
      return data.title || '';
    case 'smartbutton':
      return data.title || '';
    case 'smartbutton2':
      return data.title || '';
    case 'color':
      return data || '';
    default:
      return data || '';
  }
}


class Table extends PureComponent {

  state = {
    columns: createColumns(this.props.options.prop, this.props.options.columns),
    filters: {},
    data: this.props.data,
  }

  componentDidMount() {
    this.check = {};
  }

  componentWillUnmount() {
    this.check = null;
  }

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

    if (this.props.options.popupenable) {
      const pos = { left: event.clientX, top: event.clientY };
      const scheme = {
        main: [
          { id: 'add', title: 'Add', click: this.handleRowAdd },
        ]
      }
    
      ContextMenu.show(<Menu scheme={scheme} />, pos);
    }
  }

  handleContextMenuRow = ({ event, rowData }) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.options.popupenable) {
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
  }

  handleFilter = (column, selects) => {
    console.log(column.type, column.prop, selects);
    const data = this.props.data
      .reduce((p, c) => {
        if (selects === null) {
          return p.concat(c); 
        }
        if (selects[getValue(column.type, c[column.prop])] !== undefined) {
          return p.concat(c); 
        }
        return p;
      }, []);
    this.setState({ data: data });
  
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

  headerRenderer = ({ cells, columns }) => {
    return (
      <SortableHeader
        useDragHandle
        axis="x"
        lockAxis="x"
        cells={cells}
        columns={columns}
        helperClass='sortableHelper'
        onSortEnd={this.onSortEnd}
        data={this.props.data}
        onFilter={this.handleFilter}
      />
    );
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      columns: arrayMove(this.state.columns, oldIndex, newIndex),
    }, () => {
      saveColumns(this.props.options.prop, this.state.columns)
    });
  }

  handleColumnResizeEnd = ({ column, width }) => {
    const temp = this.state.columns.map(i => {
      if (i.prop === column.prop) {
        return column;
      }
      return i;
    });
    saveColumns(this.props.options.prop, temp)
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
              data={this.state.data}
              options={this.props.options}
              onChange={this.props.onChange}
              rowProps={this.rowProps}
              rowEventHandlers={{ onContextMenu: this.handleContextMenuRow }}
              components={components}
              route={this.props.route}
              headerRenderer={this.headerRenderer}
              onColumnResizeEnd={this.handleColumnResizeEnd}
            >
              {this.state.columns.map(i => 
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
