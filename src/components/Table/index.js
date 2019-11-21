import React, { Component } from 'react';
import context from 'context';

import Properties from 'components/Properties';
import Grid from 'components/basic/Grid';

import { makeStyles, withStyles } from '@material-ui/core/styles';


const styles = {
  box: {
    width: '100%',
    height: '100%',
  },
};

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

const classes = theme => ({
  root: {
    flexDirection: 'column',
    justifyContent: 'start',
    width: 70,
    height: '100%',
    backgroundColor: 'transparent',
  },
  bottom: {
    padding: '0px!important',
    maxWidth: 70,
    minWidth: 70,
    maxHeight: 70,
  }
});

class Table extends Component {

  componentDidMount() {
    context.event('app:table', this.props.id, { scheme: this.props.tablesh, tablename: this.props.tableid });
  }

  handleResizeColumn = (columns, callback) => {
    context.actions.table.columns(this.props.id, columns);
    callback();
  }

  handleReorderColumn = (columns, callback) => {
    context.actions.table.columns(this.props.id, columns);
    callback();
  }

  handleClickRow = (selects, callback) => {
    context.actions.table.selects(this.props.id, selects);
    callback();
  }

  render({ id, state, classes } = this.props) {
    return (
      <div style={styles.box}>
        <Grid
          key={state.id}
          isLoading={state.loading}
          headerHeight={30}
          cellHeight={30}
          columns={state.columns}
          selects={state.selects}
          data={state.data}
          resizeColumn={this.handleResizeColumn}
          reorderColumn={this.handleReorderColumn}
          onClickRow={this.handleClickRow}
        />
        <Properties id="properties" />
      </div>
    );
  }
}


export default context.connect(withStyles(classes)(Table));