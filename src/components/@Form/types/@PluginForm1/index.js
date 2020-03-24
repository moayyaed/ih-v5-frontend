import React, { Component } from 'react';
import core from 'core';

import { 
  MosaicWithoutDragDropContext as Mosaic, MosaicWindow, 
  RemoveButton, ExpandButton, Separator, 
} from 'react-mosaic-component';

import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';

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
import { compose } from 'redux';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
  tree: { 
    padding: 5
  },
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
    loading: false,
    list: [],
    selects: {
      curent: null,
      lastItem: null,
      contextMenu: null,
      data: {},
    },
  };

  componentDidMount() {
    const params = { id: this.props.options.data, nodeid: this.props.route.nodeid };
    core
      .request({ method: 'appnav', params })
      .ok((res) => {
        res.loading = true;
        this.setData(res);
      });
  }

  setData = (data) => {
    this.setState(state => {
      return { ...state, ...data };
    })
  }
  
  renderButtons = (id) => {
    return []
  }

  renderComponent = (id) => {
    const { props, state } = this;
    if (id === 'tree' && this.state.loading !== false) {
      return (
        <SortableTree
          rowHeight={21}
          innerStyle={styles.tree}
          treeData={this.state.list}
          getNodeKey={({ node }) => node.id}
          theme={theme}
          generateNodeProps={this.generateNodeProps}
          onChange={this.handleChangeTree}
        />   
      )
    }
    if (id === 'form') {
      return <div>FORM_COMPONENT</div>
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
  }

  handleContextMenuNode = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleChangeTree = (list) => {
    this.setData({ list })
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