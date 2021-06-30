import React, { Component } from 'react';
import core from 'core';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import shortid from 'shortid';

import { SortableTreeWithoutDndContext as SortableTree } from 'react-sortable-tree';
import theme from 'components/AppNav/theme';
import { editNodes, insertNodes2 } from 'components/AppNav/utils';


import 'react-sortable-tree/style.css'; 



const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%', 
    height: '100%', 
  },
  tree: { 
    padding: 5,
  },
  button: {
    margin: 12,
    flexShrink: 0,
  },
  loading: {
    display: 'flex',
    width: '100%', 
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  loadingProgress: {
    width: 250,
    marginBottom: 4,
  },
  loadingText: {
    marginTop: 4,
  }
}


class LeftPanel extends Component {
  state = { scan: false, tree: [], loading: false }

  componentDidMount() {
    this.uuid = shortid.generate();
  }

  componentWillUnmount() {
    if ( this.state.scan) {
      this.scanStop();
    }
    this.uuid = null;
  }

  scanStart = () => {
    core.tunnel.sub({ 
      method: 'sub',
      type: 'scan',
      uuid: this.uuid,
      params: this.props.params
    }, this.realtimeData);

    this.setState({ scan: true, tree: [], loading: true })
  }

  scanStop = () => {
    core.tunnel.unsub({ 
      method: 'unsub',
      type: 'scan',
      uuid: this.uuid,
      params: this.props.params
    }, this.realtimeData);

    this.setState({ scan: false, loading: false })
  }

  realtimeData = (_, json) => {
    if (json.error) {
      this.setState({ scan: false, loading: false })
    } else {
      if (json.op === 'list') {
        this.setState({ tree: json.data, loading: false })
      }
      if (json.op === 'update') {
        const tree = editNodes(this.state.tree, (row) => {
          if (row.id === json.data.id) {
            return { ...row, title: json.data.title }
          }
          return row;
        });
        this.setState({ tree, loading: false })
      }

      if (json.op === 'add') {
        const tree = insertNodes2(this.state.tree, { id: json.parentid }, json.data)
        this.setState({ tree, loading: false })
      }
    }
  }


  updateNode = ({ node }) => {
    return node;
  }

  handleChangeTree = (data) => {
    this.setState({ tree: data })
  }

  getNodeKey = ({ node }) => {
    return node.id;
  }

  handleClickButton = () => {
    if (this.state.scan) {
      this.scanStop();
    } else {
      this.scanStart();
    }
  }

  render() {
    return (
      <div style={styles.root} >
        {this.state.loading ? 
          <div style={styles.loading}>
            <LinearProgress style={styles.loadingProgress}/> 
            <div style={styles.loadingText}>Загрузка данных с плагина...</div>
          </div>
        :
        <SortableTree
          rowHeight={21}
          innerStyle={styles.tree}
          treeData={this.state.tree}
          onChange={this.handleChangeTree}
          getNodeKey={this.getNodeKey}
          generateNodeProps={this.generateNodeProps}
          canNodeHaveChildren={this.handleCheckChild}
          canDrag={false}
          canDrop={this.handleCanDrop}
          onMoveNode={this.handleMoveNode}
          getNodeKey={({ node }) => node.id}
          theme={theme}
        /> 
        }
        <Button style={styles.button} variant="contained" color="primary" onClick={this.handleClickButton}>
          {this.state.scan ? 'Остановить' : 'Сканировать'}
        </Button>
      </div>
    )
  }
}


export default LeftPanel;