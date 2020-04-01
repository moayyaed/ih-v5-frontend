import React, { Component } from 'react';
import core from 'core';

import Tabs from 'components/@Tabs';

const styles = {
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

const scheme = {
  tabs: [
    { id: '1', title: 'Information', component: [{id: 'formPluginFolder', type: 'form'}] },
    { id: '2', title: 'Plugins', component: [{id: 'formPluginCommon', type: 'form'}] },
    { id: '3', title: 'Web Console', component: [{id: 'formSceneCodeEditor', type: 'form'}] },
    { id: '4', title: 'File Explorer', component: [{id: 'formUnitChannels', type: 'form'}] },
  ],
  defaultTab: '1',
};

class Dashboard extends Component {
  state = { 
    debug: false,
    scheme,
    route: {
      menuid: 'datasource',
      rootid: 'plugins',
      componentid: 'pluginview',
      nodeid: 'modbus1',
      tab: scheme.defaultTab,
      channelview: null,
      channel: null,
    },
  };

  componentWillUnmount() {
    core.actions.apppage.clear();
  }

  handleClickTab = (tab) => {
    if (tab === '1') {
      this.setState(state => { 
        return {
          ...state,
          route: { 
            menuid: 'datasource',
            rootid: 'plugins',
            componentid: 'pluginview',
            nodeid: 'plugin_modbus',
            tab: tab,
            channelview: null,
            channel: null,
          },
        };
      });
    } else if (tab === '3') {
      this.setState(state => { 
        return {
          ...state,
          route: { 
            menuid: 'scenes',
            rootid: 'scenes',
            componentid: 'scenescript',
            nodeid: 'scen012',
            tab: tab,
            channelview: null,
            channel: null,
          },
        };
      });
    } else {
      this.setState(state => { 
        return {
          ...state,
          route: { 
            menuid: 'datasource',
            rootid: 'plugins',
            componentid: 'pluginview',
            nodeid: 'modbus1',
            tab: tab,
            channelview: null,
            channel: null,
          },
        };
      });
    }
  }

  handleKeyDown = (e) => {
    if (e.altKey && e.keyCode === 68) {
      this.setState(state => { 
        return {
          ...state,
          debug: !state.debug,
        };
      });
    }
  }

  render() {
    return (
      <div className="apppage" tabIndex="0" style={styles.root} onKeyDown={this.handleKeyDown} >
        <Tabs 
          disabledRoute
          disabledToolbar
          debug={this.state.debug}
          scheme={this.state.scheme} 
          route={this.state.route} 
          state={this.props.state} 
          onClick={this.handleClickTab}
        />
      </div>
    );
  }
}


export default Dashboard;

