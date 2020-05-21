import React, { Component } from 'react';
import core from 'core';

import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  progress: {
    position: 'relative',
    top: 2,
  }
}

function itemMenu(i, disabled, click, command) {
  if (i === undefined) {
    return (
      <MenuItem key="loading" text={'Loading...'} />
    )
  }
  
  if (i.children !== undefined) {
    return (
      <MenuItem 
        key={i.id} 
        text={i.title} 
        disabled={disabled[i.check] !== undefined ? disabled[i.check] : false} 
        onClick={(e) => click(i, command, e)}
      >{i.children.map(x => itemMenu(x, disabled, click, command))}</MenuItem>
    )
  }

  if (i.type === 'divider') {
    return <MenuDivider  key={i.id} />;
  }

  if (i.type === 'remote') {
    return (
      <MenuItem 
        key={i.id} 
        labelElement={i.children !== undefined ? null : <CircularProgress style={styles.progress} color="inherit" size={16} />}
        text={i.title} 
        disabled={disabled[i.check] !== undefined ? disabled[i.check] : false} 
        onClick={(e) => click(i, command, e)}
      >{itemMenu(i.children, disabled, click, i.command)}</MenuItem>
    )
  }

  return (
    <MenuItem 
      key={i.id} 
      text={i.title} 
      disabled={disabled[i.check] !== undefined ? disabled[i.check] : false} 
      onClick={(e) => click(i, command, e)}
    />
  )
}

class _Menu extends Component {
  state = { data: this.props.scheme.main }

  componentDidMount() {
    let remote = null;

    this.props.scheme.main.forEach(i => {
      if (i.type === 'remote') {
        remote = i
      }
    });

    if (remote) {
      const route = core.store.getState().app.route;
      core
        .request({ method: 'contextmenu', props: { route }, params: { id: remote.popupid } })
        .ok(res => {
          this.setState(state => {
            return {
              ...state,
              data: state.data.map(i => {
                if (i.id === remote.id) {
                  return { ...i, children: res };
                }
                return i;
              }),
            }
          });
        });
    }
  }

  handleClick = (item, forceCommand, e) => {
    
    const command = forceCommand ? forceCommand : item.command;
    if (command && this.props.commands[command]) {
      this.props.commands[command].call(null, { popupid: item.id }, e);
    } else {
      if (item.click !== undefined) {
        item.click.call(null, e);
      }
    }
  }
  
  render() {
    return (
      <Menu className={Classes.ELEVATION_1}>
        {this.state.data.map(i => itemMenu(i, this.props.disabled, this.handleClick, i.command))}
      </Menu>
    )
  }
}

_Menu.defaultProps = {
  disabled: {},
  commands: {},
}


export default _Menu;
