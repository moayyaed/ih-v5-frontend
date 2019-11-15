import React from 'react';

import { Grid } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

import css from './main.module.css';


function Headers({ scrollLeft, size, columnCount, rowHeight, columnWidth, render }, ref) {
  return (
    <div className={css.HeaderContainer} style={{ height: rowHeight, width: size.width - scrollbarSize()}}>
      <Grid
        ref={ref}
        tabIndex={null}
        width={size.width - scrollbarSize() - 1}
        height={rowHeight}
        className={css.HeaderGrid}
        columnWidth={columnWidth}
        columnCount={columnCount}
        overscanColumnCount={0}
        cellRenderer={render}
        rowHeight={rowHeight}
        rowCount={1}
        scrollLeft={scrollLeft}
      />
    </div>
  )
}


export default React.forwardRef(Headers) ;