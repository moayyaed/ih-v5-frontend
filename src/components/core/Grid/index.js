import React, { PureComponent } from 'react';

import Box from 'components/core/Box';

import clsx from 'clsx';

import { ScrollSync, Grid, AutoSizer } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

import css from './grid.module.css';

const styles = {
  box: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
};


class CoreGrid extends PureComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      columnWidth: 250,
      columnCount: 50,
      height: 500,
      overscanColumnCount: 0,
      overscanRowCount: 5,
      rowHeight: 40,
      rowCount: 1000,
    };

    this._renderBodyCell = this._renderBodyCell.bind(this);
    this._renderHeaderCell = this._renderHeaderCell.bind(this);
  }

  _renderBodyCell({columnIndex, key, rowIndex, style}) {
    return (
      <div className={css.cell} key={key} style={style}>
        {`R${rowIndex}, C${columnIndex}`}
      </div>
    );
  }

  _renderHeaderCell({columnIndex, key, rowIndex, style}) {
    return (
      <div className={css.headerCell} key={key} style={style}>
        {`C${columnIndex}`}
        <div className={css.headerButtonResize} />
      </div>
    );
  }

  columnWidth = ({ index }) => {
    return 250;
  }

  render() {
    const {
      columnCount,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
    } = this.state;

    return (
      <Box style={styles.box}>
        <ScrollSync>
          {({
            clientHeight,
            clientWidth,
            onScroll,
            scrollHeight,
            scrollLeft,
            scrollTop,
            scrollWidth,
          }) => {
            const x = scrollLeft / (scrollWidth - clientWidth);
            const y = scrollTop / (scrollHeight - clientHeight);


            return (
                <div className={css.GridColumn}>
                  <AutoSizer >
                    {({width, height}) => (
                      <div>
                        <div
                          style={{
                            height: rowHeight,
                            width: width - scrollbarSize(),
                          }}>
                          <Grid
                            tabIndex={null}
                            className={css.HeaderGrid}
                            columnWidth={this.columnWidth}
                            columnCount={columnCount}
                            height={rowHeight}
                            overscanColumnCount={overscanColumnCount}
                            cellRenderer={this._renderHeaderCell}
                            rowHeight={rowHeight}
                            rowCount={1}
                            scrollLeft={scrollLeft}
                            width={width - scrollbarSize()}
                          />
                        </div>
                        <div
                          style={{
                            height: height -40,
                            width,
                          }}>
                          <Grid
                            tabIndex={null}
                            className={css.BodyGrid}
                            columnWidth={this.columnWidth}
                            columnCount={columnCount}
                            height={height - 40}
                            onScroll={onScroll}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            cellRenderer={this._renderBodyCell}
                            rowHeight={rowHeight}
                            rowCount={rowCount}
                            width={width}
                          />
                        </div>
                      </div>
                    )}
                  </AutoSizer>
                </div>
            );
          }}
        </ScrollSync>
      </Box>
    );
  }
}


export default CoreGrid;