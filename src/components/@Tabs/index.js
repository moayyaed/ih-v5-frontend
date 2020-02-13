import React, { Component } from 'react';
import core from 'core';

import Typography from '@material-ui/core/Typography';

import Prism from 'prismjs';
import './prism.css';

import Tabs from './Tabs';
import Tab from './Tab';

console.log(Prism)

class ComponentTabs extends Component {

  componentDidMount() {
    Prism.highlightAll (); 
    const { route } = this.props;
    if (route.tab) {
      core.cache.componentsParams[route.componentid] = route.tab;
      this.request(route.tab);
    }
  }

  handleClickTab = (e, value) => {
    const { route } = this.props;

    core.cache.componentsParams[route.componentid] = value;
    core.route(`${route.menuid}/${route.rootid}/${route.componentid}/${route.nodeid}/${value}`);
    this.request(value);
  }

  request = (tabid) => {
    const { route, scheme } = this.props;
    const tab = scheme.tabs.find(i => i.id === tabid);

    if (tab !== undefined && tab.component && tab.component.length) {
      const params = { ...tab.component[0], nodeid: route.nodeid };
      core
        .request({ method: 'components_tabs', params })
        .ok(res => {
          core.actions.apppage.data({
            componentid: route.componentid,
            data: res.data,
            scheme: res.scheme,
          })
          Prism.highlightAll (); 
        });
    }
  }

  render({ route, scheme, state } = this.props) {
    return (
      <>
        <Tabs value={route.tab} onChange={this.handleClickTab} >
          {scheme.tabs.map(i => <Tab key={i.id} value={i.id} label={i.title} />)}
        </Tabs>
        <Typography />
        <div style={{ width: '100%', height: 'calc(100% - 119px)', overflow: 'auto', backgroundColor: '#f5f5f5', padding: 20 }}>
          <pre> 
            <code className = "language-javascript"> 
              {JSON.stringify(state.scheme, null, 2)}
            </ code> 
          </ pre>
          <pre> 
            <code className = "language-javascript"> 
            {JSON.stringify(state.data, null, 2)}
            </ code> 
          </ pre>
        </div>
      </>
    );
  }
}


export default ComponentTabs;
