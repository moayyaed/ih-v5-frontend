import React, { Component, PureComponent } from 'react';
import core from 'core';

import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
  root: {
    width: 180,
    height: 212,
    padding: 5,
  },
  progress: {
    position: 'relative',
    top: 2,
  },
  stub: {
    width: 16,
    height: 16,
  }
}


function itemMenu(i, disabled, click, command, target) {
  if (Array.isArray(i)) {
      return i.map(x => itemMenu(x, disabled, click, command, target))
  }
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
        disabled={disabled[i.check] !== undefined ? disabled[i.check] : i.disabled} 
      >{i.children.map(x => itemMenu(x, disabled, click, command, target))}</MenuItem>
    )
  }

  if (i.type === 'divider') {
    return <MenuDivider key={i.id} />;
  }

  if (i.type === 'remote') {
    return React.createElement(RemoteItem, { key: i.id, i, disabled, click, command, target })
  }

  return (
    <MenuItem 
      key={i.id} 
      text={i.title} 
      disabled={disabled[i.check] !== undefined ? disabled[i.check] : i.disabled} 
      onClick={(e) => click(i, command, e)}
    />
  )
}

class RemoteItem extends PureComponent {
  state = { i: this.props.i }

  componentDidMount() {
    this.req = this.test = core
      .request({ 
        method: 'contextmenu', 
        props: { route: core.store.getState().app.route }, 
        params: { id: this.props.i.popupid, target: this.props.target } }
      )
      .ok(res => {
        this.setState({ i: { ...this.state.i, children: res } })
        this.req = null;
      });
    
  }

  componentWillUnmount() {
    if (this.req) {
      this.req.cancel();
      this.req = null;
    }
  }

  render({ disabled, click, command, target } = this.props) {
    return (
      <MenuItem 
        key={this.state.i.id} 
        labelElement={this.state.i.children !== undefined ? <div style={styles.stub} /> : <CircularProgress style={styles.progress} color="inherit" size={16} />}
        text={this.state.i.title} 
        disabled={disabled[this.state.i.check] !== undefined ? disabled[this.state.i.check] : false} 
    
      >{itemMenu(this.state.i.children, disabled, click, this.state.i.command)}</MenuItem>
    )
  }
}

class _Menu extends Component {
  state = { 
    data: typeof this.props.scheme.main === 'string' ? [] : this.props.scheme.main, 
    loading: false,
  }

  componentDidMount() {
    if (typeof this.props.scheme.main === 'string') {
      core
      .request({ 
        method: 'contextmenu', 
        props: { route: core.store.getState().app.route }, 
        params: { id: this.props.scheme.main, target: this.props.target } }
      )
      .loading(() => this.setState({ loading: true }))
      .ok(res => this.setState({ data: res, loading: false }));
    }
  }

  handleClick = (item, forceCommand, e) => {
    const command = forceCommand ? forceCommand : item.command;
    if (command && this.props.commands[command]) {
      this.props.commands[command].call(null, { popupid: item.id, title: item.title, param: item.param }, e);
    } else {
      if (item.click !== undefined) {
        item.click.call(null, e);
      }
    }
  }
  
  render() {
    if (this.state.data.length === 0) {
      return null;
    }
    if (this.state.loading) {
      return (
        <Menu className={Classes.ELEVATION_1}>
          <MenuItem 
            labelElement={<CircularProgress style={styles.progress} color="inherit" size={16} />}
            text="Loading..." 
          />
        </Menu>
      );
    }
    return (
      <Menu className={Classes.ELEVATION_1}>
        {this.state.data.map(i => itemMenu(i, this.props.disabled, this.handleClick, i.command, this.props.target))}
      </Menu>
    )
  }
}

_Menu.defaultProps = {
  disabled: {},
  commands: {},
}


export default _Menu;
