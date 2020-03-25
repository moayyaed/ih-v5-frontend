import React, { Component } from 'react';
import core from 'core';

import AceEditor from 'react-ace';
import ReactResizeDetector from 'react-resize-detector';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import { Button, Popover, Position } from "@blueprintjs/core";

import { Scrollbars } from 'react-custom-scrollbars';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';

import Menu from 'components/Menu';
import Form from 'components/@Form';

import { 
  getNodesRange, 
  insertNodes, 
  editNodes, 
  removeNodes, 
  findNode, 
  getOrder, 
  getOrderMove, 
  structToMap 
} from 'components/AppNav/utils';

import theme from 'components/AppNav/theme';

import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/mode-text';


const styles = {
  root: {
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
}


const TITLES = {
  tree: 'Channels',
  form: 'Properties',
  console: 'Console',
  controls: 'Controls',
}

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

class PluginForm1 extends Component {

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
    }
  };

  componentDidMount() {
    const params = { id: this.props.options.data, nodeid: this.props.route.nodeid };
    core
      .request({ method: 'plugin_tree', params })
      .ok((res) => {
        res.loadingTree = false;
        this.setData(res);
      });
    core.transfer.sub('pluginform1', this.handleTransferData);
    core.tunnel.sub(config('plugin', this.props.route), this.handleRealTimeDataConsole);
  }

  componentWillUnmount() {
    this.save = null;
    core.transfer.unsub('pluginform1', this.handleTransferData);
    core.tunnel.unsub(config('plugin', this.props.route), this.handleRealTimeDataConsole);
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
  
  renderButtons = (id) => {
    if (id === 'tree') {
      const scheme = {
        main: [
          { id: '1', title: 'Console', click: () => this.handleShowWindow('console') },
          { id: '2', title: 'Controls', click: () => this.handleShowWindow('controls') },
        ]
      }
      return (
        [
          <Popover content={<Menu scheme={scheme} />} position={Position.BOTTOM_RIGHT}>
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
            <RemoveButton />
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
        <SortableTree
          key={props.route.nodeid}
          rowHeight={21}
          innerStyle={styles.tree}
          treeData={state.list}
          getNodeKey={({ node }) => node.id}
          theme={theme}
          canNodeHaveChildren={this.handleCheckChild}
          generateNodeProps={this.generateNodeProps}
          onChange={this.handleChangeTree}
        />   
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
              heightOffset={268}
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
    if (this.state.selects.curent === id) {
      style.backgroundColor = 'rgba(158, 158, 158, 0.2)';
    }

    if (this.state.selects.data[id]) {
      style.backgroundColor = 'rgba(158, 158, 158, 0.2)';
    } else {
      if (this.state.selects.contextMenu && this.props.state.selects.contextMenu.id === id) {
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

  handleClickNode = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    const type = item.node.children !== undefined ? 'parent' : 'child';
    const component = item.node.component ? item.node.component : this.state.options.common[type].defaultComponent;
    const params = { component, curent: item.node.id };

    this.setState(state => {
      return { ...state, selects: { ...state.selects, curent: item.node.id, component } };
    });

    core
    .request({ method: 'plugin_tree_form', params })
    .ok(this.setData);
    
  }

  handleCheckChild = (node) => {
    if (node.children !== undefined) {
      if (node.expanded === true) {
        return true;
      }
    } 
    return false;
  }

  handleContextMenuNode = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleChangeTree = (list) => {
    this.setData({ list })
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
      this.valueTable(id, component.prop, target.row.id, target.column.prop, value);
    }

    if (target.op === 'add') {
      this.save[id][component.prop][target.row.id] = target.row;
      this.addRowTable(id, component.prop, target.row);
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
    if (!this.save) {
      this.save = {};
      core.actions.apppage.data({ save: 'pluginform1' })
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
    if (button === 'save') {
      const params = this.state.selects;
      const payload = this.save;
      core
      .request({ method: 'plugin_tree_form_save', params, payload })
      .ok(res => {
        this.save = {};
        core
          .request({ method: 'plugin_tree_form', params: this.state.selects })
          .ok(this.setData);
      });
    } else {
      this.save = null;
      core.actions.apppage.data({ save: false });
      core
        .request({ method: 'plugin_tree_form', params: this.state.selects })
        .ok(this.setData);
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
    if (id === 'tree') {
      const scheme = {
        main: [
          { id: 'newDevice', title: 'New device'},
          { id: 'newType', title: 'New type'},
        ]
      }
      return (
        <div style={styles.downToolbar} >
          
          <Popover content={<Menu scheme={scheme} />} position={Position.TOP_LEFT}>
            <Button icon="plus" minimal />
          </Popover>
          <Button disabled={!this.state.selects.curent} icon="minus" minimal onClick={() => {}} />
          <input style={styles.buttonSearch} class="bp3-input" placeholder="Search..." type="text" />
          <Button style={styles.buttonMore} icon="application" minimal onClick={() => {}} />
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
      if (this.state.windows.second !== id) {
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

  linkConsole = (e) => {
    this.console = e;
  }

  render() {
    return (
      <div style={styles.root}>
        <Mosaic
          className="mosaic-blueprint-theme"
          value={this.state.windows}
          onChange={this.handleChangeWindows}
          renderTile={(id, path) => {
            return (
              <MosaicWindow
                key={id}
                draggable={false}
                title={TITLES[id]}
                additionalControls={EMPTY_ARRAY}
                path={path}
                renderToolbar={null}
                toolbarControls={this.renderButtons(id)}
                renderPreview={() => this.renderDownToolbar(id)}
              >
                {this.renderComponent(id)}
              </MosaicWindow>
            )
          }}
        />
      </div>
    )
  }    
}


export default PluginForm1;