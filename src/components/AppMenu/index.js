import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import RestoreIcon from '@material-ui/icons/TableChart';


const styles = {
  box: {
    width: 70,
    height: '100%',
    backgroundColor: '#607d8b',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px',
    overflow: 'hidden',
    flexShrink: 0,
    paddingTop: 70,
    zIndex: 100,
  },
};

const classes = theme => ({
  root: {
    flexDirection: 'column',
    justifyContent: 'start',
    width: 70,
    height: '100%',
    backgroundColor: 'transparent',
  },
  bottom: {
    padding: '0px!important',
    maxWidth: 70,
    minWidth: 70,
    maxHeight: 70,
    marginBottom: 10,
  }
});

class AppMenu extends Component {

  static defaultProps = {
    id: 'appmenu'
  };

  handleClick = (e, id) => {
    if (core.storage.cache.paths[id] !== undefined) {
      core.nav.push(core.storage.cache.paths[id]);
    } else {
      core.nav.push(core._options.route + '/' + id);
    }
  }

  render({ id, state, classes } = this.props) {
    return (
      <div style={styles.box}>
        <BottomNavigation 
          showLabels 
          className={classes.root} 
          onChange={this.handleClick}
          value={state.selectid}
        >
          {state.list
            .map((item) =>
              <BottomNavigationAction
                key={item.id}
                value={item.route}
                className={classes.bottom} 
                label={item.title} 
                icon={<RestoreIcon />} 
              />
            )}
        </BottomNavigation>
      </div>
    );
  }
}


export default core.connect(withStyles(classes)(AppMenu));