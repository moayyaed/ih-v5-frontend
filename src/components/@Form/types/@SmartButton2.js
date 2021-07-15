import React, { PureComponent } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';


import ButtonMenu from 'components/@Form/types/@ButtonMenu';


const styles = {
  root: {
    margin: 12,
  },
  button: {
    position: 'relative',
  },
  rootMini: {
    width: '100%',
    overflow: 'hidden',
  },
  rootMini2: {
  fontSize: 12,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: '#3f51b5',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
  },
}

const classes = theme => ({
  input: {
    display: 'none'
  },
  root: {
    justifyContent: 'space-between',
  },
});


class SmartButton2 extends PureComponent {

  handleDialogClick = (data, context) => {
    if (data === ':exit:') {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
      core.actions.appdialog.close();

      if (data.result) {
        this.props.onChange(this.props.id, this.props.options, null, {
          id: data.result.did,
          dn: data.result.dn,
          prop: data.result.prop,  
          title: data.result.title,
        })
      } else {
        const value = { ...data };
        delete value.active;
  
        this.props.onChange(this.props.id, this.props.options, null, {
          id: context.component.id, 
          title: context.component.title,
          value,
        })
      }
    } 
  }

  handleClickLink = (value) => {
    const params = {
      disabledSave: this.props.options.params.save !== undefined ? !this.props.options.params.save : false,
      ...this.props.options.params,
      type: this.props.options.params.variant,
      selectnodeid: this.props.data.id || this.props.data.did || core.cache.dialogDevice,
      select: this.props.data.prop,
      data: this.props.data,
    }
    core.transfer.sub('form_dialog', this.handleDialogClick);
    core.actions.appdialog.data({ 
      open: true, 
      transferid: 'form_dialog',
      template: params,
    });
  }

  handleClickUnLink = (e) => {
    this.props.onChange(this.props.id, this.props.options, null, {
      value: {},
    })
  } 

  render() {
    if (this.props.mini) {
      return (
        <>
          <div style={styles.rootMini}>
            <input
              className="core"
              style={styles.rootMini2} 
              disabled={true}
              value={this.props.data.title || ''}
            />
          </div>
          <ButtonMenu
              enabled={this.props.route.type} 
              icon={this.props.data.enabled}
              mode={this.props.mode} 
              onChange={this.handleClickLink}
              onClear={this.handleClickUnLink} 
            />
        </>
      )
    }
    return null;
  }
}

export default withStyles(classes)(SmartButton2);