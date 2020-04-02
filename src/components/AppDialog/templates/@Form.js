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

  componentWillUnmount() {
    this.save = null;
  }

  handleChange = (id, component, target, value) => {
  
    /*
    if (state.save === false) {
      core.actions.apppage.data({ save: true })
    } 
    */

    if (this.save === undefined) {
      this.save = {}
    }
    if (this.save[id] === undefined) {
      this.save[id] = {}
    }

    if (target) {
      this.handleSaveDataTarget(id, component, target, value);
    } else {
      this.handleSaveDataBasic(id, component, target, value);
    }
  }

  handleSaveDataBasic = (id, component, target, value) => {    
    let temp = value;
    if (component.type === 'droplist') {
      temp = value.id;
    }
    this.save[id][component.prop] = temp;
    core.actions.appdialog.formValueBasic(id, component.prop, value);
  }

  handleSaveDataTarget = (id, component, target, value) => {

    if (this.save[id][component.prop] === undefined) {
      this.save[id][component.prop] = {}
    }
    if (this.save[id][component.prop][target.row.id] === undefined) {
      this.save[id][component.prop][target.row.id] = {}
    }

    if (target.op === 'edit') {
      let temp = value;

      if (target.column.type === 'droplist') {
        temp = value.id;
      }
      this.save[id][component.prop][target.row.id][target.column.prop] = temp;
      core.actions.appdialog.formValueTable(id, component.prop, target.row.id, target.column.prop, value);
    }

    if (target.op === 'add') {
      this.save[id][component.prop][target.row.id] = target.row;
      core.actions.appdialog.formAddRowTable(id, component.prop, target.row);
    }

    if (target.op === 'delete') {
      if (this.save[id][component.prop][target.row.id] === null) {
        delete this.save[id][component.prop][target.row.id];
        core.actions.appdialog.formRemoveRowTable(id, component.prop, target.row.id, false);
      } else {
        this.save[id][component.prop][target.row.id] = null;
        core.actions.appdialog.formRemoveRowTable(id, component.prop, target.row.id, true);
      }
    }
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
            heightOffset={257}
          />
        </div>
      </Scrollbars>
    )
  }
}


export default TemplateForm;