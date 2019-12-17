import core from 'core';
import React from "react";

import { Classes, ContextMenu, ContextMenuTarget, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";

// contextmenu
core.events.on('contextmenu:nav', (e, params) => {
  // core.action.appcontextm.data({ target }, [])
  ContextMenu.show(
    <Menu>
        <MenuItem icon="search-around" text="Search around..." />
        <MenuItem icon="search" text="Object viewer" />
        <MenuItem icon="graph-remove" text="Remove" />
        <MenuItem icon="group-objects" text="Group" />
        <MenuDivider />
        <MenuItem disabled={true} text="Clicked on node" />
    </Menu>, { left: e.clientX, top: e.clientY },
    () => console.log('close'));
});


core.events.on('contextmenu:exit', (target, params) => {
  // core.action.appcontextm.close();
});

