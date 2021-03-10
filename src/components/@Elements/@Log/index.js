import React, { Component } from 'react';
import { sortableContainer, sortableElement, sortableHandle, } from 'react-sortable-hoc';

import BaseTable, { AutoResizer, Column } from 'react-base-table';
import { transform } from '../tools';

import { 
  LoadingLayer, 
  LoadingMoreLayer, 
  LoadingMoreText, 
  Loader, 
  Empty,
} from './elements';

import 'react-base-table/styles.css';

const styles = {
  headerContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
  },
  columnContainer: {
    display: 'flex',
  },
  dragHandle: {
    position: 'absolute',
    zIndex: 1000,
    height: '100%',
    width: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

const DragHandle = sortableHandle(() => 
  <span className="BaseTable__header-handle" style={styles.dragHandle}>::</span>);

const SortableHeader = sortableElement(({children }) => {
  return (
    <div style={styles.columnContainer}>
      <DragHandle />
      {React.cloneElement(children)}
    </div>
  )
});

const SortableHeaderRowRenderer = sortableContainer(
  ({ cells, columns }) => {
    return (
      <div style={styles.headerContainer}>
        {React.Children.map(cells, (column, index) => 
          <SortableHeader index={index}>
            {column}
          </SortableHeader>
        )}
      </div>
    )
  }
);

const arrayMoveMutate = (array, from, to) => {
	const startIndex = from < 0 ? array.length + from : from;

	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = to < 0 ? array.length + to : to;

		const [item] = array.splice(from, 1);
		array.splice(endIndex, 0, item);
	}
};

const arrayMove = (array, from, to) => {
	array = [...array];
	arrayMoveMutate(array, from, to);
	return array;
};

const columns = [
  { prop: 'id', width: 200 },
  { prop: 'title', width: 200 },
  { prop: 'value1', width: 200 },
  { prop: 'value2', width: 200 },
];

const data = new Array(1000)
  .fill(0)
  .map((i, k) => ({ id: k, title: 'row'+k, value1: k, value2: '_'+k }))


class Log extends Component {

  state = { columns: columns, data: [], loading: true, loadingMore: false, loadedAll: false }

  componentDidMount() {
    this.loadData();
  }


  loadData = () => {
    setTimeout(() => {
      this.setState({
        data: data.slice(0, 100),
        loading: false,
        loadedAll: false,
      })
    }, 250);
  }

  loadMore = () => {
    this.setState({ loadingMore: true })

    setTimeout(() => {
      const temp = data.slice(this.state.data.length, this.state.data.length + 100);
    
      this.setState({
        data: this.state.data.concat(temp),
        loadingMore: false,
        loadedAll: temp.length === 0,
      })
    }, 250)
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
      return (
        <LoadingMoreLayer>
          <LoadingMoreText>Loading More</LoadingMoreText>
          <Loader small />
        </LoadingMoreLayer>
      )
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

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      columns: arrayMove(this.state.columns, oldIndex, newIndex),
    });
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
        >
          {this.state.columns.map(i => 
            <Column
              resizable 
              key={i.prop} 
              title={i.prop}
              dataKey={i.prop}
              width={i.width || 150}
            />
          )}
        </BaseTable>
      </div>
    );
  }
}


export default Log;