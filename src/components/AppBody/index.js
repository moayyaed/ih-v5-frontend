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

  handleOpenTab = (item) => {
    const { options, tabs } = this.props.state;
    if (options.tabs) {
      const find = tabs.find(i => i.id === item.id);
      if (find === undefined) {
        core.components.appbody.setData({ 
          tabs: tabs.concat(item),
        });
      }
    }
  }

  handleClickNav = (item) => {
    const { navid } = this.props.match.params; 

    this.handleOpenTab(item)
    this.props.history.push(`/${navid}/${item.component}/${item.id}`);
  }

  handleClickTab = (item) => {
    const { navid } = this.props.match.params; 
    this.props.history.push(`/${navid}/${item.component}/${item.id}`);
  }

  handleCloseTab = (item) => {
    const { navid } = this.props.match.params; 
    const { tabs } = this.props.state;

    const temp = tabs.filter(i => i.id !== item.id);

    core.components.appbody.setData({ 
      tabs: temp,
    });
    if (temp.length !== 0) {
      this.props.history.push(`/${navid}/${item.component}/${temp[temp.length - 1].id}`);
    } else {
      this.props.history.push(`/${navid}/${item.component}`);
    }
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
            onClose={this.handleCloseTab}
          />
          {params.pageid ? 
            <AppPage 
              key={params.pageid} 
              params={params} 
              onOpenTab={this.handleOpenTab}
            /> : null
          }
        </div>
      </div>
    );
  }
}


export default core.connect(withStyles(classes)(AppBody));