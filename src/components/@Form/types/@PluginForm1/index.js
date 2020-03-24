import React, { Component } from 'react';
import core from 'core';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import { Scrollbars } from 'react-custom-scrollbars';
import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';

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
  }
}

const scheme = {
  direction: 'row',
  first: "tree",
  second: 'form',
  splitPercentage: 25,
}

const TITLES = {
  tree: 'Channels',
  form: 'Properties',
}

const EMPTY_ARRAY = [];


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
  };

  componentDidMount() {
    const params = { id: this.props.options.data, nodeid: this.props.route.nodeid };
    core
      .request({ method: 'plugin_tree', params })
      .ok((res) => {
        res.loadingTree = false;
        this.setData(res);
      });
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

    this.setState(state => {
      return { ...state, selects: { ...state.selects, curent: item.node.id } };
    });

    const type = item.node.children !== undefined ? 'parent' : 'child';
    const component = this.state.options.common[type].defaultComponent;
    const params = { ...this.props.route, component };

    core
    .request({ method: 'plugin_tree_form', params })
    .ok((res) => {
      this.setData(res);
    });
    
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

    this.valueBasic(id, component.prop, value);
  }

  handleSaveDataTarget = (id, component, target, value) => {
    if (target.op === 'edit') {
      let temp = value;

      if (target.column.type === 'droplist') {
        temp = value.id;
      }
      this.valueTable(id, component.prop, target.row.id, target.column.prop, value);
    }

    if (target.op === 'add') {
      this.addRowTable(id, component.prop, target.row);
    }

    if (target.op === 'delete') {
      this.removeRowTable(id, component.prop, target.row.id, true);
    }
  }

  handleChangeForm = (id, component, target, value) => {
    if (target) {
      this.handleSaveDataTarget(id, component, target, value);
    } else {
      this.handleSaveDataBasic(id, component, target, value);
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <Mosaic
          className="mosaic-blueprint-theme"
          initialValue={scheme}
          renderTile={(id, path, x) => {
            return (
              <MosaicWindow
                key={id}
                draggable={false}
                title={TITLES[id]}
                additionalControls={EMPTY_ARRAY}
                path={path}
                renderToolbar={null}
                toolbarControls={this.renderButtons(id)}
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