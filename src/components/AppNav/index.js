import React, { Component } from 'react';
import core from 'core';

import 'react-sortable-tree/style.css'; 

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';


import { SortableTreeWithoutDndContext as SortableTree, getNodeAtPath, getDescendantCount } from 'react-sortable-tree';

import { ContextMenu } from "@blueprintjs/core";
import Menu from 'components/Menu';

import Skeleton from '@material-ui/lab/Skeleton';
import Panel from 'components/Panel';

import theme from './theme';
import { getNodesRange } from './utils';

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

    if (this.props.state.selects.data[id]) {
      style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
    }


    return {
      style,
      renameid: this.props.state.renameid,
      onContextMenu: (e) => this.handleContextMenuNode(e, rowinfo),
      onClick: (e) => this.handleClickNode(e, rowinfo),
    };
  }

  handleChangeRoute = (type, rootid, item) => {
    const { state, route } = this.props;
    const componentid = item.node.component || state.options[rootid][type].defaultComponent;

    const params = core.cache.componentsParams[componentid] ?  
      '/' + core.cache.componentsParams[componentid] :
      '/' + core.options.componentsScheme[componentid].defaultTab;
    
    core.route(`${route.menuid}/${rootid}/${componentid}/${item.node.id}${params}`);
  }

  handleClickNode = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.shiftKey) {
      if (this.props.state.selects.lastItem === null) {
        core.actions.appnav.selectNode(item.node);
      } else {
       const last = this.props.state.selects.lastItem;
       const curent = item.node;
       const selects = getNodesRange(this.props.state.list, last.id, curent.id);
       core.actions.appnav.selectNodes(curent, selects);
      }
    } else {
      if (this.props.state.selects.lastItem) {
        core.actions.appnav.clearSelected();
      }

      const rootid = this.props.state.options.roots[item.path[0]];
      const type = item.node.children !== undefined ? 'parent' : 'child';
  
      this.handleChangeRoute(type, rootid, item);
    }
  }

  handleContextMenuBody = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const pos = { left: e.clientX, top: e.clientY };
    const scheme = {
      main: [
        { id: 'newDevice', title: 'New device', click: this.handleAddNode },
        { id: 'newType', title: 'New type', click: this.handleAddNode },
      ]
    }

    ContextMenu.show(<Menu scheme={scheme} />, pos);
  }

  handleClickBody = (e) => {
    e.preventDefault();
    e.stopPropagation();

    core.actions.appnav.clearSelected();
  }

  handleContextMenuNode = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
   
    const pos = { left: e.clientX, top: e.clientY };

    if (item.node.children !== undefined) {  
      const scheme = {
        main: [
          { id: 'newFolder', title: 'New folder', click: () => this.handleAddNode(item) },
          { id: 'newNode', title: 'New node', click: () => this.handleAddNode(item) },
        ]
      }
      // core.actions.appnav.selectNode(item.node);
      ContextMenu.show(<Menu scheme={scheme} />, pos);
    } else {
      const scheme = {
        main: [
          { id: 'newNode', title: 'New node', click: () => this.handleAddNode(item) },
        ]
      }
      // core.actions.appnav.selectNode(item.node);
      ContextMenu.show(<Menu scheme={scheme} />, pos);
    }
  }

  handleAddNode = (item) => {
    console.log(item)
  }

  handleChangePanelSize = (value) => {
    core.actions.appnav.panelWidth(value);
  }

  render({ state, route } = this.props) {
    if (route.menuid) {
      return (
        <Panel width={state.width} position="right" style={styles.panel} onChangeSize={this.handleChangePanelSize}>
          <div style={styles.box} onClick={this.handleClickBody} onContextMenu={this.handleContextMenuBody}>  
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