import React, { Component } from 'react';
import core from 'core';

import 'react-sortable-tree/style.css'; 

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';


import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import fileDownload from 'js-file-download';

import { ContextMenu } from "@blueprintjs/core";
import Menu from 'components/Menu';

// import Skeleton from '@material-ui/lab/Skeleton';
import Panel from 'components/Panel';


import theme from './theme';
import { getNodesRange, insertNodes, editNodes, removeNodes, findNode, getPrevNode, structToMap, getFirstChild } from './utils';

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
    .request({ method: 'appnav', props: this.props })
    .ok((res) => {
      const checknode = findNode(res.list, this.props.defaultSelectNodeId);
      let selectid = this.props.disabledRoute ? checknode ? this.props.defaultSelectNodeId : null : this.props.route.nodeid;
      if (this.props.defaultSelectChildren && !selectid) {
        const childid = getFirstChild(res.list)
        if (childid) {
          selectid = childid.id
        }
      }
      if (selectid) {
        const node = findNode(res.list, selectid);
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

        if (this.props.disabledRoute && node) {
          let rootkey = null;
            rootkey = Object
              .keys(node.paths)
              .find(key => node.paths[key].root !== undefined);

          if (rootkey === undefined && node.root) {
            rootkey = node.root;
          }
          if (rootkey) {
            const rootid = node.root ? node.root : node.paths[rootkey].root;
            const type = node.children !== undefined ? 'parent' : 'child';
            const componentid = node.component || res.options[rootid][type].defaultComponent;
            res.click = { id: selectid, component: componentid };
            this.props.onClickNode({ node }, componentid, selectid, res);
          }
        }
      }
      core.actions.appnav.data(this.props.stateid, res);
    });
  }

  componentWillUnmount() {
    if (!this.props.disabledRoute) {
      core.actions.apppage.clear();
    } else {
      core.actions.appnav.clear(this.props.stateid)
    }
  }

  handleChange = (list) => {
    core.actions.appnav.data(this.props.stateid, { list })
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

    if (this.props.disabledRoute) {
      if (this.props.state.click.id === id) {
        // style.backgroundColor = 'rgba(158, 158, 158, 0.2)';
        style.fontWeight = 'bold';
        // style.color = '#505050';
        style.color = '#01579B';
      }
    } else {
      if (this.props.route.nodeid === id) {
        // style.backgroundColor = 'rgba(158, 158, 158, 0.2)';
        style.fontWeight = 'bold';
        // style.color = '#505050';
        style.color = '#01579B';
      }
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
  
    if (this.props.disabledRoute) {
      core.actions.appnav.clickNode(this.props.stateid, componentid, item.node.id);
      if (this.props.onClickNode) {
        this.props.onClickNode(item, componentid, item.node.id, state);
      }
    } else {
      const params = core.cache.componentsParams[componentid] ?  
      '/' + core.cache.componentsParams[componentid] :
      '/' + core.options.componentsScheme[componentid].defaultTab;
      core.route(`${route.menuid}/${rootid}/${componentid}/${item.node.id}${params}`);
    }
  }

  handleClickNode = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.shiftKey) {
      const curent = item.node;
      const last = this.props.state.selects.lastItem || curent;
      const lastSelects = this.props.state.selects.data;
      const selects = getNodesRange(this.props.state.list, last.id, curent.id);
      core.actions.appnav.selectNodes(this.props.stateid, curent, selects);
    } else if (e.ctrlKey || e.metaKey) {
      core.actions.appnav.selectNode(this.props.stateid, item.node);
    } else {
      if (this.props.state.selects.lastItem) {
        core.actions.appnav.clearSelected(this.props.stateid);
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

    core.actions.appnav.clearSelected(this.props.stateid);
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
      upload: (menuItem) => this.handleUpload(item, menuItem),
      export: (menuItem) => this.handleExport(item, menuItem),
    };

    let scheme = { main: [] };
     
    const params = this.props.state.options[rootid][type]; 
    if (params !== undefined && params.popup) {
      scheme = params.popup;
      core.actions.appnav.selectNodeContextMenu(this.props.stateid, item.node);
      ContextMenu.show(
        <Menu 
          scheme={scheme}
          disabled={disabled}
          commands={commands}
        />, 
        pos, () => core.actions.appnav.selectNodeContextMenu(this.props.stateid));
    }
  }

  handleAddNode = (folder, item, contextMenuItem = {}) => {
    let scrollTop = this.props.state.scrollTop;
    
    const rootid = this.props.state.options.roots[item.path[0]];

    const parent = item.node.children !== undefined ? item.node : item.parentNode;
    const items = [{ ...contextMenuItem }];

    const params = { parentid: parent.id, previd: item.node.id }
    const payload = { [rootid]: { [folder ? 'folders' : 'nodes'] : items } }

    core
    .request({ method: 'appnav_new_node', props: this.props, params, payload })
    .ok((res) => {
      const type = folder ? 'parent' : 'child';
      const list = insertNodes(this.props.state.list, item.node, res.data);
      const node = findNode(list, res.data[0].id);
      
      if (node) {
        if (node.windowHeight - this.panel.clientHeight > 0) {
          scrollTop = node.scrollPoint - ((this.panel.clientHeight - 5) / 2) - 9;
        }
      }

      core.actions.appnav.data(this.props.stateid, { scrollTop, list });

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
      parentid: parent.id,
      previd: parent.id === item.node.id ? '_bottom': item.node.id,
    };
    
    core
    .request({ method: 'appnav_paste_node', props: this.props, params, payload })
    .ok((res) => {
      const list = insertNodes(this.props.state.list, item.node, res.data);
      core.actions.appnav.data(this.props.stateid, { list });
    });
  }

  handleRemoveNodes = (item) => {
    const { options, list, selects } = this.props.state;
    const { route } = this.props;

    let struct;

    if (selects.data[item.node.id]) {
      struct = structToMap(true, options.roots, list, selects.data);
    } else {
      struct = structToMap(true, options.roots, list, item.node.id, item.node.id);
    }

    core
    .request({ method: 'appnav_remove_node', props: this.props, payload: struct.map })
    .ok((res) => {
      const newlist = removeNodes(list, struct.list);
      core.actions.appnav.data(this.props.stateid, { 
        list: newlist,
        selects: { lastItem: null, contextMenu: null, data: {} },
      });
      if (struct.list[route.nodeid]) {
        if (this.props.disabledRoute) {

        } else {
          core.route(`${route.menuid}`);
        }
      }
    })
    .error(() => {
      core
      .request({ method: 'appnav', props: this.props })
      .ok((res) => core.actions.appnav.data(this.props.stateid, res));
    });
  }


  handleUpload = (item, params) => {
    const data = new FormData();
    const input = document.createElement('input');
    const xhr = new XMLHttpRequest();
    const parent = item.node.children !== undefined ? item.node : item.parentNode;
    const previd = parent.id === item.node.id ? '_bottom': item.node.id;
    
    input.type = 'file';
    input.multiple = true;
    input.accept="image/*, .zip, .rar"

    input.onchange = (e) => {
      const list = [];  

      data.append('param', params.param);
      data.append('parentid', parent.id);
      data.append('previd', previd);

      Array
        .from(input.files)
        .forEach(i => {
          data.append('files', i);
          list.push({ name: i.name, size: (i.size / 1024 / 1024).toFixed(2), src: URL.createObjectURL(i) })
        })

      function handleDialogClick({ complete, message, replace}) {
        if (message === 'submit') {
          data.append('replace', replace);
          xhr.send(data);
        } else {
          if (!complete) {
            xhr.abort();
          }

          list.forEach(i => URL.revokeObjectURL(i.src));

          core.transfer.unsub('form_progress', handleDialogClick);
          core.actions.appprogress.data({ open: false, list: [], progress: 0, complete: false, message: 'submit' })
        }
      }

      xhr.upload.onloadstart = function(e) {
        core.actions.appprogress.data({ message: 'uploding' })
      }
      
      xhr.upload.onprogress = (e) => {
        const progress = Math.round((e.loaded / e.total) * 100);
        core.actions.appprogress.data({ progress })
      }

      xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            try {
              const res = JSON.parse(xhr.responseText);
              const list = insertNodes(this.props.state.list, item.node, res.data || [] );
              core.actions.appnav.data(this.props.stateid, { list });
              core.actions.appprogress.data({ complete: true, message: 'complete' })
            } catch (e) {
              core.actions.appprogress.data({ message: 'error' })
              core.actions.app.alertOpen('warning', 'Error: ' + e.message);
            }
          } else {
            if (xhr.status !== 0) {
              core.actions.appprogress.data({ message: 'error' })
              core.actions.app.alertOpen('warning', xhr.responseText);
            }
          }
        }
      };
      
      xhr.upload.onload = () => {
     
      }
      
      xhr.upload.onerror = (e) => {
        core.actions.appprogress.data({ message: 'error' })
        core.actions.app.alertOpen('warning', 'Error: ' + e.message);
      }

      xhr.open('POST', '/upload');

      core.transfer.sub('form_progress', handleDialogClick);
      core.actions.appprogress.data({ open: true, list })
    }

    input.click();
  }

  handleExport = (item, params) => {
    const url = 'data:application/zip;base64,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'
    
    fetch(url)
    .then(res => res.blob())
    .then((blob) => fileDownload(blob, item.node.title + '.zip'))
  }

  handleMoveNode = (item) => {
    if (item.nextParentNode) {
      const rootid = this.props.state.options.roots[item.path[0]];
      const type = item.node.children !== undefined ? 'folders' : 'nodes';
      const items = [{ nodeid: item.node.id }];
  
      const params = { parentid: item.nextParentNode.id, previd: getPrevNode(item.nextParentNode, item.node) }
      const payload = { [rootid]: { [type] : items } }
  
      core
      .request({ method: 'appnav_move_node', props: this.props, params, payload })
      .ok((res) => {})
      .error(() => {
        core
        .request({ method: 'appnav', props: this.props })
        .ok((res) => core.actions.appnav.data(this.props.stateid, res));
      });
    }
  }

  handleChangePanelSize = (value) => {
    core.actions.appnav.panelWidth(this.props.stateid, value);
  }

  handleScroll = (e) => {
    core.actions.appnav.scroll(this.props.stateid, e);
    
  }

  linkPanel = (e) => {
    this.panel = e;
  }

  render({ state, route } = this.props) {
    if (route.menuid) {
      return (
        <Panel width={state.width} position={this.props.positionPanel} style={styles.panel} onChangeSize={this.handleChangePanelSize}>
          <div ref={this.linkPanel} style={styles.box} onClick={this.handleClickBody} onContextMenu={this.handleContextMenuBody}>  
            <SortableTree
              reactVirtualizedListProps={{ 
                onScroll: this.handleScroll,
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
  (state, props) => state[props.stateid],
  (route, state) => ({ route, state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppNav));