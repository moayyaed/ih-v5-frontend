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

function getTree(i, disabled, click) {
  if (i === undefined) {
    return (
      <MenuItem key="loading" text={'Loading...'} />
    )
  }

  return itemMenu(i, disabled, click);
}

function itemMenu(i, disabled, click) {
  if (i.children !== undefined) {
    return (
      <MenuItem 
        key={i.id} 
        text={i.title} 
        disabled={disabled[i.check] !== undefined ? disabled[i.check] : false} 
        onClick={() => click(i)}
      >{i.children.map(x => itemMenu(x, disabled, click))}</MenuItem>
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
        onClick={() => click(i)}
      >{getTree(i.children, disabled, click)}</MenuItem>
    )
  }

  return (
    <MenuItem 
      key={i.id} 
      text={i.title} 
      disabled={disabled[i.check] !== undefined ? disabled[i.check] : false} 
      onClick={() => click(i)}
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
      core
        .request({ method: 'contextmenu', params: remote.popupid })
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

  handleClick = (item) => {
    if (item.command && this.props.commands[item.command]) {
      this.props.commands[item.command].apply();
    }
  }
  
  render() {
    return (
      <Menu className={Classes.ELEVATION_1}>
        {this.state.data.map(i => itemMenu(i, this.props.disabled, this.handleClick))}
      </Menu>
    )
  }
}

_Menu.defaultProps = {
  disabled: {},
  commands: {},
}


export default _Menu;
