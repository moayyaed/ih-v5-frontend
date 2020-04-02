import React, { Component } from 'react';
import core from 'core';

import { Scrollbars } from 'react-custom-scrollbars';

import Form from 'components/@Form';

const styles = {
  root: {
    width: '100%', 
    height: '100%', 
    backgroundColor: '#f5f5f5',
  },
  container: { 
    padding: 20, 
  }
}


class TemplateForm extends Component {

  componentDidMount() {
    const { id, nodeid } = this.props.state.template;
   
    core
      .request({ method: 'components_tabs_form', params: { type: 'form', id, nodeid } })
      .ok(res => {
        core.actions.appdialog.form({
          save: false,
          id: `${id}_${nodeid}`,
          options: res.options,
          data: res.data,
          cache: res.cache,
        });
      });

  }

  handleChange = () => {

  }

  render({ form } = this.props.state) {
    return (
      <Scrollbars style={styles.root} >
        <div style={styles.container} >
          <Form 
            key={form.id} 
            debug={false} 
            route={{}}
            scheme={form.options} 
            data={form.data}
            cache={form.cache}
            onChange={this.handleChange}
            heightOffset={200}
          />
        </div>
      </Scrollbars>
    )
  }
}


export default TemplateForm;