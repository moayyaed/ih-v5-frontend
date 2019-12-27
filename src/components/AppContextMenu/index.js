import React, { PureComponent } from 'react';

import { Classes, Icon, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import core from 'core';


function handleClick(position, item, params, state) {
  if (item.command !== undefined) {
    item.position = position;
    core.event('contextmenu', item.command, item, params, state);
  }
}

function getItemType(item, position, data, params, state) {
  switch(item.type) {
    case 'divider':
      return <MenuDivider key={item.id} { ...item} />
    case 'item':
        return <MenuItem key={item.id} { ...item} onClick={() => handleClick(position, item, params, state)} />
    case 'items':
        return (
          <MenuItem key={item.id} { ...item} >
            {data[item.childs].map(i => getItemType(i, position, data, params, state))}
          </MenuItem>
        );
    default:
      return null;
  }
}

class AppContextMenu extends PureComponent {

  render() {
    return (
      <Menu className={Classes.ELEVATION_1}>
        {this.props.data.main.map(i =>
          getItemType(i, this.props.position, this.props.data, this.props.params, this.props.state)
        )}
      </Menu>
    );
  } 
}


export default AppContextMenu;