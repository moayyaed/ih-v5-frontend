import React, { Component } from 'react';
import core from 'core';


const store = {
  lastPathName: '',
  lastNavID: null,
  lastPageId: null,
  lastComponent: null,
}

function parseValue(value) {
  if (value === '') {
    return null;
  }

  if (value === undefined) {
    return null;
  }
  return value;
}

function parsePathOfComponent(navid, component, pageid, list) {
  switch(component) {
    case 'table':
        return { navid, component, pageid, selectid: parseValue(list[4])};
    case 'graph':
        return { navid, component, pageid };
    case 'options':
        return { navid, component, pageid };
    default:
        return { navid, component, pageid };
  }
}

function parsePath(path) {
  const list = path.split('/');

  const navid = parseValue(list[1]);
  const component = parseValue(list[2]);
  const pageid = parseValue(list[3]);

  if (component) {
    return parsePathOfComponent(navid, component, pageid, list)
  }

  return { navid, component, pageid };
}

class AppRouter extends Component {

  componentDidMount() {
    this.props.history.listen(this.handleChangeRoute)
    this.handleChangeRoute(this.props.location);
  }

  componentWillUnmount() {

  }

  handleChangeRoute = (location) => {
    if (store.lastPathName !== location.pathname) {
      store.lastPathName = location.pathname;
      const params = parsePath(location.pathname);
      console.log(params);
      if (store.lastNavID !== params.navid) {
        store.lastNavID = params.navid;
        // console.log('navid:', params.navid);
      }
      if (store.lastComponent !== params.component) {
        store.lastComponent = params.component;
        // console.log('component:', params.component);
      }
      if (store.lastPageId !== params.pageid) {
        /// console.log('pageid:', params.pageid);
      }
    }
  }

  render() {
    return null;
  }
}

export default AppRouter;