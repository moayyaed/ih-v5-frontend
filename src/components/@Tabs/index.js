import React, { Component } from 'react';
import core from 'core';

import Typography from '@material-ui/core/Typography';

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
  }

  handleClickTab = (e, value) => {
    const { route } = this.props;

    core.cache.componentsParams[route.componentid] = value;
    core.route(`${route.menuid}/${route.rootid}/${route.componentid}/${route.nodeid}/${value}`);
  }

  render({ debug, route, scheme, state } = this.props) {
    return (
      <>
        <Tabs value={route.tab} onChange={this.handleClickTab} >
          {scheme.tabs.map(i => <Tab key={i.id} value={i.id} label={i.title} />)}
        </Tabs>
        <Toolbar save={false} />
        <Scrollbars style={{ width: '100%', height: 'calc(100% - 109px)', backgroundColor: '#f5f5f5' }}>
          <div style={{ padding: 20, paddingTop: 0 }} >
            <Content 
              key={`${route.nodeid}_${route.tab}`} 
              debug={debug}
              route={route} 
              scheme={scheme}
              state={state}
            />
          </div>
        </Scrollbars>

      </>
    );
  }
}


export default ComponentTabs;
