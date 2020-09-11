import React, { PureComponent } from 'react';
import core from 'core';

import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import ButtonMenu from 'components/@Form/types/@ButtonMenu';
import TuneIcon from '@material-ui/icons/Tune';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';

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
  fontSize: 12,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: '#3f51b5',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
  },
  container: {
    width: '100%',
  },
  stub: {
    width: '100%',
  },
}

const defaultFunction = 'return inData;';


class Img extends PureComponent {
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
            id: this.props.route.dialog ? 'elementsAndVistemplates': 'elements',
            selectnodeid: this.props.data.did,
            tempalte: this.props.data.template,
            selectId: this.props.data.prop,
            selectTitle: this.props.data.title,
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
      const template = data.template;

      if (prop) {
        const obj = createValueFunc(func);

        if (obj.error) {
          core.actions.app.alertOpen('warning', 'Function error: ' + obj.error.message);
        } else { 
          try {
            const v = obj.body.call(null, 0, {})
            const params = { ...this.props.data, enabled: true, did, prop, title, func, text: this.props.data.value, img: this.props.data };

            core.transfer.unsub('form_dialog', this.handleDialogClick3);
            core.actions.appdialog.close();
      
            this.props.onChange(this.props.id, this.props.options, null, params)
          } catch(e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      } else {
        const params = { ...this.props.data, ...this.props.data.img, enabled: false, prop: null, title: null, func, img: null };

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
            
            this.props.onChange(this.props.id, this.props.options, null, { enabled: true, uuid, _bind: id, title, value: v, func, img: this.props.data })
          } catch (e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      }  else {
        core.transfer.unsub('form_dialog', this.handleDialogClick);
        core.actions.appdialog.close();
        this.props.onChange(this.props.id, this.props.options, null, { ...this.props.data, ...this.props.data.img, did: null, enabled: false, _bind: null, title: null, text: null, func, img: null})
      }
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
    }
  }

  handleDialogClick4 = (data) => {
    if (data !== null && data !== ':exit:') {
      core.transfer.unsub('form_dialog', this.handleDialogClick4);
      core.actions.appdialog.close();
      this.props.onChange(this.props.id, this.props.options, null, { ...this.props.data, ...data} )
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick4);
    }
  }

  handleClick = (e) => {
    core.transfer.sub('form_dialog', this.handleDialogClick4);
    core.actions.appdialog.data({
      id: 'animation', 
      open: true, 
      transferid: 'form_dialog',
      template: {
        noclose: true,
        noscroll: true,
        title: 'Select image',
        type: 'tree',
        id: 'imagegroup',
        selectnodeid: this.props.data.folder || 'imagegroup',
        selectId: this.props.data.value,
      },
    });
  }

  handleClear = (e) => {
    this.props.onChange(this.props.id, this.props.options, null, { ...this.props.data, ...this.props.data.img, enabled: false, _bind: null, did: null, title: null, func: this.props.data.func, img: null })
  }

  render() {
    if (this.props.mini) {
      return (
        <>
          <div style={styles.container}>
            <input
              className="core"
              style={this.props.data.enabled ? styles.rootMini2 : styles.rootMini} 
              disabled={Boolean(this.props.data.enabled)}
              value={this.props.data.enabled ? this.props.data.title : this.props.data.value}
              onChange={this.handleChangeText}
            />
          </div>
          <div>
            <IconButton size="small" onClick={this.handleClick}>
              <InsertPhotoOutlinedIcon fontSize="inherit" />
            </IconButton>
          </div>
          <ButtonMenu
            enabled={this.props.route.type} 
            icon={this.props.data.enabled} 
            onChange={this.handleClickButton}
            onClear={this.handleClear} 
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
              onClear={this.handleClear}
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

export default Img;