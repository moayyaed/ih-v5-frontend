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
    if (id && id !== '__alertjournal') {
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
      {
        title: "Время начала",
        prop: "tsStartStr",
        width: 200
    },
    {
        title: "Сообщение",
        prop: "txt",
        width: 200
    },
    {
        title: "Время завершения",
        prop: "tsStopStr",
        width: 200
    },
    {
        title: "Квитировать",
        prop: "rowbutton",
        width: 200
    },
    {
        title: "Время квитирования",
        prop: "tsAckStr",
        width: 200
    },
    {
        title: "Оператор",
        prop: "username",
        width: 200
    }
    ],
    data: [
    ],
    loading: false, 
    loadingMore: false, 
    loadedAll: true 
  }
}

function colorOpacity(str) {
  if (str) {
    const temp = str.slice(5, str.length - 1).split(',');
    if (temp.length === 4) {
      temp[3] = '0.16';
      return 'rgba(' + temp.join(',') + ')';
    }
    return str;
  }
  return 'unset';
}

function getColor(colors, row) {
  if (colors) {
    if (row.state) {
      return colors[row.level];
    }
    return colorOpacity(colors[row.level]);
  }
  return 'unset';
}

function getColor2(colors, row) {
  if (colors) {
    return colors[row.level] || 'unset';
  }
  return 'unset';
}

class AlertLog extends Component {

  state = getInitState(this.props.mode, this.props.item)

  componentDidMount() {
    if (this.props.mode === 'user') {
      const item = this.props.item;
      const id = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;
      if (id && id !== '__alertjournal') {
        core.transfer.sub('realtime_alert', this.realtimeAlert);
        this.loadData();
      }
    }
  }

  componentWillUnmount() {
    core.transfer.unsub('realtime_alert', this.realtimeAlert);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mode === 'user' && nextProps.item.widgetlinks.link.id !== this.props.item.widgetlinks.link.id) {
        const item = nextProps.item;
        const id = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;
        if (id) {
          this.setState({
            columns: createColumns(id, item.data.columns),
            data: [],
            loading: true, 
            loadingMore: false, 
            loadedAll: true 
           });
           this.loadData(nextProps);
        }
    }
  }

  realtimeAlert = (data) => {
    const item = this.props.item;
    const id = item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id;
    
    if (id && data[id]) {
      if (data[id].op === 'add') {
        this.setState({ data: data[id].payload.concat(this.state.data) })
      }

      if (data[id].op === 'update') {
       const temp = data[id].payload.reduce((p, c) => ({ ...p, [c.id]: c }),{})
       this.setState({ 
         data: this.state.data
          .map(i => {
            if (temp[i.id]) {
               return { ...i, ...temp[i.id] };
            }
            return i;
          }) 
        });
      }

      if (data[id].op === 'delete') {
        const temp = data[id].payload.reduce((p, c) => ({ ...p, [c.id]: c }),{})
        this.setState({ 
          data: this.state.data
           .filter(i => {
             if (temp[i.id]) {
                return false
             }
             return true;
           }) 
         });
       }
    }
  }


  loadData = (props = this.props) => {
    const item = props.item;
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
    return <Empty>{core.cache.lang === 'ru' ? 'Нет данных' : 'Table is empty'}</Empty>
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
    const colors = this.props.item.data.color;
    const fontcolor = this.props.item.data.fontcolor;
    
    return (
      <div key={key} index={index} {...rest} style={{ ...rest.style, background: getColor(colors, row), color: getColor2(fontcolor, row) }} >
        {children}
      </div>
    )
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
        <BaseTable
          fixed
          rowHeight={35}
          width={props.item.w.value * (props.scale || props.rw || 1) - (props.item.borderSize.value * 2 * (props.scale || 1))}
          height={props.item.h.value * (props.scale || props.rh || 1) - (props.item.borderSize.value * 2 * (props.scale || 1))}
          data={this.state.data}
          options={this.props.item.data}
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


