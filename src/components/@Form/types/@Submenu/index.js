import React, { PureComponent } from 'react';
import core from 'core';

import AceEditor from 'react-ace';
import ReactResizeDetector from 'react-resize-detector';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import { Button, Popover, Position, ContextMenu } from '@blueprintjs/core';

import { Scrollbars } from 'react-custom-scrollbars';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Menu from 'components/Menu';
import Form from 'components/@Form';
import Panel from 'components/Panel';

import { withStyles } from '@material-ui/core/styles';

import { 
  getNodesRange, 
  insertNodes, 
  editNodes, 
  removeNodes, 
  findNode, 
  getPrevNode,
  structToMap,
  getFirstChild,
} from 'components/AppNav/utils';

import theme from 'components/AppNav/theme';

import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/mode-text';
import { CodeSharp } from '@material-ui/icons';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  treeContainer: {
    width: '100%',
    height: '100%',
  },
  tree: { 
    padding: 5
  },
  form: { 
    padding: 10,
    overflow: 'hidden',
  },
  downToolbar: {
    display: 'flex',
    height: 31,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTop: '1px solid rgba(16, 22, 26, 0.15)',
  },
  buttonMore: {
    float: 'right',
  },
  buttonSeparator: {
    height: 20,
    margin: '5px 4px',
    borderLeft: '1px solid #d8e1e8',
  },
  buttonSearch: {
    width: '100%',
    height: 24,
    fontSize: 13,
    marginLeft: 8,
    marginRight: 8,
  },
  panel: {
    height: '100%',
    padding: 0,
    flexShrink: 0,
    overflow: 'hidden',
    borderRight: '1px solid #d3d3d3',
  },
}

const classes = theme => ({
  listItemText:{
    fontSize: 14,
  }
});

const EMPTY_ARRAY = [];

function config(type, route) {
  return {
    method: 'sub',
    type: 'debug',
    id: 'plugin',
    nodeid: route.nodeid,
    uuid: `${type}_${route.nodeid}`
  };
}


class Submenu extends PureComponent {

  state = {
    scheme: {},
    data: {},
    cache: {},
    list: [],
    selects: {
      curent: null,
      lastItem: null,
      contextMenu: null,
      data: {},
    },
    loadingTree: true,
    loadingForm: true,
    consoleValue: '', 
    consoleAutoScroll: true,
    windows: {
      mode: 0,
      direction: 'row',
      first: "tree",
      second: 'form',
      splitPercentage: 25,
    },
    scrollTop: 0,
    width: 250,
  };

