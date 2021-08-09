import React, { Component } from 'react';
import core from 'core';

import Typography from '@material-ui/core/Typography';

import { Scrollbars } from 'react-custom-scrollbars';

import AppNav from 'components/AppNav';
import Form from 'components/@Form';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  container: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  container2: { 
    padding: 20, 
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 49,
    borderBottom: '1px solid #e8e8e8',
    backgroundColor: '#fafafa',
    paddingLeft: 20,
  },
  body: {
    backgroundColor: '#f5f5f5',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100% - 49px)',
    padding: 20,
  },
}

function getFormValue(id, key, form, old = {}, def) {
  if (form[id] !== undefined && form[id][key] !== undefined) {
    return form[id][key];
  }

  if (old[key] !== undefined) {
    return old[key];
  }

  return def[id][key]
}


class TemplateOptions extends Component {

  componentDidMount() {
 
  }

  componentWillUnmount() {
    this.save = null;
  }

  handleClickNode = (item, component, nodeid, context) => {
    core.actions.appdialog.component({ title: item.node.title, type: component, id: nodeid });
    if (component) {
      this.request(component, nodeid)
    }
  }

  request = (id, nodeid) => {
    const data = this.props.state.template.data.value;
    const form = this.props.state.form.data;
    core
      .request({ method: 'components_tabs_form', params: { type: 'form', id, nodeid } })
      .ok(res => {
        core.actions.appdialog.form({
          save: false,
          id: `${id}_${nodeid}`,
          options: res.options,
          data: Object
            .keys(res.data)
            .reduce((p, c) => {
              return { 
                ...p, 
                [c]: Object
                  .keys(res.data[c])
                  .reduce((p2, c2) => {
                    return { 
                      ...p2, 
                      [c2]: getFormValue(c, c2, form, data, res.data) 
                    }
                  }, {}) 
              }
            }, {}),
          cache: res.cache,
        });
      });
  }

  handleChange = (id, component, target, value) => {

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
    const state = this.props.state;
    return (
      <>
        <AppNav 
          disabledRoute
          key="appnav" 
          stateid="msgboxtree"
          positionPanel="right2"
          requestId={state.template.id}
          onClickNode={this.handleClickNode}
          defaultSelectNodeId={state.template.selectnodeid}
          defaultSelectChildren
        />
          <div style={styles.container} >
            <div style={styles.toolbar}>
              <Typography variant="subtitle1" >
                {state.component.title}
              </Typography>
            </div>
              <Scrollbars style={styles.root} >
                <div style={styles.container2} >
                  {state.component.type ? 
                    <Form 
                      key={form.id} 
                      debug={false} 
                      route={{ nodeid: state.component.id }}
                      scheme={form.options} 
                      data={form.data}
                      cache={form.cache}
                      onChange={this.handleChange}
                      heightOffset={257}
                    /> : null}
                </div>
              </Scrollbars>
            </div>
      </>
    )
  }
}


export default TemplateOptions;