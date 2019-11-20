import React, { Component } from 'react';

import clsx from 'clsx';

import { ScrollSync, AutoSizer } from 'react-virtualized';
import Draggable from 'react-draggable';

import Skeleton from '@material-ui/lab/Skeleton';

import Headers from './Headers';
import Cells from './Cells';

import css from './main.module.css';

const MIN_WIDTH_COLUMN = 75;

class Grid extends Component {

  state = { hover: null }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    e.preventDefault();
    e.stopPropagation();

    

    if (e.keyCode === 38) {
      if (this.props.selects.lastIndex !== null) {
        index = this.props.selects.lastIndex - 1;
      } else {
        if (this.props.selects.scrollToIndex !== undefined) {
          index = this.props.selects.scrollToIndex - 1;
        }
      }
      if (index < 0) {
        index = this.props.data.length - 1;
      }

      this.props.onClickRow({ 
        ...this.props.selects,
        lastIndex: index, 
        scrollToIndex: index,
        data: {[index]: true },
      }, this.forceUpdateCells);
    }

    if (e.keyCode === 40) {
      var index = 0;
      if (this.props.selects.lastIndex !== null) {
        index = this.props.selects.lastIndex + 1;
      } else {
        if (this.props.selects.scrollToIndex !== undefined) {
          index = this.props.selects.scrollToIndex + 1;
        }
      }
      if (index > this.props.data.length - 1) {
        index = 0;
      }
    
      this.props.onClickRow({ 
        ...this.props.selects,
        lastIndex: index, 
        scrollToIndex: index,
        data: {[index]: true },
      }, this.forceUpdateCells);
    }
  }

  renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    const rowClass = rowIndex % 2 === 0 ? css.evenRow : css.oddRow
    const rowHover = this.state.hover === rowIndex ? css.hoverRow : rowClass;
    const rowSelect = rowIndex === this.state.hover ? css.selectRowBorder : css.selectRow;
    const classNames = clsx(this.props.selects.data[rowIndex] === undefined ? rowHover: rowSelect, css.cell, css.noselect);
    
    if (this.props.isLoading) {
      return (
        <div key={key} key={key} style={style} className={classNames}>
          <Skeleton width={this.props.data[rowIndex][columnIndex]} />
        </div>
      )
    }
    
    return (
      <div 
        key={key} 
        style={style} 
        className={classNames}
        onClick={(e) => this.handleClickRow(e, rowIndex)}
        onContextMenu={(e) => this.handleClickContextMenu(e, rowIndex)}
        onMouseEnter={() => this.handleHoverOn(rowIndex)}
        onMouseLeave={this.handleHoverOff}
      >
        {this.props.data[rowIndex][this.props.columns[columnIndex].id] || '-'}
      </div>
    );
  }
  
  renderHeaderCell = ({ columnIndex, key, rowIndex, style}) => {
    if (this.props.isLoading) {
      return (
        <div className={clsx(css.headerCell, css.noselect)} key={key} style={style}>
          <Skeleton width={this.props.columns[columnIndex].label} />
        </div>
      )
    }

    return (
      <Draggable
        axis='x'
        handle="strong"
        position={{ x: 0, y: 0 }}
        onStart={(e, data) => this.handleColumnDragStart(e, data, columnIndex)}
        onStop={(e, data) => this.handleColumnDragStop(e, data, columnIndex)}
      >
        <div className={clsx(css.headerCell, css.noselect)} key={key} style={style}>
          <strong className={css.headerButtonDrag} >::</strong >
          {this.props.columns[columnIndex].label}
          <Draggable
            axis='x'
            onStart={(e, data) => this.handleColumnResizeStart(e, data, columnIndex)}
            onStop={(e, data) => this.handleColumnResizeStop(e, data, columnIndex)}
            position={{ x: 0, y: 0 }}
          >
            <div className={css.headerButtonResize} />
          </Draggable>
        </div>
      </Draggable>
    );
  }
  
  getColumnWidth = ({ index }) => {
    return this.props.columns[index].width;
  }

  handleHoverOn = (index) => {
    this.setState((state) => {
      return { ...state, hover: index };
    }, this.forceUpdateCells);
  }

  handleHoverOff = () => {
    this.setState((state) => {
      return { ...state, hover: null };
    }, this.forceUpdateCells);
  }

  handleColumnDragStart = (e, data, index) => {
    data.node.style.zIndex = 100;
  }

  handleColumnDragStop = (e, data, index) => {
    data.node.style.zIndex = 0;
    
    const temp = [];
    let lastWidth = 0;
    let targetColumnIndex = null;

    this.props.columns.forEach((i, key) => {
      if (key === 0) {
        temp.push(lastWidth)
      } else {
        temp.push(lastWidth)
      }
      lastWidth = lastWidth + i.width;
    });

    const curentColumnWidth = temp[index] + data.x;

    temp.forEach((i, key) => {
      if (targetColumnIndex === null && i - MIN_WIDTH_COLUMN > curentColumnWidth) {
        targetColumnIndex = key - 1;
      }
    });
   
    if (targetColumnIndex === null) {
      targetColumnIndex = temp.length - 1;
    }
    if (targetColumnIndex === -1) {
      targetColumnIndex = 0;
    }

    const temp2 = this.props.columns.reduce((l, n, key, arr) => {
      if (key === targetColumnIndex && key === index) {
        return l.concat(n);
      } 
      if (key === targetColumnIndex) {
        if (targetColumnIndex > index) {
          return l.concat(n, arr[index]);
        }
        if (targetColumnIndex < index) {
          return l.concat(arr[index], n);
        }
        return l.concat(n);
      }
      if (key === index) {
        return l;
      }
      return l.concat(n);
    }, []);
    this.props.reorderColumn(temp2, this.forceUpdateAll);
  }

  handleColumnResizeStart = (e, data, index) => {
    data.node.parentNode.style.zIndex = 100;
  }

  handleColumnResizeStop = (e, data, index) => {
    data.node.parentNode.style.zIndex = 0;

    const temp = this.props.columns.map((i, key) => {
      if (key === index) {
        const value = i.width + data.x;
        return { ...i, width: value < MIN_WIDTH_COLUMN ? MIN_WIDTH_COLUMN : value };
      }
      return i;
    });
    this.props.resizeColumn(temp, this.forceUpdateAll);
  }


  handleClickRow = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    this.linkCells.scrollToCell(10, 125)

    if (e.ctrlKey || e.metaKey) {
      const data = { ...this.props.selects.data };
      let lastIndex = index;
      if (data[index] === undefined) {
        data[index] = true;
      } else {
        delete data[index];
        if (this.props.selects.lastIndex === lastIndex) {
          lastIndex = null;
        }
      }
      this.props.onClickRow({ lastIndex, data }, this.forceUpdateCells);
    } else if (e.shiftKey) {
      const data = { ...this.props.selects.data };
      let lastIndex = index;
      if (this.props.selects.lastIndex === null) {
        for (let i = 0; i <= index; i++) {
          data[i] = true;
        }
      } else {
        if (index > this.props.selects.lastIndex) {
          for (let i = this.props.selects.lastIndex; i <= index; i++) {
            data[i] = true;
          }
        } else {
          for (let i = this.props.selects.lastIndex; i >= index; i--) {
            data[i] = true;
          }
        }
      }
      this.props.onClickRow({ lastIndex, data }, this.forceUpdateCells);
    } else {
      this.props.onClickRow({ lastIndex: index, data: { [index]: true } }, this.forceUpdateCells);
    }
  }

  handleClickContextMenu = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleOnScroll = (e, scroll) => {
    scroll.onScroll(e);

    if (this.props.selects.scrollToIndex !== undefined) {
      this.props.onClickRow({ 
        ...this.props.selects, 
        scrollToIndex: undefined,
      }, this.forceUpdateCells);
    }
  }

  forceUpdateAll = () => {
    this.linkHeaders.recomputeGridSize();
    this.linkCells.recomputeGridSize();
  }

  forceUpdateCells= () => {
    this.linkCells.recomputeGridSize();
  }

  refHeaders = (e) => {
    this.linkHeaders = e;
  }

  refCells = (e) => {
    this.linkCells = e;
  }
  
  render({ headerHeight, cellHeight, columns, selects, data } = this.props) {
    return (
      <ScrollSync>
        {(scroll) => (
          <div className={css.GridColumn}>
            <AutoSizer >
              {(size) => (
                <>
                  <Headers 
                    ref={this.refHeaders}
                    scrollLeft={scroll.scrollLeft} 
                    size={size}
                    rowHeight={headerHeight}
                    columnCount={columns.length || 0}
                    columnWidth={this.getColumnWidth}
                    render={this.renderHeaderCell}
                    data={columns}
                  />
                  <Cells 
                   ref={this.refCells}
                    scroll={(e) => this.handleOnScroll(e, scroll)} 
                    size={size}
                    headerHeight={headerHeight}
                    rowHeight={cellHeight}
                    columnCount={columns.length || 0}
                    rowCount={data.length}
                    columnWidth={this.getColumnWidth}
                    scrollToIndex={selects.scrollToIndex}
                    render={this.renderBodyCell}
                  />
                </>
              )}
            </AutoSizer>
          </div>
        )}
      </ScrollSync>
    );
  }
}


export default Grid;