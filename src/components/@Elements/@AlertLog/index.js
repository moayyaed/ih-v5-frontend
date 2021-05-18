import React, { Component } from 'react';
import core from 'core';

import BaseTable, { Column } from 'react-base-table';

import { transform } from '../tools';
import { arrayMove, createColumns, saveColumns } from './tools';

import { 
  LoadingLayer, 
  LoadingMoreLayer, 
  LoadingMoreText, 
  Loader, 
  Empty,
  SortableHeaderRowRenderer,
} from './elements';

import components from './components';

import 'react-base-table/styles.css'

function getInitState(mode, item) {
  const id = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;
  if (mode === 'user') {
    if (id) {
      return {
        columns: createColumns(id, item.data.columns),
        data: [],
        loading: true, 
        loadingMore: false, 
        loadedAll: true 
      }
    }
    return {
      columns: [],
      data: [],
      loading: false, 
      loadingMore: false, 
      loadedAll: true 
    }
  }
  return {
    columns: [
      { title: 'Дата', prop: 'date', width: 150 },
      { title: 'Тип', prop: 'type', width: 200 },
      { title: 'Сообщение', prop: 'mes', width: 450 }
    ],
    data: [
      { date: '31.12.2020 23:59:57', type: 'Информирование', mes: 'Значение: 0' },
      { date: '31.12.2020 23:59:58', type: 'Информирование', mes: 'Значение: 1' },
      { date: '31.12.2020 23:59:59', type: 'Информирование', mes: 'Значение: 2' }
    ],
    loading: false, 
    loadingMore: false, 
    loadedAll: true 
  }
}

function colorOpacity(str) {
  const temp = str.slice(5, str.length - 1).split(',');
  if (temp.length === 4) {
    temp[3] = '0.16';
    return 'rgba(' + temp.join(',') + ')';
  }
  return str;
}

function getColor(colors, row) {
  if (row.state) {
    return colors[row.level];
  }
  return colorOpacity(colors[row.level]);
}


class AlertLog extends Component {

  state = getInitState(this.props.mode, this.props.item)

  componentDidMount() {
    if (this.props.mode === 'user') {
      const item = this.props.item;
      const id = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;
      if (id) {
        this.loadData();
      }
    }
  }


  loadData = () => {
    const item = this.props.item;
    const id = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;
    const params = {
      type: 'alertlog',
      id,
    }
    
    core
      .request({ method: 'alertlog', params })
      .ok(data => this.setState({ data: data, loading: false, loadedAll: true }));
  }

  loadMore = () => {
    this.setState({ loadingMore: true })
    const item = this.props.item;
    const id = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;
    const params = {
      type: 'journal',
      id,
      count: Math.round((item.h.value - (item.borderSize.value * 2)) / 35 * 2),
      rowid: this.state.data[this.state.data.length - 1].id,
    }
    core
      .request({ method: 'journal', params })
      .ok(data => this.setState({ 
        data: this.state.data.concat(data), 
        loadingMore: false, 
        loadedAll: data.length === 0,
      }));
  }

  handleEndReached = (params) => {
    const { loading, loadingMore, loadedAll } = this.state;
    const check = loading || loadingMore || loadedAll;
    if (!check) {
      this.loadMore();
    }
  }

  renderOverlay = () => {
    const { loading, loadingMore } = this.state

    if (loadingMore) {
      /*
      return (
        <LoadingMoreLayer>
          <LoadingMoreText>Loading More</LoadingMoreText>
          <Loader small />
        </LoadingMoreLayer>
      )
      */
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
    return <Empty>No data available</Empty>
  }

  headerRenderer = ({ cells, columns }) => {
    return (
      <SortableHeaderRowRenderer
        useDragHandle
        axis="x"
        lockAxis="x"
        cells={cells}
        columns={columns}
        helperClass='sortableHelper'
        onSortEnd={this.onSortEnd}
      />
    );
  }

  handleColumnResizeEnd = ({ column, width }) => {
    const item = this.props.item;
    const id = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;
    const temp = this.state.columns.map(i => {
      if (i.prop === column.dataKey) {
        return { ...i, width };
      }
      return i;
    });
    this.setState({ columns: temp });
    if (id) {
      saveColumns(id, temp)
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    const item = this.props.item;
    const columns = arrayMove(this.state.columns, oldIndex, newIndex);
    const id = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;

    this.setState({ columns: columns });
    
    if (id) {
      saveColumns(id, columns)
    }
  }

  rowProps = (props) => {
    return {
      tagName: this.renderRow,
      rowid: props.rowData.id,
      index: props.rowIndex,
    }
  }

  renderRow = ({ key, index, children, rowid, ...rest }) => {
    const row = this.state.data[index];
    const colors = this.props.item.data.levelcolor;

    return (
      <div key={key} index={index} {...rest} style={{ ...rest.style, background: getColor(colors, row) }} >
        {children}
      </div>
    )
  }

  render(props = this.props) {
    return (
      <div 
        style={{
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          background: props.item.backgroundColor.value,
          border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
          borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
          opacity: props.item.opacity.value / 100,
          boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
          transform: transform(props.item),
          overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
          visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
        }}
      >
        <BaseTable
          fixed
          rowHeight={35}
          width={props.item.w.value - (props.item.borderSize.value * 2)}
          height={props.item.h.value - (props.item.borderSize.value * 2)}
          data={this.state.data}
          disabled={this.state.loading}
          loadingMore={this.state.loadingMore}
          onEndReached={this.handleEndReached}
          overlayRenderer={this.renderOverlay}
          emptyRenderer={this.renderEmpty}
          headerRenderer={this.headerRenderer}
          onColumnResizeEnd={this.handleColumnResizeEnd}
          rowProps={this.rowProps}
          components={components}
        >
          {this.state.columns.map(i => 
            <Column
              resizable 
              key={i.prop} 
              title={i.title}
              dataKey={i.prop}
              width={i.width || 150}
            />
          )}
        </BaseTable>
      </div>
    );
  }
}


export default AlertLog;


