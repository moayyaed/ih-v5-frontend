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
  state = { width: 300 }

  handleChangePanelSize = (width) => {
    this.setState({ width });
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
            <LeftPanel params={this.props.state.params} />
          </Panel>
          <RigtPanel />
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