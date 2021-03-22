import React, { PureComponent } from 'react';

import 'react-base-table/styles.css'

import { ContextMenu } from "@blueprintjs/core";
import BaseTable, { AutoResizer, Column } from 'react-base-table';

import shortid from 'shortid';
import Menu from 'components/Menu';

import Link from '@material-ui/core/Link';

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
  },
  link: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    lineHeight: 1.6,
    color: '#333',
    fontSize: 13,
    fontFamily: 'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    fontWeight: 700,
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

function sort(column, type, _a, _b) {
  let a, b;

  const valueA = getValue(column.type, _a[column.prop]);
  const valueB = getValue(column.type, _b[column.prop]);

  const valueNumberA = Number(valueA);
  const valueNumberB = Number(valueB);

  if (Number.isNaN(valueNumberA) === false && Number.isNaN(valueNumberB) === false ) {
    a = valueNumberA;
    b = valueNumberB;
  } else {
    a = valueA;
    b = valueB;
  }
  
  if (type === 1) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }

  if (type === 2) {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  }

  return 0;
}

function getFilterData(_columns, _filters, _data) {
  const columns = _columns.reduce((p, c) => ({ ...p, [c.prop]: c }), {});
  const filters = _filters;
  const filterList = Object.keys(filters)

  return _data
    .reduce((p, c) => {
      let check = true;
      filterList.forEach(key => {
        const filter = filters[key];
        if (filter) {
          const value = getValue(columns[key].type, c[columns[key].prop]);
          if (!filter[value]) {
            check = false;
          }
        }
      })

      if (check) {
        return p.concat(c); 
      }
      return p;
    }, []);
}


class Table extends PureComponent {

  state = {
    columns: createColumns(this.props.options.prop, this.props.options.columns),
    dataOrigin: this.props.data,
    data: this.props.data,
    filters: {},
    sort: null,
  }

  componentDidMount() {
    this.check = {};
  }

  componentWillUnmount() {
    this.check = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      const { columns, filters } = this.state;
      if (this.state.sort) {
        const _columns = this.state.columns.reduce((p, c) => ({ ...p, [c.prop]: c }), {});
        this.setState({
          dataOrigin: this.props.data,
          data: getFilterData(columns, filters, this.props.data)
            .sort((a, b) => sort(_columns[this.state.sort.column], 1, a, b)),
        })
      } else {
        this.setState({
          dataOrigin: this.props.data,
          data: getFilterData(columns, filters, this.props.data)
        })
      }
    }
  }

  handleRowAdd = () => {
    const { id, options } = this.props;
    const row = options.columns
      .reduce((p, c) => {
        return { ...p, [c.prop]: getDefault(c.type) }
      }, { id: '__' + shortid.generate() });
    this.props.onChange(id, options, { op: 'add', row })
    this.setState({
      dataOrigin: this.state.dataOrigin.concat(row),
      data: this.state.data.concat(row),
    })
  }

  handleRowDelete = (row) => {
    const { id, options } = this.props;
    this.props.onChange(id, options, { op: 'delete', row })
  }

  handleRowChange = (id, component, target, value) => {
    this.props.onChange(id, component, target, value)
    this.setState({
      dataOrigin: this.state.dataOrigin
        .map(i => i.id === target.row.id ? ({ ...i, [target.column.prop]: value }): i),
      data: this.state.data
        .map(i => i.id === target.row.id ? ({ ...i, [target.column.prop]: value }): i),
    })
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
    const columns = this.state.columns.reduce((p, c) => ({ ...p, [c.prop]: c }), {});
    const filters = { ...this.state.filters, [column.prop]: selects };
    const filterList = Object.keys(filters)

    const data = this.state.dataOrigin
      .reduce((p, c) => {
        let check = true;
        filterList.forEach(key => {
          const filter = filters[key];
          if (filter) {
            const value = getValue(columns[key].type, c[columns[key].prop]);
            if (!filter[value]) {
              check = false;
            }
          }
        })

        if (check) {
          return p.concat(c); 
        }
        return p;
      }, []);
    if (this.state.sort === null) {
      this.setState({ data, filters });
    } else {
      this.setState({ 
        data: data
          .sort((a, b) => sort(columns[this.state.sort.column], this.state.sort.type, a, b)), 
          filters 
      });
    }
  }

  handleSort = (column) => {
    const { columns, filters } = this.state;
    const data = this.state.dataOrigin;

    if (this.state.sort === null) {
      this.setState({ 
        sort: { column: column.prop, type: 1 },
        data: getFilterData(columns, filters, data).sort((a, b) => sort(column, 1, a, b)),
      })
    } else {
      if (this.state.sort.column === column.prop) {
        if (this.state.sort.type + 1 === 3) {
          this.setState({ sort: null, data: getFilterData(columns, filters, data) })
        } else {
          this.setState({ 
            sort: { column: column.prop, type: this.state.sort.type + 1 },
            data: getFilterData(columns, filters, data).sort((a, b) => sort(column, this.state.sort.type + 1, a, b)),
          })
        }
      } else {
        this.setState({ 
          sort: { column: column.prop, type: 1 }, 
          data: getFilterData(columns, filters, data).sort((a, b) => sort(column, 1, a, b)),
        })
      }
    }
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
        filters={this.state.filters}
        originData={this.state.dataOrigin}
        data={this.state.data}
        onFilter={this.handleFilter}
        onSortEnd={this.onSortEnd}
      />
    );
  }

  headerRendererColumn = ({ column }) => {
    // ↑↓
    if (this.state.sort && this.state.sort.column === column.prop) {
      return (
        <Link style={styles.link} href="#" component="button" onClick={() => this.handleSort(column)}>
          {(this.state.sort.type === 1 ? '↑ ': '↓ ') + column.title}
        </Link>
      );
    }
    
    return (
      <Link style={styles.link} href="#" component="button" onClick={() => this.handleSort(column)}>
        {column.title}
      </Link>
    );
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const columns = arrayMove(this.state.columns, oldIndex, newIndex);
    this.setState({ columns: columns });
    saveColumns(this.props.options.prop, columns)
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
              onChange={this.handleRowChange}
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
                  headerRenderer={this.headerRendererColumn}
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
