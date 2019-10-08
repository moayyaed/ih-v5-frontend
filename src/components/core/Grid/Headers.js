import React from 'react';

import { Grid } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

import css from './main.module.css';

function Headers({ scroll, size, rowHeight, columnWidth, render }) {
  return (
    <div style={{ height: rowHeight, width: size.width - scrollbarSize()}}>
    <Grid
      tabIndex={null}
      width={size.width - scrollbarSize()}
      height={rowHeight}
      className={css.HeaderGrid}
      columnWidth={columnWidth}
      columnCount={50}
      overscanColumnCount={0}
      cellRenderer={render}
      rowHeight={rowHeight}
      rowCount={1}
      scrollLeft={scroll.scrollLeft}
      
    />
  </div>
  )
}

export default Headers;