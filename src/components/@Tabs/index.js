import React, { Component } from 'react';
import core from 'core';


import { Scrollbars } from 'react-custom-scrollbars';

import Tabs from './Tabs';
import Tab from './Tab';
import Toolbar from './Toolbar';

import Content from './Content';


class ComponentTabs extends Component {

  componentDidMount() {
    const { route } = this.props;
    if (route.tab) {
      core.cache.componentsParams[route.componentid] = route.tab;
    }

    this.saveData = { };
  }

  componentWillUnmount() {
    this.saveData = null;
  }

  handleClickTab = (e, value) => {
    const { route } = this.props;

    core.cache.componentsParams[route.componentid] = value;
    core.route(`${route.menuid}/${route.rootid}/${route.componentid}/${route.nodeid}/${value}`);
  }

  handleRequest = (route, scheme) => {
    const tab = scheme.tabs.find(i => i.id === route.tab);

    if (tab !== undefined && tab.component && tab.component.length) {
      const params = { ...tab.component[0], nodeid: route.nodeid };
      core
        .request({ method: 'components_tabs', params })
        .ok(res => {
          core.actions.apppage.data({
            save: false,
            id: `${route.nodeid}_${route.tab}`,
            component: tab.component,
            options: res.options,
            data: res.data,
            error: {},
          })
        });
    }
  }

  handleChange = (id, component, target, value) => {
    const { state } = this.props;
    if (state.save === false) {
      core.actions.apppage.data({ save: true })
    }

    if (target) {
      this.handleSaveData(id, component, target, value);
      core.actions.apppage.valueFormTable(id, component.prop, target.row.id, target.column.prop, value);
    } else {
      this.handleSaveData(id, component, target, value);
      core.actions.apppage.valueFormBasic(id, component.prop, value);
    }
  }

  handleSaveData = (id, component, target, value) => {
    const { route } = this.props;
    if (this.saveData[route.tab] === undefined) {
      this.saveData[route.tab] = {}
    }
    if (this.saveData[route.tab][id] === undefined) {
      this.saveData[route.tab][id] = {}
    }
    if (target) {
      let temp = value;

      if (target.column.type === 'droplist') {
        temp = value.id;
      }
      if (this.saveData[route.tab][id][component.prop] === undefined) {
        this.saveData[route.tab][id][component.prop] = {}
      }
      if (this.saveData[route.tab][id][component.prop][target.row.id] === undefined) {
        this.saveData[route.tab][id][component.prop][target.row.id] = {}
      }

      this.saveData[route.tab][id][component.prop][target.row.id][target.column.prop] = temp;
    } else {
      let temp = value;

      if (component.type === 'droplist') {
        temp = value.id;
      }
  
      this.saveData[route.tab][id][component.prop] = temp;
    }
  }

  handleToolbarClick = (button) => {
    const { route, scheme } = this.props;
    
    if (button === 'save') {
      const tab = scheme.tabs.find(i => i.id === route.tab);
      
      if (tab && this.saveData[route.tab] !== undefined) {
        const params = { formid: tab.component[0].id, ...route };
        const payload = this.saveData[route.tab];
        
        core
          .request({ method: 'components_tabs_form_save', params, payload })
          .ok(res => {
            this.saveData[route.tab] = {};
            this.handleRequest(route, scheme);
          })
          .error(res => {
            core.actions.apppage.data({ error: res.data || {} })
          })
      }
    } else {
      this.saveData[route.tab] = {};
      this.handleRequest(route, scheme);
    }
  }

  render({ debug, route, scheme, state } = this.props) {
    return (
      <>
        <Tabs value={route.tab} onChange={this.handleClickTab} >
          {scheme.tabs.map(i => <Tab key={i.id} value={i.id} label={i.title} />)}
        </Tabs>
        <Toolbar 
          save={state.save}
          onClick={this.handleToolbarClick}
        />
        <Scrollbars style={{ width: '100%', height: 'calc(100% - 109px)', backgroundColor: '#f5f5f5' }}>
          <div style={{ padding: 20, paddingTop: 0 }} >
            <Content 
              key={`${route.nodeid}_${route.tab}`} 
              debug={debug}
              route={route} 
              scheme={scheme}
              state={state}
              onRequest={this.handleRequest}
              onChange={this.handleChange}
            />
          </div>
        </Scrollbars>

      </>
    );
  }
}


export default ComponentTabs;
