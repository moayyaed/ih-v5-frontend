import React, { Component } from 'react';
import core from 'core';

import BaseTable, { Column } from 'react-base-table';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

import SortableHeader from './Header';
import { transform } from '../tools';
import { arrayMove, createColumns, saveColumns } from './tools';

import PTSans from '../../../assets/PTSans.ttf'

import { 
  LoadingLayer, 
  LoadingMoreLayer, 
  LoadingMoreText, 
  Loader, 
  Empty,
  SortableHeaderRowRenderer,
} from './elements';

import moment from "moment";
import MomentUtils from "@date-io/moment";

import 'react-base-table/styles.css'
import "moment/locale/ru";


function getInitState(mode, item) {
  const date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const id = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;

  if (mode !== 'user') {
    return {
      start: new Date(y, m, 1),
      end: new Date(y, m + 1, 0),
      select: null,
      list: [],
      columns: [], // createColumns(id, item.data.columns)
      data: [],
      loading: true, 
      loadingMore: false, 
      loadedAll: false,
    }
  }
  return {
    start: new Date(y, m, 1),
    end: new Date(y, m + 1, 0),
    select: null,
    list: [],
    columns: createColumns('__test', [
      { title: 'Дата', prop: 'date', width: 150, filter: true },
      { title: 'Тип', prop: 'type', width: 200, filter: true },
      { title: 'Сообщение', prop: 'mes', width: 450, filter: true }
    ]),
    data: [
      { date: '31.12.2020 23:59:57', type: 'Информирование', mes: 'Значение: 0' },
      { date: '31.12.2020 23:59:58', type: 'Информирование', mes: 'Значение: 1' },
      { date: '31.12.2020 23:59:59', type: 'Информирование', mes: 'Значение: 2' }
    ],
    dataOrigin: [
      { date: '31.12.2020 23:59:57', type: 'Информирование', mes: 'Значение: 0' },
      { date: '31.12.2020 23:59:58', type: 'Информирование', mes: 'Значение: 1' },
      { date: '31.12.2020 23:59:59', type: 'Информирование', mes: 'Значение: 2' }
    ],
    filters: {},
    sort: null,
    loading: false, 
    loadingMore: false, 
    loadedAll: true 
  }
}

const styles = {
  toolbar: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fafafa',
  },
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbarRight: {
    marginRight: 6,
  },
  select: {
    width: 350,
    flexShrink: 0,
    marginLeft: 6,
  },
  text: {
    marginLeft: 8,
    marginRight: 8,
  },
  date: {
    width: 150,
    flexShrink: 0,
    margin: 0,
    marginLeft: 12,
  }
}

class Report extends Component {
  state = getInitState(this.props.mode, this.props.item);

  componentDidMount() {
    const list = this.props.item.actions2.filter(i => i && i.id);

    if (list.length) {
      this.setState({ list, select: list[0].id });
      this.loadData(list[0].id, this.state.start, this.state.end);
    } else {
      this.setState({ 
        loading: false, 
        loadingMore: false, 
        loadedAll: true   
      });
    }
  }

  loadData = (id, start, end) => {
    this.setState({
      select: id, 
      loading: true, 
      loadingMore: false, 
      loadedAll: true   
    });

    const params = { type: 'report', id }

    /*
    core
      .request({ method: 'report', params })
      .ok(data => {
        this.setState({ 
          loading: false, 
          loadingMore: false, 
          loadedAll: true   
        });
      });
    */

    setTimeout(() => {
      this.setState({ 
        loading: false, 
        loadingMore: false, 
        loadedAll: true   
      });
    }, 750)
  }

  handleChangeSelect = (e, id) => {
    if (this.state.loading === false) {
      this.setState({ select: e.target.value });
    }
  }

  handleDatePickerStart = (date) => {
    if (this.state.loading === false) {
      this.setState({ start: date.toDate() });
    }
  }

  handleDatePickerEnd = (date) => {
    if (this.state.loading === false) {
      this.setState({ end: date.toDate() });
    }
  }

  handleClickOK = () => {
    if (this.state.loading === false) {
      this.loadData(this.state.select, this.state.start, this.state.end);
    }
  }

  handleClickCSV = () => {
    alert('CSV!')
  }

