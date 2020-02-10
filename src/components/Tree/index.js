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

  handleClick = (e, item) => {
    const { menuid } = core.nav.state;

    if (item.node.component !== undefined) {
      core.nav.push(`${core._options.route}/${menuid}/${item.node.component}/${item.node.id}`);
    } else {
      if (item.node.children !== undefined) {
        const component = this.props.state.defaultComponent[item.path[0]].parent;
        core.nav.push(`${core._options.route}/${menuid}/${component}/${item.node.id}`);
      } else {
        const component = this.props.state.defaultComponent[item.path[0]].child;
        core.nav.push(`${core._options.route}/${menuid}/${component}/${item.node.id}`);
      }
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

    if (item.node.children !== undefined) {
      core.event(`${this.props.namespace}:click_cm:parent`, {
        e,
        namespace: this.props.namespace,
        node: item,
        menu: this.props.state.contextmenu[item.path[0]].parent,
        close: this.handleCloseContextMenu,
      });
    } else {
      core.event(`${this.props.namespace}:click_cm:child`, {
        e,
        node: item,
        namespace: this.props.namespace,
        menu: this.props.state.contextmenu[item.path[0]].child,
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
      onClick: (e) => this.handleClick(e, rowinfo),
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