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
    const params = this.props.match.params
    const _params = params.select ? {
      data: { [params.select]: true },
      lastIndex: params.select,
      scrollToIndex: params.select,
    } : {
      scrollToIndex: undefined,
      lastIndex: null,
      data: {},
    }
    this.l = this.props.history.listen((location, action) => {
      const p = location.pathname.split('/');
      if (action === 'POP') {
        if (p[4] !== undefined) {
          context.actions.table.selects(this.props.id, {
            scrollToIndex: p[4],
            lastIndex: p[4],
            data: { [p[4]]: true},
          });
        } else {
          context.actions.table.selects(this.props.id, {
            scrollToIndex: undefined,
            lastIndex: null,
            data: {},
          });
        }
      }
    });
    context.event('app:table', this.props.id, { scheme: params.pagesh, tablename: params.pageid }, _params);
  }

  componentWillUnmount() {
    this.l();
  }

  handleResizeColumn = (columns, callback) => {
    context.actions.table.columns(this.props.id, columns);
    callback();
  }

  handleReorderColumn = (columns, callback) => {
    context.actions.table.columns(this.props.id, columns);
    callback();
  }

  handleClickRow = (selects, callback, flag = false) => {
    if (flag === false) {
      const params = this.props.match.params;
      const rows = Object.keys(selects.data);
      if (rows.length === 1) {
        if (params.property) {
          this.props.history.push(`/${params.navid}/${params.pagesh}/${params.pageid}/${rows[0]}/property`);
        } else {
          this.props.history.push(`/${params.navid}/${params.pagesh}/${params.pageid}/${rows[0]}`);
        }
      } else {
        if (params.selects === undefined) {
          this.props.history.push(`/${params.navid}/${params.pagesh}/${params.pageid}`);
        }
      }
    }
    context.actions.table.selects(this.props.id, selects);
    // callback();
  }

  handleClickRowContextMenu = (selects, callback) => {
    const params = this.props.match.params;
    const rows = Object.keys(selects.data);
    if (rows.length === 1) {
      if (rows[0] === params.select && params.property) {
        this.props.history.push(`/${params.navid}/${params.pagesh}/${params.pageid}/${rows[0]}`);
      } else {
        this.props.history.push(`/${params.navid}/${params.pagesh}/${params.pageid}/${rows[0]}/property`);
      }
    } else {
      if (params.selects === undefined) {
        this.props.history.push(`/${params.navid}/${params.pagesh}/${params.pageid}`);
      }
    }
    context.actions.table.selects(this.props.id, selects);
    // callback();
  }

  render({ id, state, classes, match } = this.props) {
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
          onClickRowContextMenu={this.handleClickRowContextMenu}
        />
        <Properties isLoading={state.loading} open={match.params.property} data={state.data[match.params.select]} id="properties" />
      </div>
    );
  }
}


export default context.connect(withStyles(classes)(Table));