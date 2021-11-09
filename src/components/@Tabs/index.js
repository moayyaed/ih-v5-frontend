import React, { Component } from 'react';
import core from 'core';


import { Scrollbars } from 'react-custom-scrollbars';
import shortid from 'shortid';

import Form from 'components/@Form';

import Tabs from './Tabs';
import Tab from './Tab';
import Toolbar from './Toolbar';

import Content from './Content';


class ComponentTabs extends Component {

  componentDidMount() {
    const { route } = this.props;
    if (!this.props.disabledRoute && route.tab) {
      core.cache.componentsParams[route.componentid] = route.tab;
    }

    this.saveData = { };

    document.addEventListener('keydown', this.handleKeyDown);
    core.transfer.sub('refresh_page', this.refreshPage);
  }

  componentWillUnmount() {
    this.saveData = null;
    document.removeEventListener('keydown', this.handleKeyDown);
    core.transfer.unsub('refresh_page', this.refreshPage);
  }

  handleKeyDown = (e) => {
    if ((e.keyCode == '115' || e.keyCode == '83') && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (this.props.state.save) {
        this.handleToolbarClick('save');
      }
    }
  }

  refreshPage = () => {
    const { route, scheme, state } = this.props;
    this.handleRequest(route, scheme, true);
  }

  handleClickTab = (e, value) => {
    const { route } = this.props;

    if (this.props.disabledRoute) {
      if (this.props.onClick) {
        this.props.onClick(value);
      }
    } else {
      core.cache.componentsParams[route.componentid] = value;
      core.route(`${route.menuid}/${route.rootid}/${route.componentid}/${route.nodeid}/${value}`);
    }
  }

  handleRequest = (route, scheme, force = false) => {
    const tab = scheme.tabs.find(i => i.id === route.tab);

    if (tab !== undefined && tab.component && tab.component.length) {
      const params = { ...tab.component[0], nodeid: route.nodeid };

      core
      .request({ method: 'components_tabs_form', params })
      .ok(res => {
        const nodeid = params.nodeid;
        const path = core.history.location.pathname.replace(`${core.options.routePrefix}/`, '');
        core.cache.tab[nodeid] = path;
        this.saveData[tab.id] = {};
        core.actions.apppage.data({
          save: false,
          id: force ? `${shortid.generate()}_${route.nodeid}_${route.tab}` : `${route.nodeid}_${route.tab}`,
          component: tab.component,
          options: res.options,
          data: res.data,
          cache: res.cache,
        })
      });
    }
  }

  handleRequestSave = (route, scheme, forcePayload) => {
    const tab = scheme.tabs.find(i => i.id === route.tab);
      
    if (tab && (forcePayload || this.saveData[route.tab] !== undefined)) {
      const params = { formid: tab.component[0].id, ...route };
      const payload = forcePayload || this.saveData[route.tab];

      core
      .request({ method: 'components_tabs_form_save', params, payload })
      .ok(res => {
        if (res.data) {
          core.actions.appnav.updateNodes('appnav', res.data);
        }
        this.saveData[route.tab] = {};
        this.handleRequest(route, scheme);
      })
      .error(res => {
        core.actions.form.errors(res.data || {})
      })
    }
  }

  handleChange = (id, component, target, value) => {
    const { route, state } = this.props;

    if (state.save === false) {
      core.actions.apppage.data({ save: true })
    }

    if (this.saveData[route.tab] === undefined) {
      this.saveData[route.tab] = {}
    }
    if (this.saveData[route.tab][id] === undefined) {
      this.saveData[route.tab][id] = {}
    }

    if (target) {
      this.handleSaveDataTarget(id, component, target, value);
    } else {
      this.handleSaveDataBasic(id, component, target, value);
    }
  }

  handleSaveDataBasic = (id, component, target, value) => {
    const { route } = this.props;
    
    let temp = value;
    if (component.type === 'droplist') {
      temp = value.id;
    }
    this.saveData[route.tab][id][component.prop] = temp;
    core.actions.form.valueBasic(id, component.prop, value);
  }

  handleSaveDataTarget = (id, component, target, value) => {
    const { route } = this.props;

    if (this.saveData[route.tab][id][component.prop] === undefined) {
      this.saveData[route.tab][id][component.prop] = {}
    }
    if (this.saveData[route.tab][id][component.prop][target.row.id] === undefined) {
      this.saveData[route.tab][id][component.prop][target.row.id] = {}
    }

    if (target.op === 'edit') {
      let temp = value;

      if (target.column.type === 'droplist') {
        temp = value.id;
      }
      this.saveData[route.tab][id][component.prop][target.row.id][target.column.prop] = temp;
      // core.actions.form.valueTable(id, component.prop, target.row.id, target.column.prop, value);
    }

    if (target.op === 'add') {
      this.saveData[route.tab][id][component.prop][target.row.id] = target.row;
      // core.actions.form.addRowTable(id, component.prop, target.row);
    }

    if (target.op === 'delete') {
      if (this.saveData[route.tab][id][component.prop][target.row.id] === null) {
        delete this.saveData[route.tab][id][component.prop][target.row.id];
        core.actions.form.removeRowTable(id, component.prop, target.row.id, false);
      } else {
        this.saveData[route.tab][id][component.prop][target.row.id] = null;
        core.actions.form.removeRowTable(id, component.prop, target.row.id, true);
      }
    }
  }

  handleToolbarClick = (button) => {
    const { route, scheme, state } = this.props;
    if (typeof state.save === 'string') {
      core.transfer.send(
        state.save, 
        button, 
        payload => this.handleRequestSave(route, scheme, payload), 
        () => this.handleRequest(route, scheme),
      );
    } else if (button === 'save') {
      this.handleRequestSave(route, scheme);
    } else {
      this.saveData[route.tab] = {};
      this.handleRequest(route, scheme);
    }
  }

  render({ debug, route, scheme, state } = this.props) {
    return (
      <>
        <Tabs 
          variant="scrollable" 
          scrollButtons="auto" 
          value={route.tab} 
          onChange={this.handleClickTab}
          style={{ paddingRight: 200 }}
        >
          {scheme.tabs.map(i => <Tab key={i.id} value={i.id} label={i.title} />)}
        </Tabs>
        <Toolbar
          disabled={state.options === undefined || this.props.disabledToolbar || state.options.hidesave}
          route={route}
          save={state.save}
          breadcrumbs={state.data ? state.data.breadcrumbs : []}
          onClick={this.handleToolbarClick}
          mini={state.options && state.options.type === 'menu'}
        />
        <Scrollbars style={{ width: '100%', height: `calc(100% - ${state.options && state.options.type === 'menu' ? 49 : 69}px)`, backgroundColor: '#f5f5f5' }}>
          <div style={{ padding: state.options && state.options.type === 'menu' ? 0 : 20, paddingTop: 0 }} >
            <Content 
              key={`content_${route.nodeid}_${route.tab}`}
              scheme={scheme} 
              route={route}
              onRequest={this.handleRequest}
            />
            <Form 
              key={state.id} 
              debug={debug} 
              scheme={state.options} 
              route={route}
              data={state.data}
              cache={state.cache}
              onChange={this.handleChange}
              heightOffset={160}
            />
          </div>
        </Scrollbars>

      </>
    );
  }
}


export default ComponentTabs;
