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
    this.struct = {}
    this.animations = {};
    this.uuid = shortid.generate();

    this.link.addEventListener('animationend', (e) => {
      if (e.animationName === 'PULSE' || e.animationName === 'PULSE2') {
        e.path.forEach(i => {
          if (i.id) {
            delete this.animations[i.id];
          }
        });
      }
    });
  }

  componentWillUnmount() {
    if ( this.state.scan) {
      this.scanStop();
    }
    this.uuid = null;
    this.animations = null;
  }

  scanStart = () => {
    core.tunnel.sub({ 
      method: 'sub',
      type: 'scan',
      uuid: this.uuid,
      params: this.props.params
    }, this.realtimeData);
    this.animations = {};
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
        this.setStructTree({}, json.data)
        this.setState({ tree: json.data, loading: false })
      }
      if (json.op === 'update') {
        this.setAnimationUpdate(json.data, Date.now())
        const tree = editNodes(this.state.tree, (row) => {
          if (json.data[row.id] !== undefined) {
            return { ...row, title: json.data[row.id].title }
          }
          return row;
        });
        this.setState({ tree, loading: false })
      }

      if (json.op === 'add') {
        this.setAnimationAdd(json.parentid, json.data, Date.now())
        const tree = insertNodes2(this.state.tree, { id: json.parentid }, json.data)
        this.setState({ tree, loading: false })
      }
    }
  }

  setStructTree = (map, data) => {
    data
      .forEach(i => {
        this.struct[i.id] = map;
        if (i.children !== undefined) {
          this.setStructTree({ ...map, [i.id]: true }, i.children);
        }
      })
  }

  setAnimationChildren = (list, t) => {
    list.forEach(i => {
      this.animations[i.id] = { t, a: '1' };
      if (i.children) {
        this.setAnimationChildren(i.children, t);
      }
    });
  }

  setAnimationUpdate = (data, t) => {
    Object
      .keys(data)
      .forEach(key => { 
        if (this.animations[key] === undefined) {
          this.animations[key] = { t, a: '1' };
        } else {
          if (this.animations[key].t !== t) {
            this.animations[key].t = t;
            this.animations[key].a = this.animations[key].a === '1' ?  '2' : '1';
          }
        }
        if (this.struct[key]) {
          Object
            .keys(this.struct[key])
            .forEach(i => {
              if (this.animations[i] === undefined) {
                this.animations[i] = { t, a: '1' };
              } else {
                if (this.animations[i].t !== t) {
                  this.animations[i].t = t;
                  this.animations[i].a = this.animations[i].a === '1' ?  '2' : '1';
                }
              }
            });
        }
      });
  }

  setAnimationAdd = (parentid, data, t) => {
    this.animations[parentid] = { t, a: '1' }
    this.animations[data.id] = { t, a: '1' }
    this.setStructTree(this.struct[parentid] || {}, [data]);
    if (data.children) {
      this.setAnimationChildren(data.children, t);
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

  generateNodeProps = (row) => {
    //row.node.expanded
    if (this.animations[row.node.id] !== undefined && row.node.channel !== undefined) {
      return {
        id: row.node.id,
        className: 'tree-text-pulse' + this.animations[row.node.id].a,
      };
    }

    if (this.animations[row.node.id] !== undefined && !row.node.expanded) {
      return {
        id: row.node.id,
        className: 'tree-text-pulse' + this.animations[row.node.id].a,
      };
    }
    return { id: row.node.id };
  }

  linked = (e) => {
    this.link = e;
  }

  render() {
    return (
      <div ref={this.linked} style={styles.root} >
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