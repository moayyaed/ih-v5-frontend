import React from 'react';

import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

function AppContextMenu(props) {
  return (
    <Menu>
      <MenuItem icon="search-around" text="Search around..." />
      <MenuItem icon="search" text="Object viewer" />
      <MenuItem icon="graph-remove" text="Remove" />
      <MenuItem icon="group-objects" text="Group" />
      <MenuDivider />
      <MenuItem disabled={true} text="Clicked on node" />
    </Menu>
  );
}


export default AppContextMenu;