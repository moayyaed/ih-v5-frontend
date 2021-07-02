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
    width: 300, 
    options: { popupdelete: true, columns: [] },
    data: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state.open !== this.props.state.open) {
      this.setState({
        width: 300, 
        options: { popupdelete: true, columns: [] },
        data: [],
      })
    }
  }

  handleChangePanelSize = (width) => {
    this.setState({ width });
  }

  handleAddColumns = (columns) => {
    this.setState({ options: { ...this.state.options, columns } });
  }

  handleAddChannel = (channel) => {
    this.setState({ data: this.state.data.concat({ ...channel, id: shortid.generate() })});
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
      core.transfer.send('subtree_append', { id: params.nodeid }, res.data);
      core.actions.appbrowse.data({ open: false, parms: {} });
    }); 
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
              params={this.props.state.params}
              onAddColumns={this.handleAddColumns}
              onAddChannel={this.handleAddChannel}  
            />
          </Panel>
          <RigtPanel 
            options={this.state.options}
            data={this.state.data}
            onChangeChannel={this.onChangeChannel}
            onSubmit={this.handleSubmit}    
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