import React, { Component } from 'react';
import core from 'core';

import 'react-sortable-tree/style.css'; 

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';


import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';

import { ContextMenu } from "@blueprintjs/core";
import Menu from 'components/Menu';

// import Skeleton from '@material-ui/lab/Skeleton';
import Panel from 'components/Panel';


import theme from './theme';
import { getNodesRange, insertNodes, editNodes, removeNodes, findNode, getOrder, getOrderMove, structToMap } from './utils';

const styles = {
  panel: {
    height: '100%',
    backgroundColor: '#ECEFF1',
    padding: 0,
    flexShrink: 0,
    overflow: 'hidden',
    borderRight: '1px solid #d3d3d3',
  },
  tree: { 
    /*
    position: 'absolute',
    width: 'unset', 
    height: 'unset', 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginRight: 0,
    marginBottom: -15,
    */
    padding: 5
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
  state = { contextMenu: { main: [] } };

  componentDidMount() {
    this.props.route.menuid && core
    .request({ method: 'appnav', params: this.props.route })
    .ok((res) => {
      if (this.props.route.nodeid) {
        const node = findNode(res.list, this.props.route.nodeid);
        if (node) {
          if (node.windowHeight - this.panel.clientHeight > 0) {
            res.scrollTop = node.scrollPoint - ((this.panel.clientHeight - 5) / 2) - 9;
          }
          res.list = editNodes(res.list, (item) => {
            if (item.children !== undefined && node.paths[item.id]) {
              return { ...item, expanded: true };
            }
            return item;
          }); 
        }
      }
      core.actions.appnav.data(res)
    });
  }

  handleChange = (list) => {
    core.actions.appnav.data({ list })
  }

  handleCheckChild = (node) => {
    if (node.children !== undefined) {
      if (node.expanded === true) {
        return true;
      }
    } 
    return false;
  }

  handleCanDrag = (item) => {
    if (item.node.component === 'lostfolder') {
      return false;
    }
    if (item.node.id === item.path[0]) {
      return false;
    }
    return true;
  }

  handleCanDrop = (item) => {
    if (item.nextParent === null) {
      return false;
    }
    if (item.prevPath[0] !== item.nextPath[0]) {
      return false;
    }
    return true;
  }

  generateNodeProps = (rowinfo) => {
    const style = {};
    const id = rowinfo.node.id;

    if (this.props.route.nodeid === id) {
      style.backgroundColor = 'rgba(158, 158, 158, 0.2)';
    }

    if (this.props.state.selects.data[id]) {
      style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
    } else {
      if (this.props.state.selects.contextMenu && this.props.state.selects.contextMenu.id === id) {
        style.outline = '1px solid #2196F3';
      }
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
      const curent = item.node;
      const last = this.props.state.selects.lastItem || curent;
      const lastSelects = this.props.state.selects.data;
      const selects = getNodesRange(this.props.state.list, last.id, curent.id);
      core.actions.appnav.selectNodes(curent, selects);
    } else if (e.ctrlKey || e.metaKey) {
      core.actions.appnav.selectNode(item.node);
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
    
    const root = item.path[0];
    const rootid = this.props.state.options.roots[item.path[0]];
    const pos = { left: e.clientX, top: e.clientY };

    const type = this.props.state.options[rootid] !== undefined ? 'parent' : 'child';

    const disabled = { disablePaste: root !== core.buffer.type };
    const commands = {
      addNodeByContext: (menuItem) => this.handleAddNode(false, item, menuItem), 
      addNode: () => this.handleAddNode(false, item),
      addFolder: () => this.handleAddNode(true, item),
      copy: () => this.handleCopyNode(item),
      paste: () => this.handlePasteNode(item),
      delete: () => this.handleRemoveNodes(item), 
    };

    let scheme = { main: [] };
     
    const params = this.props.state.options[rootid][type]; 
    if (params !== undefined && params.popup) {
      scheme = params.popup;
      core.actions.appnav.selectNodeContextMenu(item.node);
      ContextMenu.show(
        <Menu 
          scheme={scheme}
          disabled={disabled}
          commands={commands}
        />, 
        pos, core.actions.appnav.selectNodeContextMenu);
    }
  }

  handleAddNode = (folder, item, contextMenuItem = {}) => {
    let scrollTop = this.props.state.scrollTop;
    
    const rootid = this.props.state.options.roots[item.path[0]];

    const parent = item.node.children !== undefined ? item.node : item.parentNode;

    const items = [{ parentid: parent.id, order: getOrder(parent, item.node), ...contextMenuItem }];
    const payload = { [rootid]: { [folder ? 'folders' : 'nodes'] : items } }

    core
    .request({ method: 'appnav_new_node', params: this.props.route, payload })
    .ok((res) => {
      const type = folder ? 'parent' : 'child';
      const list = insertNodes(this.props.state.list, item.node, res.data);
      const node = findNode(list, res.data[0].id);
      
      if (node) {
        if (node.windowHeight - this.panel.clientHeight > 0) {
          scrollTop = node.scrollPoint - ((this.panel.clientHeight - 5) / 2) - 9;
        }
      }

      core.actions.appnav.data({ scrollTop, list });
      this.handleChangeRoute(type, rootid, { node: res.data[0] });
    });
  }

  handleCopyNode = (item) => {
    const { options, list, selects } = this.props.state;
    const root = item.path[0];
    let struct;

    if (selects.data[item.node.id]) {
      struct = structToMap(true, options.roots, list, selects.data);
    } else {
      struct = structToMap(true, options.roots, list, item.node.id, item.node.id);
    }
  
    const buffer = struct.map;
    core.buffer = { class: 'tree', type: root, data: buffer  };
  }

  handlePasteNode = (item) => {
    const parent = item.node.children !== undefined ? item.node : item.parentNode;
    const payload = core.buffer.data;
    const params = {
      ...this.props.route,
      parentid: parent.id,
      order: item.node.children !== undefined ? null : item.node.order,
    };
    
    core
    .request({ method: 'appnav_paste_node', params, payload })
    .ok((res) => {
      const list = insertNodes(this.props.state.list, item.node, res.data);
      core.actions.appnav.data({ list });
    });
  }

  handleRemoveNodes = (item) => {
    const { options, list, selects } = this.props.state;
    const { route } = this.props;

    let struct;

    if (selects.data[item.node.id]) {
      struct = structToMap(false, options.roots, list, selects.data);
    } else {
      struct = structToMap(false, options.roots, list, item.node.id, item.node.id);
    }

    core
    .request({ method: 'appnav_remove_node', params: this.props.route, payload: struct.map })
    .ok((res) => {
      const newlist = removeNodes(list, struct.list);
      core.actions.appnav.data({ 
        list: newlist,
        selects: { lastItem: null, contextMenu: null, data: {} },
      });
      if (struct.list[route.nodeid]) {
        core.route(`${route.menuid}`);
      }
    })
    .error(() => {
      core
      .request({ method: 'appnav', params: this.props.route })
      .ok(core.actions.appnav.data);
    });
  }

  handleMoveNode = (item) => {
    if (item.nextParentNode) {
      const rootid = this.props.state.options.roots[item.path[0]];
      const type = item.node.children !== undefined ? 'folders' : 'nodes';
  
      const nodeid = item.node.id;
      const parentid = item.nextParentNode.id;
      const order = getOrderMove(item.nextParentNode, item.node);
  
      const items = [{ parentid, nodeid, order }];
      const payload = { [rootid]: { [type] : items } }

      const list = editNodes(this.props.state.list, (item) => {
        if (item.id === nodeid) {
          return { ...item, order };
        }
        return item;
      }); 
      
      core.actions.appnav.data({ list });
  
      core
      .request({ method: 'appnav_move_node', params: this.props.route, payload })
      .ok((res) => {})
      .error(() => {
        core
        .request({ method: 'appnav', params: this.props.route })
        .ok(core.actions.appnav.data);
      });
    }
  }

  handleChangePanelSize = (value) => {
    core.actions.appnav.panelWidth(value);
  }

  linkPanel = (e) => {
    this.panel = e;
  }

  render({ state, route } = this.props) {
    if (route.menuid) {
      return (
        <Panel width={state.width} position="right" style={styles.panel} onChangeSize={this.handleChangePanelSize}>
          <div ref={this.linkPanel} style={styles.box} onClick={this.handleClickBody} onContextMenu={this.handleContextMenuBody}>  
            <SortableTree
              reactVirtualizedListProps={{ 
                onScroll: core.actions.appnav.scroll,
                scrollTop: state.scrollTop,
              }}
              rowHeight={21}
              innerStyle={styles.tree}
              treeData={state.list}
              onChange={this.handleChange}
              generateNodeProps={this.generateNodeProps}
              canNodeHaveChildren={this.handleCheckChild}
              canDrag={this.handleCanDrag}
              canDrop={this.handleCanDrop}
              onMoveNode={this.handleMoveNode}
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