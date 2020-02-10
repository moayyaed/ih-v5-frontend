import React, { Component } from 'react';
import core from 'core';

import SortableTree, { getNodeAtPath, getDescendantCount } from 'react-sortable-tree';
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
    if (core.components[this.props.namespace] !== undefined) {
      core.components[this.props.namespace].data({ ...this.props.state, list })
    }
  }

  handleClick = (e, item, row) => {
    if (item.children === undefined) {
      const { menuid } = core.nav.state;
      core.nav.push(`${core._options.route}/${menuid}/${item.component}/${item.id}`);
    }
  }

  handleContextMenuBody = (e) => {
    e.preventDefault();
    e.stopPropagation();

    core.event(`${this.props.namespace}:click_cm:body`, {
      e,
      namespace: this.props.namespace,
      node: null,
      menu: this.props.state.contextmenu.body,
      close: this.handleCloseContextMenu,
    });

  }

  handleContextMenuItem = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
   
    if (core.components[this.props.namespace] !== undefined) {
      core.components[this.props.namespace].data({ ...this.props.state, contextmenuid: item.node.id })
    }
 
    const contextmenu = this.props.state.contextmenu[item.path[0]];
    if (item.children !== undefined) {
      core.event(`${this.props.namespace}:click_cm:parent`, {
        e,
        namespace: this.props.namespace,
        node: item,
        menu: contextmenu,
        close: this.handleCloseContextMenu,
      });
    } else {
      core.event(`${this.props.namespace}:click_cm:child`, {
        e,
        node: item,
        namespace: this.props.namespace,
        menu: contextmenu,
        close: this.handleCloseContextMenu,
      });
    }
  }

  handleCloseContextMenu = () => {
    if (core.components[this.props.namespace] !== undefined) {
      core.components[this.props.namespace].data({ ...this.props.state, contextmenuid: null })
    }
  }

  handleEndRename = (value, node) => {
    if (core.components[this.props.namespace] !== undefined) {
      core.components[this.props.namespace].rename(null);
    }
  }

  generateNodeProps = (rowinfo) => {
    const style = {};
    const id = rowinfo.node.id;

    if (this.props.state.selectid === id) {
      style.backgroundColor = 'rgba(158, 158, 158, 0.2)';
    }

    if (this.props.state.contextmenuid === id) {
      style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
    }


    return {
      style,
      renameid: this.props.state.renameid,
      handleEndRename: this.handleEndRename,
      onContextMenu: (e) => this.handleContextMenuItem(e, rowinfo),
      onClick: (e) => this.handleClick(e, rowinfo.node, rowinfo),
    };
  }

  handleCheckChild = (node) => {
    return node.children !== undefined && node.children === undefined;
  }

  handleScroll = () => {

  }

  linkTree = (e) => {
    console.log(e);
    this.tree = e;
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
          innerStyle={{ padding: 5 }}
          treeData={state.list}
          onChange={this.handleChange}
          generateNodeProps={this.generateNodeProps}
          canNodeHaveChildren={this.handleCheckChild}
          getNodeKey={({ node }) => node.id}
          theme={theme}
        />    
      </div>
    );
  }
}


export default core.connect(withStyles(classes)(Explorer));