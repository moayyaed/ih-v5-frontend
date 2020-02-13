import React, { Component } from 'react';
import core from 'core';

import 'react-sortable-tree/style.css'; 

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import { SortableTreeWithoutDndContext as SortableTree, getNodeAtPath, getDescendantCount } from 'react-sortable-tree';

import Skeleton from '@material-ui/lab/Skeleton';
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
    .request({ method: 'appnav', params: this.props.route })
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

    if (this.props.route.nodeid === id) {
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

  handleChangeRoute = (type, rootid, item) => {
    const { state, route } = this.props;
    const componentid = item.node.component || state.options[rootid][type].defaultComponent;
    const params = core.cache.componentParams[componentid] ?  
      '/' + core.cache.componentParams[componentid] :
      '/' + core.options.componentScheme[componentid].defaultTab;
    
    core.route(`${route.menuid}/${rootid}/${componentid}/${item.node.id}${params}`);
  }

  handleClick = (e, item) => {
    const rootid = this.props.state.options.roots[item.path[0]];
    const type = item.node.children !== undefined ? 'parent' : 'child';

    this.handleChangeRoute(type, rootid, item);
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

  handleChangePanelSize = (value) => {
    core.actions.appnav.panelWidth(value);
  }

  render({ state, route } = this.props) {
    if (route.menuid) {
      return (
        <Panel width={state.width} position="right" style={styles.panel} onChangeSize={this.handleChangePanelSize}>
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