import React, { Component } from 'react';

import clsx from 'clsx';

import { ScrollSync, AutoSizer } from 'react-virtualized';

import Headers from './Headers';
import Cells from './Cells';

import css from './main.module.css';

class Grid extends Component {

  renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    const rowClass = rowIndex % 2 === 0 ? css.evenRow : css.oddRow
    const classNames = clsx(rowClass, css.cell);

    return (
      <div className={classNames} key={key} style={style}>
        {`R${rowIndex}, C${columnIndex}`}
      </div>
    );
  }
  
  renderHeaderCell = ({columnIndex, key, rowIndex, style}) => {
    return (
      <div className={css.headerCell} key={key} style={style}>
        {`C${columnIndex}`}
        <div className={css.headerButtonResize} />
      </div>
    );
  }
  
  getColumnWidth = ({ index }) => {
    return 250;
  }
  
  render({ headerHeight, cellHeight } = this.props) {
    return (
      <ScrollSync>
        {(scroll) => (
          <div className={css.GridColumn}>
            <AutoSizer >
              {(size) => (
                <>
                  <Headers 
                    scroll={scroll} 
                    size={size}
                    rowHeight={headerHeight}
                    columnWidth={this.getColumnWidth}
                    render={this.renderHeaderCell}
                  />
                  <Cells 
                    scroll={scroll} 
                    size={size}
                    headerHeight={headerHeight}
                    rowHeight={cellHeight}
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