import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import Tooltip from '@material-ui/core/Tooltip';

import icon from 'components/icons';


const styles = {
  box: {
    width: 60,
    height: '100%',
    backgroundColor: '#607D8B',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px',
    overflow: 'hidden',
    flexShrink: 0,
    paddingTop: 70,
    zIndex: 100,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    cursor: 'pointer',
  },
  borderActive: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(250, 250, 250, 0.2)',
    borderLeft: '3px solid #fafafa',
    zIndex: -1,
    opacity: 1,
    transition: 'opacity 1s',
  },
  borderBasic: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  icon: {
    color: '#fafafa'
  }
};

const classes = theme => ({
  root: {
    flexDirection: 'column',
    justifyContent: 'start',
    width: 60,
    height: '100%',
    backgroundColor: 'transparent',
  },
});

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  arrow: {
    color: theme.palette.common.white,
  }
}))(Tooltip);

function Button(props) {
 return (
  <ButtonBase onClick={() => props.onClick(props.value)} >
    <LightTooltip title={props.title} placement="right" arrow enterDelay={500}>
      <div style={styles.button}>
        <div style={props.active ? styles.borderActive : styles.borderBasic} />
        {icon(props.icon, styles.icon)}
      </div>
    </LightTooltip>
  </ButtonBase>
 )
}

class AppMenu extends Component {

  componentDidMount() {
    core
    .request({ method: 'appmenu' })
    .ok(core.actions.appmenu.data);
  }

  handleClick = (id, lastid) => {
    if (id !== lastid) {
      const curentPath = core.history.location.pathname.replace(`${core.options.routePrefix}/`, '');
      core.cache.navs[lastid] = curentPath;
      core.actions.appnav.clear('appnav');
      if (core.cache.navs[id] === undefined) {
        core.route(id)
      } else {
        core.route(core.cache.navs[id])
      }
    }
  }

  render({ id, route, state, classes } = this.props) {
    return (
      <div style={styles.box}>
        {state.list
          .map((item) =>
            <Button 
              key={item.id}
              active={route.menuid === item.route} 
              title={item.title}
              icon={item.icon} 
              value={item.route}
              onClick={id => this.handleClick(id, route.menuid)}
            />
          )}
      </div>
    );
  }
}


const mapStateToProps = createSelector(
  state => state.app.route,
  state => state.appmenu,
  (route, state) => ({ route, state })
)

export default connect(mapStateToProps)(withStyles(classes)(AppMenu));
