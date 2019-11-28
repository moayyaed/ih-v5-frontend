import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import AppNav from 'components/AppNav';
import AppTabs from 'components/AppTabs';
import AppPage from 'components/AppPage';

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
};

const classes = theme => ({
  root: {
  },
});


class AppBody extends Component {

  checkTabs = (item) => {
    const { options, tabs } = this.props.state;
    if (options.tabs) {
      const find = tabs.find(i => i.id === item.id);
      if (find === undefined) {
        core.components.appbody.setData({ 
          tabs: tabs.concat({ ...item, label: item.id }),
        });
      }
    }
  }

  handleClickTab = (item) => {
    const { navid } = this.props.match.params; 
    this.props.history.push(`/${navid}/${item.component}/${item.id}`);
  }

  handleClickNav = (item) => {
    const { navid } = this.props.match.params; 

    this.checkTabs(item);
    this.props.history.push(`/${navid}/${item.component}/${item.id}`);
  }

  render({ path, url, params } = this.props.match) {
    return (
      <div style={styles.box}>
        <AppNav key={params.navid} params={params} onClick={this.handleClickNav}/>
        <div style={styles.body}>
          <AppTabs 
            select={this.props.match.params.pageid} 
            data={this.props.state.tabs}
            onClick={this.handleClickTab}
          />
          {params.pageid ? 
            <AppPage 
              key={params.pageid} 
              params={params} 
            /> : null
          }
        </div>
      </div>
    );
  }
}


export default core.connect(withStyles(classes)(AppBody));