import React, { Component } from 'react';
import core from 'core';

import Typography from '@material-ui/core/Typography';

import Tabs from './Tabs';
import Tab from './Tab';


class ComponentTabs extends Component {

  componentDidMount() {
    if (this.props.route.tab) {
      const { route } = this.props;
      core.cache.componentsParams[route.componentid] = route.tab;
    }
  }

  handleClickTab = (e, value) => {
    const { route } = this.props;

    core.cache.componentsParams[route.componentid] = value;
    core.route(`${route.menuid}/${route.rootid}/${route.componentid}/${route.nodeid}/${value}`);
  }

  render({ route, scheme } = this.props) {
    return (
      <div>
        <Tabs value={route.tab} onChange={this.handleClickTab} >
          {scheme.tabs.map(i => <Tab key={i.id} value={i.id} label={i.title} />)}
        </Tabs>
      </div>
    );
  }
}


export default ComponentTabs;

/*
<div >

<Typography className={classes.padding} />
</div>
<div style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5', padding: 20 }}>
CONTENT
</div>
*/