  componentDidMount() {
    this.nodeid = this.props.route.nodeid;

    const params = { id: this.props.options.data, navnodeid: this.props.route.nodeid };
    core
      .request({ method: 'subtree', params })
      .ok((res) => {
        res.loadingTree = false;
        if (this.props.route.channel) {
          const node = findNode(res.list, this.props.route.channel);
          if (node) {
            if (node.windowHeight - (this.container.clientHeight - 73) > 0) {
              res.scrollTop = node.scrollPoint - ((this.container.clientHeight - 73 - 5) / 2) - 9;
            }
            res.list = editNodes(res.list, (item) => {
              if (item.children !== undefined && node.paths[item.id]) {
                return { ...item, expanded: true };
              }
              return item;
            }); 
          }
        }
        this.setState(state => {
          return { ...state, ...res };
        }, () => {
          if (res.list.length) {
            this.handleChangeRoute({ node: res.list[0] });
          }
        });
      });
    
    if (this.props.route.channelview && this.props.route.channel) {
      this.formRequest(this.props.route.channel, this.props.route.channelview);
    }

    core.transfer.sub('subtree', this.handleTransferData);
    core.transfer.sub('refresh_sub_tree_content', this.handleUpdate);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.route.channel !== this.props.route.channel || 
      prevProps.route.channelview !== this.props.route.channelview
    ) {
      if (this.props.route.channelview && this.props.route.channel) {
        this.formRequest(this.props.route.channel, this.props.route.channelview);
      } else {
        this.setData({ scheme: {}, data: {}, cache: {} });
      }
    }
  }

  componentWillUnmount() {
    core.transfer.unsub('subtree', this.handleTransferData);
    core.transfer.unsub('refresh_sub_tree_content', this.handleUpdate);

    this.isSub && core.tunnel.unsub({
      method: 'unsub',
      type: 'debug',
      id: 'plugin',
      nodeid: this.nodeid,
      uuid: `plugin_${this.nodeid}`
    }, this.handleRealTimeDataConsole);
 

    this.id = null;
    this.rowid = null;
    this.save = null;
    this.nodeid = null;
    this.isSub = null;
  }

  handleUpdate = () => {
    this.formRequest(this.props.route.channel, this.props.route.channelview);
  }

  setData = (data) => {
    this.setState(state => {
      return { ...state, ...data };
    })
  }

  valueBasic = (id, prop, value) => {
    this.setState(state => {
      return { 
        ...state, 
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            [prop]: value,
          }
        }
      };
    })
  }

  valueTable = (id, prop, rowid, name, value) => {
    this.setState(state => {
      return { 
        ...state, 
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            [prop]: state.data[id][prop].map(row => {
              if (row.id === rowid) {
                return { ...row, [name]: value };
              }
              return row;
            })
          }
        }
      };
    })
  }

  addRowTable = (id, prop, row) => {
    this.setState(state => {
      return { 
        ...state, 
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            [prop]: state.data[id][prop].concat(row)
          }
        }
      };
    })
  }

  removeRowTable = (id, prop, rowid, value) => {
    this.setState(state => {
      return { 
        ...state, 
        cache: {
          ...state.cache,
          [id]: {
            ...state.cache[id],
            [prop]: { 
              ...state.cache[id][prop],
              remove: {
                ...state.cache[id][prop]['remove'],
                [rowid]: value
              }
            },
          }
        }
      };
    })
  }

  selectNodeContextMenu = (item = null) => {
    this.setState(state => {
      return { 
        ...state, 
        selects: { 
          ...state.selects, 
          contextMenu: item,
        } 
      };
    })
  }

  handleChangeAutoScroll = () => {
    this.setState(state => {
      return { ...state, consoleAutoScroll: !state.consoleAutoScroll };
    });
  }

  handleClearConsole = () => {
    this.setState(state => {
      return { ...state, consoleValue: '' };
    });
  }

  handleCloseConsole = () => {
    this.isSub = null;
    core.tunnel.unsub({
      method: 'unsub',
      type: 'debug',
      id: 'plugin',
      nodeid: this.nodeid,
      uuid: `plugin_${this.nodeid}`
    }, this.handleRealTimeDataConsole);
  }

  handleClickMenu = (item) => {
    if (this.state.selects.lastItem) {
      this.setState(state => {
        return { 
          ...state, 
          selects: { 
            lastItem: null,
            contextMenu: null,
            data: {}
          } 
        };
      });
    }
    this.handleChangeRoute({ node: item });
  }
  
  renderButtons = (id) => {
    if (id === 'tree' && this.props.options.toolbar) {
      const scheme = {
        main: [
          { id: '1', title: 'Console', click: () => this.handleShowWindow('console') },
          { id: '2', title: 'Controls', click: () => this.handleShowWindow('controls') },
        ]
      }
      return (
        [
          <Popover key="1" content={<Menu scheme={scheme} />} position={Position.BOTTOM_RIGHT}>
            <Button icon="cog" minimal />
          </Popover>
        ]
      )
    }
    if (id === 'console') {
      return (
        [
          this.state.consoleAutoScroll ? 
            <Button key="1" icon="git-commit" minimal onClick={this.handleChangeAutoScroll} /> : 
            <Button key="2" icon="bring-data" minimal onClick={this.handleChangeAutoScroll} />,
          <Button key="3" icon="trash" minimal onClick={this.handleClearConsole} />,
          <Separator key="4" />,
          <div  key="5" data-tip="Expand" key="expand">
            <ExpandButton />
          </div>,
          <div key="6" data-tip="Remove" key="remove">
            <RemoveButton onClick={this.handleCloseConsole} />
          </div>,
        ]
      )
    }
    if (id === 'controls') {
      return (
        [
          <div  key="5" data-tip="Expand" key="expand">
            <ExpandButton />
          </div>,
          <div key="6" data-tip="Remove" key="remove">
            <RemoveButton />
          </div>,
        ]
      )
    }
    return []
  }

  renderComponent = (id) => {
    const { props, state } = this;
    if (id === 'tree' && this.state.loadingTree === false) {
      return (
        <div style={styles.treeContainer} >
          <List component="nav" >
            {state.list.map(i =>
              <ListItem button selected={this.props.route.channel === i.id} onClick={() => this.handleClickMenu(i)}>
                <ListItemText classes={{ primary:  props.classes.listItemText }}  primary={i.title} />
                <ListItemSecondaryAction>
                    <IconButton edge="end">
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
        </div>   
      )
    }
    if (id === 'form') {
      return (
        <Scrollbars style={{width: '100%', height: '100%' }}>
          <div style={styles.form} >
            <Form 
              key={`${props.route.nodeid}_${state.selects.curent}`} 
              debug={false} 
              scheme={state.scheme} 
              route={props.route}
              data={state.data}
              cache={state.cache}
              onChange={this.handleChangeForm}
              heightOffset={230}
            />
          </div>
        </Scrollbars>
      )
    }
    if (id === 'console') {
      return (
        <ReactResizeDetector key={id} handleWidth handleHeight>
          {({ width, height }) => 
            <AceEditor
              ref={this.linkConsole}
              mode="text"
              theme="tomorrow"
              width={width || '100%'}
              height={height || '100%'}
              name={id}
              fontSize={12}
              value={state.consoleValue}
              showPrintMargin={false}
              showGutter={false}
              setOptions={{ useWorker: false }}
              readOnly
            />}
        </ReactResizeDetector>
      )
    }
    return null;
  }

  generateNodeProps = (rowinfo) => {
    const style = {};
    const id = rowinfo.node.id;
    if (this.props.route.channel === id) {
      // style.backgroundColor = 'rgba(158, 158, 158, 0.2)';
      style.fontWeight = 'bold';
    }

    if (this.state.selects.data[id]) {
      // style.backgroundColor = 'rgba(33, 150, 243, 0.2)';
      style.fontWeight = 'bold';
    } else {
      if (this.state.selects.contextMenu && this.state.selects.contextMenu.id === id) {
        style.outline = '1px solid #2196F3';
      }
    }

    return {
      style,
      renameid: null,
      onContextMenu: (e) => this.handleContextMenuNode(e, rowinfo),
      onClick: (e) => this.handleClickNode(e, rowinfo),
    };
  }

  formRequest = (nodeid, channelview, foundPosition = true) => {
    if (this.save) {
      this.id = null;
      this.rowid = null;
      this.save = null;
      core.actions.apppage.data({ save: false });
    }
    const params = { component: channelview, curent: nodeid };
    core
      .request({ method: 'subtree_form', params })
      .ok(this.setData);
  }

  handleClickNode = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.shiftKey) {
      const curent = item.node;
      const last = this.state.selects.lastItem || curent;
      const lastSelects = this.state.selects.data;
      const selects = getNodesRange(this.state.list, last.id, curent.id);
      this.setState(state => {
        return { 
          ...state, 
          selects: { 
            ...state.selects, 
            lastItem: curent,
            data: {
              ...state.selects.data,
              ...selects,
            }
          } 
        };
      });
    } else if (e.ctrlKey || e.metaKey) {
      this.setState(state => {
        return { 
          ...state, 
          selects: { 
            ...state.selects, 
            lastItem: item.node,
            data: {
              ...state.selects.data,
              [item.node.id]: state.selects.data[item.node.id] ? null : item.node 
            }
          } 
        };
      });
    } else {
      if (this.state.selects.lastItem) {
        this.setState(state => {
          return { 
            ...state, 
            selects: { 
              lastItem: null,
              contextMenu: null,
              data: {}
            } 
          };
        });
      }
      this.handleChangeRoute(item);
    }
  }

  handleChangeRoute = (item) => {
    const { route } = this.props;
    const type = item.node.children !== undefined ? 'parent' : 'child';
    const channelview = item.node.component ? item.node.component : this.state.options.common[type].defaultComponent;

    core.route(`${route.menuid}/${route.rootid}/${route.componentid}/${route.nodeid}/${route.tab}/${channelview}/${item.node.id}`);
  }

  handleCheckChild = (node) => {
    if (node.children !== undefined) {
      if (node.expanded === true) {
        return true;
      }
    } 
    return false;
  }

  handleAddNode = (folder, item, contextMenuItem = {}) => {
    let scrollTop = this.state.scrollTop;

    const parent = item.node.children !== undefined ? item.node : item.parentNode === null ? { id: null, children: this.state.list } : item.parentNode; 
    const payload = [{ ...contextMenuItem }];
    const params = { 
      id: this.props.options.data, 
      navnodeid: this.props.route.nodeid,
      parentid: parent.id,
      previd: item.node.id,
    };

    core
      .request({ method: 'subtree_new_node', params, payload })
      .ok((res) => {
        const type = contextMenuItem.popupid === 'folder' ? 'parent' : 'child';
        const list = insertNodes(this.state.list, item.node,  res.data);
        const node = findNode(list, res.data[0].id);

        if (node) {
          if (node.windowHeight - this.container.clientHeight > 0) {
            scrollTop = node.scrollPoint - ((this.container.clientHeight - 5) / 2) - 9;
          }
        }
        this.setData({ scrollTop, list });
        this.handleChangeRoute({ node: res.data[0] });
      });
  }

  handleCopyNode = (item) => {
    let struct;

    const list = [{ id: 'all', root: 'all', children: this.state.list }];

    if (this.state.selects.data[item.node.id]) {
      struct = structToMap(true, { all: 'all' }, list, this.state.selects.data);
    } else {
      struct = structToMap(true, { all: 'all' }, list, item.node.id, item.node.id);
    }
  
    const buffer = struct.map.all;
    core.buffer = { class: 'subtree', type: this.props.route.nodeid, data: buffer  };
  }

  handlePasteNode = (item) => {
    const parent = item.node.children !== undefined ? item.node : item.parentNode === null ? { id: null, children: this.state.list } : item.parentNode; 
    const payload = core.buffer.data;
    const params = {
      id: this.props.options.data, 
      navnodeid: this.props.route.nodeid,
      parentid: parent.id,
      previd: parent.id === item.node.id ? '_bottom': item.node.id
    };
    
    core
    .request({ method: 'subtree_paste_node', params, payload })
    .ok((res) => {
      const list = insertNodes(this.state.list, item.node, res.data);
      this.setData({ list });
    }); 
  }

  handleMoveNode = (item) => {
    const parent = item.nextParentNode !== null ? item.nextParentNode : { id: null, children: this.state.list };

    const params = { 
      id: this.props.options.data, 
      navnodeid: this.props.route.nodeid,
      parentid: parent.id,
      previd: getPrevNode(parent, item.node)
    };
    const payload = [{ nodeid: item.node.id }];
    
    core
      .request({ method: 'subtree_move_node', params, payload })
      .ok((res) => {})
      .error(() => {
        core
          .request({ method: 'subtree', params })
          .ok(this.setData);
      });
  }

  handleRemoveNodes = (item) => {
    let struct;
    const { route } = this.props;
    const params = { id: this.props.options.data, navnodeid: this.props.route.nodeid };
    const list = [{ id: 'all', root: 'all', children: this.state.list }];

    if (this.state.selects.data[item.node.id]) {
      struct = structToMap(true, { all: 'all' }, list, this.state.selects.data);
    } else {
      struct = structToMap(true, { all: 'all' }, list, item.node.id, item.node.id);
    }

    core
    .request({ method: 'subtree_remove_node', params, payload: struct.map.all })
    .ok((res) => {
      const newlist = removeNodes(this.state.list, struct.list);
      this.setData({ 
        list: newlist,
        selects: { lastItem: null, contextMenu: null, data: {} },
      });

      if (struct.list[route.channel]) {
        core.route(`${route.menuid}/${route.rootid}/${route.componentid}/${route.nodeid}/${route.tab}`);
      }
    })
    .error(() => {
      core
        .request({ method: 'subtree', params })
        .ok(this.setData);
    });
  }

  handleDialogClick = (data, context) => {
    if (data === ':exit:' || data === null) {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
      core.actions.appdialog.close();

      if (context.template.variant === 'form') {
        const nodeid = context.template.subnode.id;
        const dialogresult = data;

        const params = { id: this.props.options.data, navnodeid: this.props.route.nodeid };
        const payload = { ...context.template.transferdata, nodeid, dialogresult }

        delete payload.meta;
        delete payload.data;

        core
          .request({ method: 'subtree_dialog_node', params, payload: payload })
          .ok((res) => {
            // core.transfer.send('refresh_sub_tree_content');
          })

      } else {
        const nodeid = context.template.subnode.id;
        const dialogresult = context.component;
  
  
        const params = { id: this.props.options.data, navnodeid: this.props.route.nodeid };
        const payload = { ...context.template.data, nodeid, dialogresult }
        
        core
          .request({ method: 'subtree_dialog_node', params, payload: payload })
          .ok((res) => {
            core.transfer.send('refresh_sub_tree_content');
          })
      }
    } 
  }

  handleShowDialog = (item, menuitem) => {  
    core.transfer.sub('form_dialog', this.handleDialogClick);

    if (menuitem.param.variant === 'form') {
      core.actions.appdialog.data({
        open: true, 
        transferid: 'form_dialog',
        template: {
          ...menuitem.param,
          subnode: item.node,
          transferdata: menuitem.param,
          type: 'form',
          title: menuitem.param.title,
          options: menuitem.param.meta,
          data: menuitem.param.data,
          cache: Object
            .keys(menuitem.param.data)
            .reduce((p, c) => ({ ...p, [c]: { } }), {}),
        },
      });
    } else {
      const _params = menuitem.param;
      const params = {
        disabledSave: _params.save !== undefined ? !_params.save : false,
        ..._params,
        subnode: item.node,
        type: _params.variant,
        selectnodeid: null,
        select: null,
        data: _params,
      }
      
      core.actions.appdialog.data({ 
        open: true, 
        transferid: 'form_dialog',
        template: params,
      });
    }
  }

  handleClickBody = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setData({ selects: { lastItem: null, contextMenu: null, data: {} } });
  }

  handleContextMenuBody = (e) => {
    // this.handleContextMenuNode(e, { node: { id: null } })
  }

  handleContextMenuNode = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    const type = item.node.children !== undefined ? 'parent' : 'child';
    const pos = { left: e.clientX, top: e.clientY };

    const selects = this.state.selects;
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


    const disabled = { disablePaste: this.props.route.nodeid !== core.buffer.type };
    const commands = {
      addNodeByContext: (menuItem) => this.handleAddNode(false, item, menuItem), 
      addNode: () => this.handleAddNode(false, item),
      addFolder: () => this.handleAddNode(true, item),
      copy: () => this.handleCopyNode(item),
      paste: () => this.handlePasteNode(item),
      delete: () =>   core.actions.alert.show(title, message, () => this.handleRemoveNodes(item)),
      dialog: (menuItem) => this.handleShowDialog(item, menuItem),
    };
    let scheme = { main: [] };

    if (this.state.options.common && this.state.options.common[type]) {
      scheme = this.state.options.common[type].popup;

      this.selectNodeContextMenu(item.node);
      ContextMenu.show(
        <Menu 
          scheme={scheme}
          disabled={disabled}
          commands={commands}
          target={item.node.id}
        />, 
        pos, this.selectNodeContextMenu);
    }
  }

  handleChangeTree = (list) => {
    this.setData({ list })
  }

  handleTreeScroll = (e) => {
    this.setData({ scrollTop: e.scrollTop });
  }

  handleSaveDataBasic = (id, component, target, value) => {
    let temp = value;
    if (component.type === 'droplist') {
      temp = value.id;
    }
    this.save[id][component.prop] = temp;
    this.valueBasic(id, component.prop, value);
  }

  handleSaveDataTarget = (id, component, target, value) => {
    if (this.save[id][component.prop] === undefined) {
      this.save[id][component.prop] = {}
    }
    if (this.save[id][component.prop][target.row.id] === undefined) {
      this.save[id][component.prop][target.row.id] = {}
    }

    if (target.op === 'edit') {
      let temp = value;

      if (target.column.type === 'droplist') {
        temp = value.id;
      }
      this.save[id][component.prop][target.row.id][target.column.prop] = temp;
      // this.valueTable(id, component.prop, target.row.id, target.column.prop, value);
    }

    if (target.op === 'add') {
      this.save[id][component.prop][target.row.id] = target.row;
      // this.addRowTable(id, component.prop, target.row);
    }

    if (target.op === 'delete') {
      if (this.save[id][component.prop][target.row.id] === null) {
        delete this.save[id][component.prop][target.row.id];
        this.removeRowTable(id, component.prop, target.row.id, false);
      } else {
        this.save[id][component.prop][target.row.id] = null;
        this.removeRowTable(id, component.prop, target.row.id, true);
      }
    }
  }

  handleChangeForm = (id, component, target, value) => {
    if (component.type === 'smartbutton') {
      if (value.formreq || value.formreset) {
        const params = value.formreq || value.formreset; 
        this.id = params.id;
        this.rowid = params.rowid;
        core
          .request({ method: 'subtree_form_update', params })
          .ok(res => {
            this.setData(res);
            this.save = {};
            Object
              .keys(res.data)
              .forEach(key => {
                Object
                  .keys(res.data[key])
                  .forEach(key2 => {
                    if (typeof res.data[key][key2] === 'object' && res.data[key][key2].changed) {
                      if (!this.save[key]) {
                        this.save[key] = {};
                      }
                      this.save[key][key2] = res.data[key][key2];
                    }
                  });
              });
            core.actions.apppage.data({ save: 'subtree' })
          });
        return;
      } else {
        value = value.result;
      }
    }
    if (!this.save) {
      this.save = {};
      core.actions.apppage.data({ save: 'subtree' })
    }

    if (this.save[id] === undefined) {
      this.save[id] = {}
    }

    if (target) {
      this.handleSaveDataTarget(id, component, target, value);
    } else {
      this.handleSaveDataBasic(id, component, target, value);
    }
  }

  handleTransferData = (button) => {
    console.log(button)
    const { channelview, channel } = this.props.route;
    const params = { component: channelview, curent: channel, rowid: this.rowid };
    if (this.id) {
      params.component = this.id;
    }

    if (button === 'save') {
      const payload = this.save;
      core
      .request({ method: 'subtree_form_save', params, payload })
      .ok(res => {
        if (res.data) {
          const items = res.data.reduce((p, c) => ({ ...p, [c.id]: c }), {});
          const list = editNodes(this.state.list, (item) => {
            if (items[item.id]) {
              return { ...item, ...items[item.id] };
            }
            return item;
          }); 
          this.setData({ list });
        }
        this.formRequest(channel, channelview);
      });
    } else {
      this.formRequest(channel, channelview);
    }
  }

  handleRealTimeDataConsole = (value) => {
    this.setState(state => {
      if (this.state.consoleValue.length > 50 * 5000) {
        return { 
          ...state, 
          consoleValue: state.consoleValue
            .split('\r\n')
            .slice(1500)
            .join('\r\n') + value + '\r\n' 
        };
      }
      return { ...state, consoleValue: state.consoleValue + value + '\r\n' };
    }, () => {
      if (this.console && this.state.consoleAutoScroll) {
        const index = this.console.editor.session.getLength() - 1;
        this.console.editor.scrollToRow(index);
      }
    });
  }

  renderDownToolbar = (id) => {
    if (id === 'tree1' && this.props.options.toolbar) {
      return (
        <div style={styles.downToolbar} >
          <Button icon="plus" minimal />
          <Button disabled={!this.state.selects.curent} icon="minus" minimal onClick={() => {}} />
          <input style={styles.buttonSearch} className="bp3-input search-button" placeholder="Search..." type="text" />
          <Button style={styles.buttonMore}  icon="application" minimal />
        </div>
      )
    }
    return null;
  }

  handleChangeWindows = (data) => {
    this.setState(state => {
      return { ...state, windows: data };
    });
  }

  handleShowWindow = (id) => {
    if (id === 'console') {
      this.isSub = true;
      core.tunnel.sub({
        method: 'sub',
        type: 'debug',
        id: 'plugin',
        nodeid: this.nodeid,
        uuid: `plugin_${this.nodeid}`
      }, this.handleRealTimeDataConsole);
    }
    if (this.state.windows.direction === 'row') {
      this.setState(state => {
        return { 
          ...state, windows: {
            direction: 'column',
            first: {
              direction: 'row',
              first: "tree",
              second: 'form',
              splitPercentage: state.windows.splitPercentage,
            },
            second: id,
            splitPercentage: 70,
          }
        };
      });
    }

    if (this.state.windows.direction === 'column') {
      if (typeof this.state.windows.second === 'string' && this.state.windows.second !== id) {
        this.setState(state => {
          return { 
            ...state, windows: {
              ...state.windows,
              second: {
                direction: 'row',
                first: state.windows.second,
                second: id,
                splitPercentage: 75,
              },
            }
          };
        });
      }
    }
  }

  handleChangePanelSize = (value) => {
    this.setState({ width: value })
  }

  linkContainer = (e) => {
    this.container = e;
  }

  linkConsole = (e) => {
    this.console = e;
  }

  render({ state } = this) {
    return (
      <div ref={this.linkContainer} style={styles.root}>
         <Panel 
          position="right2"
          width={state.width} 
          style={styles.panel}
          onChangeSize={this.handleChangePanelSize}
        >
          {this.renderComponent('tree')}
         </Panel>
         {this.renderComponent('form')}
      </div>
    )
  }    
}


export default withStyles(classes)(Submenu);
