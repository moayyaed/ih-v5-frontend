import React, { Component } from 'react';
import core from 'core';

import { Scrollbars } from 'react-custom-scrollbars';

import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; 

import theme from './theme';

import Skeleton from '@material-ui/lab/Skeleton';

import { withStyles } from '@material-ui/core/styles';


const styles = {
  box: {
    width: '100%',
    height: '100%',
  },
  active: {
    cursor: 'pointer',
    backgroundColor: 'rgba(158, 158, 158, 0.2)',
  },
  noactive: {
    cursor: 'pointer',
  }
};

const classes = theme => ({
  root: {
  },
});

class Explorer extends Component {

  static defaultProps = {
    id: 'tree'
  };

  componentDidMount() {
  }

  handleChange = (list) => {
    if (core.components[this.props.id] !== undefined) {
      core.components[this.props.id].setData({ ...this.props.state, list })
    }
  }

  handleClick = (e, item, row) => {
    if (item.children === undefined) {
      const { menuid } = core.nav.state;
      core.nav.push(`${core._options.route}/${menuid}/${item.component}/${item.id}`);
    }
  }

  handleContextMenuBody = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
   
    core.contextMenu(this.props.namespace, null, e)
    core.event('cm', this.props.name, e);
  }

  handleContextMenuItem = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    core.event('cm', `${this.props.name}:item`, e, item);
  }

  generateNodeProps = (rowinfo) => {
    const style = {};
    const id = rowinfo.node.id;

    if (this.props.state.selectid === id) {
      style.backgroundColor = 'rgba(158, 158, 158, 0.2)';
    }

    return {
      style,
      onContextMenu: (e) => this.handleContextMenuItem(e, rowinfo.node),
      onClick: (e) => this.handleClick(e, rowinfo.node, rowinfo),
    };
  }

  handleCheckChild = (node) => {
    return node.children !== undefined && node.children === undefined;
  }

  render({ id, state, classes } = this.props) {
    if (state.loading) {
      return (
        <div style={styles.box} onContextMenu={this.handleContextMenuBody}>
          <div style={{ height: 400 }}>
            {state.list.map(i => 
              <div style={{ paddingLeft: 8, paddingTop: 4, marginBottom: 4 }}>
                <Skeleton variant="text" width={i.w} />
                <div style={{ paddingLeft: 18, marginTop: 4 }}>
                  {i.c.map(i => <Skeleton variant="text" width={i} height={15} />)}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div style={styles.box} onContextMenu={this.handleContextMenuBody}>
        <SortableTree
          rowHeight={21}
          treeData={state.list}
          onChange={this.handleChange}
          generateNodeProps={this.generateNodeProps}
          canNodeHaveChildren={this.handleCheckChild}
          theme={theme}
        />
      </div>
    );
  }
}


export default core.connect(withStyles(classes)(Explorer));