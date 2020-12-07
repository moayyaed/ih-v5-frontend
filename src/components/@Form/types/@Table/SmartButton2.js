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
    fontSize: 13,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: '#3f51b5',
    width: '100%',
    border: 'unset', 
    height: 28,
    background: '#fff',
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


class TableSmartButton2Component extends PureComponent {

  handleDialogClick = (data, context) => {
    const id = this.props.container.props.id;
    const options = this.props.container.props.options;
    const column = this.props.column;
    const row = this.props.rowData;
    

    if (data === ':exit:') {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
      core.actions.appdialog.close();

      if (data.result) {
        this.props.container.props.onChange(id, options, { op: 'edit', column, row }, {
          id: data.result.did,
          dn: data.result.dn,
          prop: data.result.prop,  
          title: data.result.title,
        })
      } else {
        const value = { ...data };
        delete value.active;
  
        this.props.container.props.onChange(id, options, { op: 'edit', column, row }, {
          id: context.component.id, 
          title: context.component.title,
          value,
        })
      }
    } 
  }

  handleClickLink = (value) => {
    const params = {
      disabledSave: this.props.column.params.save !== undefined ? !this.props.column.params.save : false,
      ...this.props.column.params,
      type: this.props.column.params.variant,
      selectnodeid: this.props.cellData.id || this.props.cellData.did,
      select: this.props.cellData.prop,
      data: this.props.cellData,
    }
  
    core.transfer.sub('form_dialog', this.handleDialogClick);
    core.actions.appdialog.data({ 
      open: true, 
      transferid: 'form_dialog',
      template: params,
    });
  }

  handleClickUnLink = (e) => {
    const id = this.props.container.props.id;
    const options = this.props.container.props.options;
    const column = this.props.column;
    const row = this.props.rowData;

    this.props.container.props.onChange(id, options, { op: 'edit', column, row }, {
      value: {},
    })
  } 

  render() {
    return (
      <>
        <input
          className="core"
          style={styles.rootMini2} 
          disabled={true}
          value={this.props.cellData.title || ''}
        />
        <ButtonMenu
          enabled={true} 
          dividerOff={true}
          icon={this.props.cellData.enabled} 
          onChange={this.handleClickLink}
          onClear={this.handleClickUnLink} 
        />
      </>
    )
  }
}

export default withStyles(classes)(TableSmartButton2Component);