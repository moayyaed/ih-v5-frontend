import React, { Component } from 'react';

import Box from 'components/core/Box';
import Grid from 'components/core/Grid';

import { makeStyles, withStyles } from '@material-ui/core/styles';

const styles = {
  box: {
    width: '100%',
    height: '100%',
  },
};

const useStyles = makeStyles({

});

const exemple = {
  columns: [
    { id: '1', label: 'Test1', width: 250 },
    { id: '2', label: 'Test2', width: 250 },
    { id: '3', label: 'Test3', width: 250 },
    { id: '4', label: 'Test4', width: 250 },
    { id: '5', label: 'Test5', width: 250 },
    { id: '6', label: 'Test6', width: 250 },
    { id: '7', label: 'Test7', width: 250 },
    { id: '8', label: 'Test8', width: 250 },
  ],
  selects: {
    scrollToIndex: undefined,
    lastIndex: null,
    data: {},
  },
};

class Table extends Component {
  state = exemple;

  handleResizeColumn = (columns, callback) => {
    this.setState((state) => {
      return { ...state, columns: columns };
    }, callback);
  }

  handleReorderColumn = (columns, callback) => {
    this.setState((state) => {
      return { ...state, columns: columns };
    }, callback);
  }

  handleReorderColumn = (columns, callback) => {
    this.setState((state) => {
      return { ...state, columns: columns };
    }, callback);
  }

  handleClickRow = (selects, callback) => {
    this.setState((state) => {
      return { ...state, selects: selects };
    }, callback);
  }

  render() {
    return (
      <Box style={styles.box}>
        <Grid
          headerHeight={30}
          cellHeight={30}
          columns={this.state.columns}
          selects={this.state.selects}
          resizeColumn={this.handleResizeColumn}
          reorderColumn={this.handleReorderColumn}
          onClickRow={this.handleClickRow}
        />
      </Box>
    );
  }
}


export default Table;