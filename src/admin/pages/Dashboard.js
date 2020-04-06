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


class Dashboard extends Component {
  state = { 
    debug: false,
    scheme: {
      tabs: [],
      defaultTab: null,
    },
    route: {},
  };

  componentDidMount() {
    this.setState(state => {
      return {
        ...state,
        scheme: core.options.componentsScheme.dashboard,
        route: { tab: core.options.componentsScheme.dashboard.defaultTab }
      }
    })
  }

  componentWillUnmount() {
    core.actions.apppage.clear();
  }

  handleClickTab = (tab) => {
    this.setState(state => { 
      return { ...state, route: { tab } };
    });
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

