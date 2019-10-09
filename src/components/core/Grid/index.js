import React, { Component } from 'react';

import clsx from 'clsx';

import { ScrollSync, AutoSizer } from 'react-virtualized';
import Draggable from 'react-draggable';

import Headers from './Headers';
import Cells from './Cells';

import css from './main.module.css';

class Grid extends Component {

  renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    const rowClass = rowIndex % 2 === 0 ? css.evenRow : css.oddRow
    const classNames = clsx(rowClass, css.cell);

    return (
      <div className={classNames} key={key} style={style}>
        {`I${columnIndex} R${rowIndex}, C${columnIndex}`}
      </div>
    );
  }
  
  renderHeaderCell = ({ columnIndex, key, rowIndex, style}) => {
    return (
      <Draggable
        axis='x'
        handle="strong"
        position={{ x: 0, y: 0 }}
        onStart={(e, data) => this.handleColumnDragStart(e, data, columnIndex)}
        onStop={(e, data) => this.handleColumnDragStop(e, data, columnIndex)}
      >
        <div className={css.headerCell} key={key} style={style}>
          <strong className={css.headerButtonDrag} >::</strong >
          {this.props.columns[columnIndex].label}
          <Draggable
            axis='x'
            onStop={(e, data) => this.handleColumnResizeStop({
              x: data.x,
              index: columnIndex
            })}
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

  handleColumnDragStart = (e, data, index) => {
    data.node.style.zIndex = 100;
  }

  handleColumnDragStop = (e, data, index) => {
    data.node.style.zIndex = 0;
  }

  handleColumnResizeStop = ({ x, index }) => {
    const temp = this.props.columns.map((i, key) => {
      if (key === index) {
        const value = i.width + x;
        return { ...i, width: value < 75 ? 75 : value };
      }
      return i;
    });
    this.props.resizeColumn(temp, this.recomputeGridSize);
  }

  recomputeGridSize = () => {
    this.linkHeaders.recomputeGridSize();
    this.linkCells.recomputeGridSize();
  }

  refHeaders = (e) => {
    this.linkHeaders = e;
  }

  refCells = (e) => {
    this.linkCells = e;
  }
  
  render({ headerHeight, cellHeight, columns } = this.props) {
    return (
      <ScrollSync>
        {(scroll) => (
          <div className={css.GridColumn}>
            <AutoSizer >
              {(size) => (
                <>
                  <Headers 
                    ref={this.refHeaders}
                    scroll={scroll} 
                    size={size}
                    rowHeight={headerHeight}
                    columnCount={columns.length || 0}
                    columnWidth={this.getColumnWidth}
                    render={this.renderHeaderCell}
                    data={columns}
                  />
                  <Cells 
                   ref={this.refCells}
                    scroll={scroll} 
                    size={size}
                    headerHeight={headerHeight}
                    rowHeight={cellHeight}
                    columnCount={columns.length || 0}
                    columnWidth={this.getColumnWidth}
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