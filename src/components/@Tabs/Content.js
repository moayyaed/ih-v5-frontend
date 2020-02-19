import React, { Component } from 'react';
import core from 'core';

import { Scrollbars } from 'react-custom-scrollbars';

import Form from 'components/@Form';


class Content extends Component {

  componentDidMount() {
    const { route, scheme } = this.props;
    this.request(route, scheme);
  }

  request = (route, scheme) => {
    const tab = scheme.tabs.find(i => i.id === route.tab);

    if (tab !== undefined && tab.component && tab.component.length) {
      const params = { ...tab.component[0], nodeid: route.nodeid };
      core
        .request({ method: 'components_tabs', params })
        .ok(res => {
          core.actions.apppage.data({
            id: `${route.nodeid}_${route.tab}`,
            component: tab.component,
            data: res.data,
            options: res.options,
          })
        });
    }
  }

  render({ debug, state } = this.props) {
    return (
      <Form key={state.id} debug={debug} scheme={state.options} data={state.data} />
    )
  }

}


export default Content;
