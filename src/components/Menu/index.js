import React, { Component } from 'react';

import { Classes, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";


function itemMenu(i, disabled, click) {
  if (i.type === 'divider') {
    return <MenuDivider  key={i.id} />;
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
