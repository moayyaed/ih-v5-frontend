import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import AppBar from './AppBar';

import Panel from 'components/Panel';
import LeftPanel from './LeftPanel';
import RigtPanel from './RigtPanel';

import shortid from 'shortid';


const styles = {
  container: {
    top: 64, 
    width: '100%', 
    height: 'calc(100% - 64px)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
  },
  container2: {
    width: '100%', 
    height: '100%', 
    backgroundColor: '#f5f5f5',
  },
  panel: {
    height: '100%',
    backgroundColor: '#ECEFF1',
    padding: 0,
    flexShrink: 0,
    overflow: 'hidden',
    borderRight: '1px solid #d3d3d3',
  },
}

const classes = theme => ({
  dialog:  {
    position: 'relative',
    minHeight: '80vh',
    maxHeight: '80vh',
  },
});


class AppBrowse extends Component {
  state = {
    uuid: shortid.generate(),
    width: 300, 
    options: { popupdelete: true, columns: [] },
    data: [],
    loading: false,
    nodeid: null,
    component: 'table',
    node: null,
    form: {
      scheme: {},
      data: {},
      cache: {},
    },
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state.open !== this.props.state.open) {
      this.setState({
        uuid: shortid.generate(),
        width: 300, 
        options: { popupdelete: true, columns: [] },
        data: [],
        loading: false,
        nodeid: null,
        component: 'table',
        node: null,
        form: {
          scheme: {},
          data: {},
          cache: {},
        },
      })
    }
  }

  handleChangePanelSize = (width) => {
    this.setState({ width });
  }

  handleClick = (node) => {
    const component = node.component || 'table';
    this.setState({ node: node || null, component })
  }

  handleAddColumns = (columns) => {
    this.setState({ options: { ...this.state.options, columns } });
  }

  handleAddChannel = (channel) => {
    console.log(channel)
    this.setState({ data: this.state.data.concat({ ...channel, id: shortid.generate() })});
  }

  handleAddChannelList = (channels) => {
    this.setState({ 
      data: this.state.data.concat(channels.map(i => ({ ...i, id: shortid.generate() })))
    });
  }

  onChangeChannel = (id, component, target, value) => {
    if (target) {
      if (target.op === 'edit') {
        let v = value;

        if (target.column.type === 'droplist') {
          v = value.id;
        }
        this.setState({ 
          data: this.state.data.map(i => {
            if (i.id === target.row.id) {
              return { ...i, [target.column.prop]: v }
            }
            return i
          })
        })
      }
  
      if (target.op === 'delete') {
        this.setState({ 
          data: this.state.data.filter(i => {
            if (i.id === target.row.id) {
              return false;
            }
            return true;
          })
        })
      }
    }
  }

  handleSubmit = () => {
    const params = this.props.state.params;
    const payload = this.state.data;

    core
    .request({ method: 'browse_submit', params, payload })
    .ok((res) => {
      console.log(res);
      core.transfer.send('subtree_append', { id: params.nodeid }, res.data, res.refresh);
      core.actions.appbrowse.data({ open: false, parms: {} });
    }); 
  }

  handleLoading = (loading) => {
    this.setState({ loading });
  };

  handleRequest = (props) => {
    if (props.component) {
      const params = { type: 'form', id: 'formPluginHub', nodeid: 'applehomekit' };
      core
        .request({ method: 'browse_form', params })
        .ok(res => {
          if (res.options && res.options.grid && props.node.payload) {
            const payload = props.node.payload;
            const data = {};
            res.options.grid.forEach(item => {
              data[item.id] = {};
              if (res.options[item.id]) {
                res.options[item.id].forEach(i => {
                  data[item.id][i.prop] = payload[i.prop] !== undefined ? payload[i.prop] : '';
                })
              }
            });
            this.setState({ 
              form: {
                ...this.state.form,
                scheme: res.options,
                data: data,
                cache: res.cache, 
              }
            })
          } else {
            this.setState({ 
              form: {
                ...this.state.form,
                scheme: res.options,
                data: res.data,
                cache: res.cache, 
              }
            })
          }
        });
    }
  };

  handleChangeForm = (id, component, target, value) => {
    if (component.type === 'button') {
      if (target === 'scandata') {
        core.tunnel.command({
          method: 'scandata',
          type: 'scan',
          uuid: this.state.uuid,
          params: { 
            unit: this.props.state.params.unit,
            nodeid: this.state.node.id,
            button: component,
            payload: value,
          }
        })
      }
    } else {
      this.setState({
        form: {
          ...this.state.form,
          data: {
            ...this.state.form.data,
            [id]: {
              ...this.state.form.data[id],
              [component.prop]: value,
            }
          }
        }
      })
    }
  }

  handleFormUpdate = (nodeid, data) => {
    if (nodeid === null) {
      this.setState({
        component: 'table',
        node: null,
        form: {
          scheme: {},
          data: {},
          cache: {},
        },
      })
    } else {
      if (this.state.node && this.state.node.id === nodeid) {
        this.setState({
          form: {
            ...this.state.form,
            data: this.state.form.scheme.grid
              .reduce((p, item) => {
                return { 
                  ...p, 
                  [item.id]: this.state.form.scheme[item.id]
                    .reduce((p2, i) => {
                      if (data[i.prop] !== undefined) {
                        return { ...p2, [i.prop]: data[i.prop] }
                      }
                      return { ...p2, [i.prop]: this.state.form.data[item.id][i.prop] }
                    }, {}),
                }
              }, {}),
          }
        })
      }
    }
  }

  render() {
    return (
      <Dialog 
        fullWidth 
        maxWidth="lg"
        open={this.props.state.open}
        classes={{ paper: this.props.classes.dialog }}  
      >
        <AppBar title={'Сканировать'} />
        <div style={styles.container} >
          <Panel 
            width={this.state.width} 
            position="right2"
            style={styles.panel} 
            onChangeSize={this.handleChangePanelSize}
          >
            <LeftPanel
              uuid={this.state.uuid}
              loading={this.state.loading} 
              params={this.props.state.params}
              onClick={this.handleClick}
              onAddColumns={this.handleAddColumns}
              onAddChannel={this.handleAddChannel}
              onAddChannelList={this.handleAddChannelList}
              onLoading={this.handleLoading}
              onFormUpdate={this.handleFormUpdate}  
            />
          </Panel>
          <RigtPanel
            uuid={this.state.uuid}
            node={this.state.node}
            component={this.state.component}
            loading={this.state.loading}  
            options={this.state.options}
            form={this.state.form}
            data={this.state.data}
            onChangeChannel={this.onChangeChannel}
            onChangeForm={this.handleChangeForm}
            onSubmit={this.handleSubmit}
            onLoading={this.handleLoading}
            onRequest={this.handleRequest}     
          />
        </div>
      </Dialog>
    )
  }
}


const mapStateToProps = createSelector(
  state => state.appbrowse,
  (state) => ({ state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppBrowse));