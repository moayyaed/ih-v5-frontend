import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
          if (!this.props.disabledRoute) {
            const path = core.history.location.pathname.replace(`${core.options.routePrefix}/`, '');
            core.actions.apptabs.oneTab(null, { ...node, path });
          }
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

  componentDidUpdate(prevProps) {
    if (prevProps.route.nodeid !== this.props.route.nodeid && this.props.route.nodeid && this.props.route.user === false) {
      const nodeid = this.props.route.nodeid;
      const path = core.history.location.pathname.replace(`${core.options.routePrefix}/`, '');
      const node = findNode(this.props.state.list, nodeid);
      if (node) {
        core.actions.apptabs.oneTab(prevProps.route.nodeid, { ...node, path });
      } else {
        core.actions.apptabs.oneTab(prevProps.route.nodeid, { id: nodeid, title: nodeid, path });
      }
    } else {
      if (prevProps.route.nodeid !== this.props.route.nodeid && !this.props.route.nodeid){
        core.actions.apptabs.data({ list: [] });
      }
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

  handleChangeRoute = (type, rootid, item, tab) => {
    const { state, route } = this.props;
    const componentid = item.node.component || state.options[rootid][type].defaultComponent;
  
    if (this.props.disabledRoute) {
      core.actions.appnav.clickNode(this.props.stateid, componentid, item.node.id);
      if (this.props.onClickNode) {
        this.props.onClickNode(item, componentid, item.node.id, state);
      }
    } else {
      if (tab) {
        const params = '/' + core.options.componentsScheme[componentid].defaultTab;
        const path = `${route.menuid}/${rootid}/${componentid}/${item.node.id}${params}`;
        core.actions.apptabs.add({ ...item.node, path });
        core.route(path);
      } else {
        const params = core.cache.componentsParams[componentid] ?  
        '/' + core.cache.componentsParams[componentid] :
        '/' + core.options.componentsScheme[componentid].defaultTab;
        const path = `${route.menuid}/${rootid}/${componentid}/${item.node.id}${params}`;
        core.actions.apptabs.oneTab(route.nodeid, { ...item.node, path });
        core.route(path);
      }
    }
  }

  handleClickNode = (e, item) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }


    if (e && e.shiftKey) {
      const curent = item.node;
      const last = this.props.state.selects.lastItem || curent;
      const lastSelects = this.props.state.selects.data;
      const selects = getNodesRange(this.props.state.list, last.id, curent.id);
      core.actions.appnav.selectNodes(this.props.stateid, curent, selects);
    } else if (e && (e.ctrlKey || e.metaKey)) {
      core.actions.appnav.selectNode(this.props.stateid, item.node);
    } else {
      if (this.props.state.selects.lastItem) {
        core.actions.appnav.clearSelected(this.props.stateid);
      }

      const rootid = this.props.state.options.roots[item.path[0]];
      const type = item.node.children !== undefined ? 'parent' : 'child';
  
      this.handleChangeRoute(type, rootid, item, e === null);
    }
  }

  handleContextMenuBody = (e) => {
    e.preventDefault();
    e.stopPropagation();
    /*

    const pos = { left: e.clientX, top: e.clientY };
    const scheme = {
      main: [
        { id: 'newDevice', title: 'New device', click: this.handleAddNode },
        { id: 'newType', title: 'New type', click: this.handleAddNode },
      ]
    }

    ContextMenu.show(<Menu scheme={scheme} />, pos);
    */
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
    const selects = this.props.state.selects;
    let files = ''
    if (selects.data[item.node.id]) {
      const temp = Object.keys(selects.data);
      if (temp.length > 5) {
        files = temp
        .slice(0, 5)
        .map(key => ` ❌   ${selects.data[key].title}`)
        .join('\r\n') + `\r\n ... и ещё ${temp.length - 5}`;
      } else {
        files = temp
          .map(key => ` ❌   ${selects.data[key].title}`)
          .join('\r\n');
      }
    } else {
      files = ` ❌   ${item.node.title}`;
    }
  
    const title = 'Подтверждение удаления';
    const message = `Вы действительно хотите удалить?\r\n\r\n${files}`;

    const disabled = { disablePaste: root !== core.buffer.type };
    const commands = {
      addNodeByContext: (menuItem) => this.handleAddNode(false, item, menuItem), 
      addNode: () => this.handleAddNode(false, item),
      addFolder: () => this.handleAddNode(true, item),
      copy: () => this.handleCopyNode(item),
      paste: () => this.handlePasteNode(item),
      delete: () =>   core.actions.alert.show(title, message, () => this.handleRemoveNodes(item)),
      upload: (menuItem) => this.handleUpload(item, menuItem),
      export: (menuItem) => this.handleExport(item, menuItem),
      newtab: (menuItem) => this.handleClickNode(null, item),
      send: (menuItem) => this.handleServerCommand(item, menuItem),
    };

    let scheme = { main: [] };
     
    const params = this.props.state.options[rootid][type]; 
    if (params !== undefined && params.popup) {
      scheme = params.popup;

      /*
      if (!this.props.disabledRoute) {
        scheme = { ...scheme, main: [
          ].concat(scheme.main)
        }
      } */
      
      core.actions.appnav.selectNodeContextMenu(this.props.stateid, item.node);
      ContextMenu.show(
        <Menu 
          scheme={scheme}
          disabled={disabled}
          commands={commands}
          target={item.node.id}
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
      } else {
        if (this.props.route.componentid === 'imagefolder') {
          core.transfer.send('refresh_content');
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
          xhr.setRequestHeader('token', core.cache.token);
          xhr.send(data);
        } else {
          if (!complete) {
            xhr.abort();
          }

          list.forEach(i => URL.revokeObjectURL(i.src));

          core.transfer.unsub('form_progress', handleDialogClick);
          core.actions.appprogress.data({ open: false, type: 'upload', list: [], progress: 0, complete: false, message: 'submit' })
        }
      }

      xhr.upload.onloadstart = function(e) {
        core.actions.appprogress.data({ message: 'uploading' })
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
              core.actions.appprogress.data({ complete: true, message: 'complete' });

              if (this.props.route.componentid === 'imagefolder') {
                core.transfer.send('refresh_content');
              }
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
      core.actions.appprogress.data({ open: true, type: 'upload', list })
    }

    input.click();
  }

  handleExport = (item, params) => {
    const xhr = new XMLHttpRequest();

    const nodeid = item.node.id;
    const param = params.param;

    core
      .request({ method: 'download_files', params: { nodeid, param } })
      .ok((res) => {
        let timer = null;

        function handleDialogClick() {
          core.transfer.unsub('form_progress', handleDialogClick);
          clearTimeout(timer);
          core.actions.appprogress.data({ open: false, progress: 0, error: null, title: null })
        }

        core.transfer.sub('form_progress', handleDialogClick);
        core.actions.appprogress.data({ open: true, title: res.title, title2: `file: ${res.filename || item.node.title + '.ihpack'}`, type: 'download', progress: 0 })

        xhr.responseType = 'blob';
        xhr.open('GET', res.url);
        xhr.setRequestHeader('token', core.cache.token);
        xhr.send();

        xhr.onerror = (e) => {
          core.actions.appprogress.data({ error: e.message })
        }

        xhr.onprogress = (e) => {
          const progress = Math.round((e.loaded / e.total) * 100);
          core.actions.appprogress.data({ progress })
        }

        xhr.onload = () => {
          if (xhr.status === 200) {
            fileDownload(xhr.response, res.filename || item.node.title + '.ihpack');
            // timer = setTimeout(handleDialogClick, 2000);
          } else {
            core.actions.appprogress.data({ error: `Response return status: ${xhr.status}` })
          }
        }
      });
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

  handleServerCommand = (item, menu) => {
    core
      .request({ method: 'server_command', props: this.props, params: { 
        nodeid: item.node.id, param: menu.param 
      }})
      .ok(res => {
        if (this.props.route.nodeid) {
          core.transfer.send('refresh_content');
        }
      });
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