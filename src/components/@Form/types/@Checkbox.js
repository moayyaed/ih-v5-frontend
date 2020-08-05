import React from 'react';
import core from 'core';

import CheckboxMui from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ButtonMenu from 'components/@Form/types/@ButtonMenu';

import shortid from 'shortid';

import { createValueFunc, options } from 'components/tools';


const styles = {
  root: {
    margin: 12,
    marginBottom: 0,
  },
  label: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  },
  rootMini: {
    width: 16,
    height: 16,
    padding: 0,
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
  buttonMini: {
    width: 22,
    height: 22,
  }
}

const defaultFunction = "return inData;";

function Checkbox(props) {
  const handleClickButton = (value) => {
    if (value === null) {
      props.onChange(props.id, props.options, null, { ...props.data, enabled: false, cb: null, value: props.data.cb || '' })
    } else {
      if (props.route.type) {
        const store = core.store.getState().apppage.data.p1.template;
        const list = store.listState.map(id => ({ id, title: store.state[id].title, value: store.state[id].curent }));
        const item = list.find(i => i.id === props.data._bind);
        
        core.transfer.sub('form_dialog', handleDialogClick);
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
              p2: { func: props.data.func || defaultFunction },
            },
            cache: { p1: {}, p2: {} },
          },
        });
      } else {
        core.transfer.sub('form_dialog', handleDialogClick3);
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
            selectnodeid: props.data.did,
            selectId: props.data.prop,
            title: props.data.title,
            func: props.data.func || defaultFunction,
          },
        });
      }
    }
  };

  const handleDialogClick3 = (data) => {
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
            const params = { ...props.data, enabled: true, did, prop, title, func };

            core.transfer.unsub('form_dialog', handleDialogClick3);
            core.actions.appdialog.close();
      
            props.onChange(props.id, props.options, null, params)
          } catch(e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      } else {
        const params = { ...props.data, enabled: null, prop: null, title: null, func };

        core.transfer.unsub('form_dialog', handleDialogClick3);
        core.actions.appdialog.close();

        props.onChange(props.id, props.options, null, params)
      }
    } else {
      core.transfer.unsub('form_dialog', handleDialogClick3);
    }
  }

  const handleDialogClick = (data) => {
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
            
            if (core.cache.functions[props.data.uuid] !== undefined) {
              delete core.cache.functions[props.data.uuid]
            }
            
            core.cache.functions[uuid] = obj.body;
            core.transfer.unsub('form_dialog', handleDialogClick);
            core.actions.appdialog.close();
            
            props.onChange(props.id, props.options, null, { enabled: true, uuid, _bind: id, title, value: v, func, color: props.data.value })
          } catch (e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      }  else {
        core.transfer.unsub('form_dialog', handleDialogClick);
        core.actions.appdialog.close();
        props.onChange(props.id, props.options, null, { enabled: false, _bind: null, title: null, cb: null, func, value: props.data.cb || 0 })
      }
    } else {
      core.transfer.unsub('form_dialog', handleDialogClick);
    }
  }

  if (props.mini) {
    return (
      <>
        {props.data.enabled ? 
        <input
          className="core"
          style={styles.rootMini2} 
          disabled={true}
          value={props.data.title}
        />
        :
        <CheckboxMui
          size="small"
          color="primary"
          style={styles.rootMini}
          checked={Boolean(props.data.value)}
          onChange={(e) => props.onChange(props.id, props.options, null, { ...props.data, value: Number(e.target.checked)})} 
        />}
        <ButtonMenu 
          enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
          icon={props.data.enabled} 
          onChange={handleClickButton} 
        />
      </>
    )
  }
  return (
    <FormControl style={styles.root} component="fieldset">
      <FormLabel style={styles.label}>{props.options.title}</FormLabel>
      <FormControlLabel
        label=""
        labelPlacement="end"
        value="end"
        control={
          <CheckboxMui 
            color="primary"
            checked={Boolean(props.data)}
            onChange={(e) => props.onChange(props.id, props.options, null, Number(e.target.checked))} 
          />
        }
      />
    </FormControl>
  )
}


export default React.memo(Checkbox);