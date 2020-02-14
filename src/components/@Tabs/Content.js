import React, { Component } from 'react';
import core from 'core';

import Form from 'components/Form';


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
            data: res.data,
            scheme: res.scheme,
          })
        });
    }
  }

  render({ state } = this.props) {
    return (
      <div style={{ width: '100%', height: 'calc(100% - 119px)', overflow: 'auto', backgroundColor: '#f5f5f5', padding: 20 }}>
        <Form key={state.id} state={state} />
      </div>
    )
  }

}


export default Content;
