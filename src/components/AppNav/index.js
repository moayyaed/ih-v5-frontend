import React, { Component } from 'react';
import core from 'core';

import 'react-sortable-tree/style.css'; 

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import SortableTree, { getNodeAtPath, getDescendantCount } from 'react-sortable-tree';

import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core/styles';

import Panel from 'components/Panel';

import theme from './theme';


const styles = {
  panel: {
    height: '100%',
    backgroundColor: '#ECEFF1',
    padding: 0,
    flexShrink: 0,
    overflow: 'hidden',
    borderRight: '1px solid #d3d3d3',
  },
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

});


class AppNav extends Component {
  componentDidMount() {
    this.props.route.menuid && core
    .request({ component: 'appnav', params: this.props.route })
    .ok(core.actions.appnav.data);
  }

  handleChange = (list) => {
    core.actions.appnav.data({ ...this.props.state, list })
  }

  handleCheckChild = (node) => {
    return node.children !== undefined && node.children === undefined;
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

  handleClick = (e, item) => {
    const { route, state } = this.props;
    const rootid = state.options.roots[item.path[0]];

    if (item.node.children !== undefined) {
      const viewid = item.node.component || state.options[rootid].parent.defaultComponent;
      core.route(`${route.menuid}/${rootid}/${viewid}/${item.node.id}`);
    } else {
      const viewid = item.node.component || state.options[rootid].child.defaultComponent;
      core.route(`${route.menuid}/${rootid}/${viewid}/${item.node.id}`);
    }
  }

  handleContextMenuBody = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleContextMenuItem = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
   

    if (item.node.children !== undefined) {
    
    } else {
 
    }
  }

  handleCloseContextMenu = () => {
  
  }

  handleEndRename = (value, node) => {
 
  }

  render({ state } = this.props) {
    if (this.props.route.menuid) {
      console.log(this.props.route)
      return (
        <Panel width={200} position="right" style={styles.panel}>
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
        </Panel>
      );
    }
    return null;
  }
}


const mapStateToProps = createSelector(
  state => state.app.route,
  state => state.appnav,
  (route, state) => ({ route, state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppNav));