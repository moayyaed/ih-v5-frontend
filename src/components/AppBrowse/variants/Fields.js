import React, { Component } from 'react';
import core from 'core';

import Menu from 'components/Menu';
import { ContextMenu } from "@blueprintjs/core";

import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import Form from 'components/@Form';

import shortid from 'shortid';



const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%', 
    height: '100%', 
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


class Fields extends Component {
  state = { 
    scan: false,
    loading: false,
    data: this.props.params.fields
      .reduce((p, c) => ({ 
        ...p, 
        [c.prop]: c.default === undefined ? '' : c.default 
      }), {})
  }

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
      params: { unit: this.props.params.unit }
    }, this.realtimeData);
    this.animations = {};
    this.setState({ scan: true, tree: [], loading: true })
  }

  scanStop = () => {
    core.tunnel.unsub({ 
      method: 'unsub',
      type: 'scan',
      uuid: this.uuid,
      params: { unit: this.props.params.unit }
    }, this.realtimeData);

    this.setState({ scan: false, loading: false })
  }

  realtimeData = (_, json) => {
    if (json.error) {
      this.setState({ scan: false, loading: false })
    } else {

    }
  }

  handleClickButton = () => {
    if (this.state.scan) {
      this.scanStop();
    } else {
      this.scanStart();
    }
  }

  handleChangeForm = (_, { prop }, __, value) => {
    this.setState({ data: { ...this.state.data, [prop]: value } })
  }
  // this.props.onAddChannel(node.channel)

  render() {
    return (
      <div style={styles.root} >
        {this.state.loading ? 
          <div style={styles.loading}>
            <LinearProgress style={styles.loadingProgress}/> 
            <div style={styles.loadingText}>Загрузка данных с плагина...</div>
          </div>
        :
          <div style={{ padding: 12 }}>
            <Form 
              key='browse' 
              debug={false} 
              scheme={{
                grid: [{ id: 'p1', xs: 12, class: 'main' }],
                spacing: 10,
                p1: this.props.params.fields,
              }} 
              route={{}}
              data={{ p1: this.state.data }}
              cache={{ p1: {} }}
              onChange={this.handleChangeForm}
              heightOffset={160}
            />
          </div>
        }
        <Button style={styles.button} variant="contained" color="primary" onClick={this.handleClickButton}>
          {this.state.scan ? 'Остановить' : 'Сканировать'}
        </Button>
      </div>
    )
  }
}


export default Fields;