  handleClickPDF = () => {
    const s = moment(this.state.start).format('DD/MM/yyyy');
    const e = moment(this.state.end).format('DD/MM/yyyy');

    const item = this.props.item.actions2.find(i => i.id === this.state.select);
    const head = this.state.columns.map(i => i.title);
    const body = [];

    this.state.data.forEach(row => {
      const temp = [];
      this.state.columns.forEach(i => {
        temp.push(row[i.prop] || '');
      });

      body.push(temp);
    });

    var doc = new jsPDF();
    var finalY = doc.lastAutoTable.finalY || 10

    doc.addFont(PTSans, "PTSans", "normal");
    doc.setFont("PTSans");
 
    doc.text(`${item.title}: ${s} - ${e}`, 14, finalY + 15)
    doc.autoTable({
      styles: { font: 'PTSans' },
      startY: finalY + 20,
      head: [head],
      body: body,
    })

    doc.save(`${item.title}: ${s} - ${e}`+ '.pdf')
  }

  renderOverlay = () => {
    const { loading, loadingMore } = this.state

    if (loadingMore) {
     return null;
    }
   
    if (loading) {
      return (
        <LoadingLayer>
          <Loader />
        </LoadingLayer>
      )
    }

    return null
  }

  renderEmpty = () => {
    if (this.state.loading) {
      return null;
    }
    return <Empty>{core.cache.lang === 'ru' ? 'Нет данных' : 'Table is empty'}</Empty>
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
    // saveColumns(this.props.options.prop, columns)
  }

  handleColumnResizeEnd = ({ column, width }) => {
    const temp = this.state.columns.map(i => {
      if (i.prop === column.dataKey) {
        return { ...i, width };
      }
      return i;
    });
    this.setState({ columns: temp });
    // saveColumns(this.props.options.prop, temp)
  }

  render(props = this.props) {
    return (
      <div 
        style={{
          pointerEvents: props.mode === 'user' ? 'all' : 'none',
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          background: props.item.backgroundColor.value,
          border: `${props.item.borderSize.value * (props.scale || 1)}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
          borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value * (props.scale || 1),
          opacity: props.item.opacity.value / 100,
          boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
          transform: transform(props.item),
          overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
          visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
        }}
      >
        <div style={styles.toolbar}>
          <div style={styles.toolbarLeft}>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={core.cache.lang === 'ru' ? 'ru' : 'en'}>
              <Select
                value={this.state.select}
                style={styles.select}
                disableUnderline
                fullWidth
                onChange={this.handleChangeSelect}
              >
                {this.state.list.map(i => <MenuItem key={i.id} value={i.id}>{i.title}</MenuItem>)}
              </Select>
              <div style={styles.text}>С</div>
              <KeyboardDatePicker
                style={styles.date}
                InputProps={{ disableUnderline: true }}
                disableToolbar
                variant="inline"
                format="DD/MM/yyyy"
                value={this.state.start}
                onChange={this.handleDatePickerStart}
              />
              <div style={styles.text}>По</div>
              <KeyboardDatePicker
                style={styles.date}
                InputProps={{ disableUnderline: true }}
                disableToolbar
                variant="inline"
                format="DD/MM/yyyy"
                value={this.state.end}
                onChange={this.handleDatePickerEnd}
              />
              <Button size="small" onClick={this.handleClickOK}>
                OK
              </Button>
            </MuiPickersUtilsProvider>
          </div>
          <div style={styles.toolbarRight}>
            <Button size="small" onClick={this.handleClickCSV}>
              CSV
            </Button>
            <Button size="small" onClick={this.handleClickPDF}>
              PDF
            </Button>
          </div>
        </div>
        <BaseTable
          fixed
          rowHeight={35}
          width={props.item.w.value * (props.scale || props.rw || 1) - (props.item.borderSize.value * 2 * (props.scale || 1))}
          height={props.item.h.value * (props.scale || props.rh || 1) - (props.item.borderSize.value * 2 * (props.scale || 1))}
          data={this.state.data}
          disabled={this.state.loading}
          loadingMore={this.state.loadingMore}
          onEndReached={this.handleEndReached}
          overlayRenderer={this.renderOverlay}
          emptyRenderer={this.renderEmpty}
          headerRenderer={this.headerRenderer}
          onColumnResizeEnd={this.handleColumnResizeEnd}
          rowProps={{ style: { color: 'blue' } }}
        >
          {this.state.columns.map(i => 
            <Column
              {...i}
              resizable 
              key={i.prop} 
              title={i.title}
              dataKey={i.prop}
              width={i.width || 150}
              headerRenderer={this.headerRendererColumn}
            />
          )}
        </BaseTable>
      </div>
    )
  }
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
    case 'button':
      return data.title || '';
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

export default Report;