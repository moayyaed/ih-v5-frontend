import React, { PureComponent } from 'react';
import core from 'core';

import TextField from '@material-ui/core/TextField';
import ButtonMenu from 'components/@Form/types/@ButtonMenu';

import shortid from 'shortid';

import { createValueFunc, options } from 'components/tools';


const styles = {
  root: {
    margin: 12,
  },
  rootMini: {
    fontSize: 13,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
  },
  rootMini2: {
    fontSize: 13,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: 'rgb(48, 84, 150)',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
    fontWeight: 'bold',
  },
}

const defaultFunction = 'return inData;';


class InputLink extends PureComponent {
  handleChangeText = (e) => {
    this.props.onChange(this.props.id, this.props.options, null, { ...this.props.data, value: e.target.value })
  }

  handleClickButton = (value) => {
    if (value === null) {
      this.props.onChange(this.props.id, this.props.options, null, { ...this.props.data, enabled: false, text: null, value: this.props.data.text || '' })
    } else {
      if (this.props.route.type) {
        const store = core.store.getState().apppage.data.p1.template;
        const list = store.listState.map(id => ({ id, title: store.state[id].title, value: store.state[id].curent }));
        const item = list.find(i => i.id === this.props.data._bind);
        
        core.transfer.sub('form_dialog', this.handleDialogClick);
        core.actions.appdialog.data({
          id: 'animation', 
          open: true, 
          transferid: 'form_dialog',
          template: {
            noclose: true,
            type: 'form',
            title: 'Binding Settings',
            options: options(list),
            data: { 
              p1: { bind: { ...item  } }, 
              p2: { func: this.props.data.func || defaultFunction },
            },
            cache: { p1: {}, p2: {} },
          },
        });
      } else {
        core.transfer.sub('form_dialog', this.handleDialogClick3);
        core.actions.appdialog.data({
          id: 'animation', 
          open: true, 
          transferid: 'form_dialog',
          template: {
            noclose: true,
            noscroll: true,
            title: 'Binding Settings',
            type: 'tree',
            id: 'elements',
            selectnodeid: this.props.data.did,
            selectId: this.props.data.prop,
            title: this.props.data.title,
            func: this.props.data.func || defaultFunction,
          },
        });
      }
    }
  }

  handleDialogClick3 = (data) => {
    if (data !== null && data !== ':exit:') {
      const did = data.did;
      const prop  = data.prop;
      const title = data.title;
      const func = data.func;

      if (prop) {
        const obj = createValueFunc(func);

        if (obj.error) {
          core.actions.app.alertOpen('warning', 'Function error: ' + obj.error.message);
        } else { 
          try {
            const v = obj.body.call(null, 0, {})
            const params = { ...this.props.data, enabled: true, did, prop, title, func };

            core.transfer.unsub('form_dialog', this.handleDialogClick3);
            core.actions.appdialog.close();
      
            this.props.onChange(this.props.id, this.props.options, null, params)
          } catch(e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      } else {
        const params = { ...this.props.data, enabled: null, prop: null, title: null, func };

        core.transfer.unsub('form_dialog', this.handleDialogClick3);
        core.actions.appdialog.close();

        this.props.onChange(this.props.id, this.props.options, null, params)
      }
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick3);
    }
  }

  handleDialogClick = (data) => {
    if (data !== null) {
      const id  = data.bind.id || null;
      const title = data.bind.title; 
      const value = data.bind.value; 
      const func = data.func || defaultFunction;
      const uuid = shortid.generate();

      if (id) {
        const obj = createValueFunc(func, value);
        if (obj.error) {
          core.actions.app.alertOpen('warning', 'Function error: ' + obj.error.message);
        } else {
          try {
            const store = core.store.getState().apppage.data.p1.template;
            const vars = store.listState.reduce((p, c) => ({ ...p, [store.state[c].title]: store.state[c].curent }), {});
            const v = obj.body.call(null, value, vars)
            
            if (core.cache.functions[this.props.data.uuid] !== undefined) {
              delete core.cache.functions[this.props.data.uuid]
            }
            
            core.cache.functions[uuid] = obj.body;
            core.transfer.unsub('form_dialog', this.handleDialogClick);
            core.actions.appdialog.close();
            
            this.props.onChange(this.props.id, this.props.options, null, { enabled: true, uuid, _bind: id, title, value: v, func, text: this.props.data.value })
          } catch (e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      }  else {
        core.transfer.unsub('form_dialog', this.handleDialogClick);
        core.actions.appdialog.close();
        this.props.onChange(this.props.id, this.props.options, null, { enabled: false, _bind: null, title: null, text: null, func, value: this.props.data.text || '' })
      }
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
    }
  }

  render() {
    if (this.props.mini) {
      return (
        <>
          <input
            className="core"
            style={this.props.data.enabled ? styles.rootMini2 : styles.rootMini} 
            disabled={Boolean(this.props.data.enabled)}
            value={this.props.data.enabled ? this.props.data.title : this.props.data.value}
            onChange={this.handleChangeText}
          />
            <ButtonMenu 
              enabled={this.props.route.type} 
              icon={this.props.data.enabled} 
              onChange={this.handleClickButton} 
            />
        </>
      )
    }

    return (
      <TextField
        id={this.props.options.id} 
        label={this.props.options.title} 
        style={styles.root}
        disabled={Boolean(this.props.data.enabled)}
        InputProps={{
          endAdornment: (
            <ButtonMenu 
              enabled={this.props.route.type} 
              icon={this.props.data.enabled} 
              onChange={this.handleClickButton} 
            />
          )
        }}
        InputLabelProps={{ shrink: true, style: this.props.getStyle(this.props) }} 
        value={this.props.data.enabled ? this.props.data.title : this.props.data.value}
        error={this.props.cache && this.props.cache.error}
        helperText={this.props.cache && this.props.cache.error}
        onChange={this.handleChangeText}
      />
    )
  }
}

export default InputLink;