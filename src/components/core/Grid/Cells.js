import React from 'react';

import { Grid } from 'react-virtualized';

import css from './main.module.css';

function Cells({ scroll, size, render, columnWidth, headerHeight, rowHeight }) {
  return (
    <div style={{ height: size.height - headerHeight, width: size.width }}>
      <Grid
        tabIndex={null}
        width={size.width}
        height={size.height - headerHeight}
        className={css.BodyGrid}
        columnWidth={columnWidth}
        columnCount={50}
        onScroll={scroll.onScroll}
        overscanColumnCount={2}
        overscanRowCount={5}
        cellRenderer={render}
        rowHeight={rowHeight}
        rowCount={1000}
      />
    </div>
  )
}

export default Cells;