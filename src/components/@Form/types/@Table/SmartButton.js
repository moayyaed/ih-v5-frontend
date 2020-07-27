import React, { PureComponent } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import Link from '@material-ui/core/Link';

import TextField from '@material-ui/core/TextField';

import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';

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
}

const classes = theme => ({
  input: {
    display: 'none'
  },
  root: {
    justifyContent: 'space-between',
  },
});


class SmartButton extends PureComponent {

  handleAfterClick = (value) => {
    const id = this.props.container.props.id;
    const options = this.props.container.props.options;
    const column = this.props.column;
    const row = this.props.rowData;

    this.props.container.props.onChange(id, options, { op: 'edit', column, row }, value)
  }

  handleDialogClick = (value) => {
    if (value === null) {
      this.handleAfterClick(value)
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
      core.actions.appdialog.close();
      this.handleAfterClick(value)
    }
  }

  handleClick = (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.cellData.title !== '') {
      if (type === 'icon') {
        const value = {
          result: {
            title: '',
            value: {},
            anchor: this.props.cellData.anchor 
          }
        }
        if (this.props.cellData.formreset) {
          value.formreset = this.props.cellData.formreset;
        }
        this.handleAfterClick(value);
      }
    } else {
      const params = {
        ...this.props.column.params,
        anchor: this.props.cellData.anchor,
        nodeid: this.props.container.props.route.channel,
        selectnodeid: this.props.cellData.dialognodeid
       }
    
        core.transfer.sub('form_dialog', this.handleDialogClick);
        core.actions.appdialog.data({ 
          open: true, 
          transferid: 'form_dialog',
          template: params,
        });
    }
  }

  handleClickForward = (e, path) => {
    e.preventDefault();
    e.stopPropagation();

    if (path) {
      core.route(path);
    }
  }

  render() {
    return (
      <>
        <div style={styles.rootMini}>
          <Link 
              href={`/admin/${this.props.cellData.path}`}
              onClick={(e) => this.handleClickForward(e, this.props.cellData.path)}
            >
            {this.props.cellData.title}
          </Link>
        </div>
        <IconButton onClick={(e) => this.handleClick(e,  'icon')} size="small">
          {this.props.cellData.title !== '' ? <LinkOffIcon fontSize="small" /> : <LinkIcon fontSize="small" />}
        </IconButton>
      </>
    )
  }
}

export default withStyles(classes)(SmartButton);