import React from 'react';
import core from 'core';

import IconButton from '@material-ui/core/IconButton';
import CheckboxMui from '@material-ui/core/Checkbox';
import TuneIcon from '@material-ui/icons/Tune';

import ButtonMenu from 'components/@Form/types/@ButtonMenu';

import shortid from 'shortid';

import { createValueFunc, options } from 'components/tools';

const styles = {
  root: {
    margin: 12,
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
  container: {
    top: 64, 
    width: '100%', 
    height: 'calc(100% - 64px)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    padding: 18,
  },
  title: {
    marginBottom: 6,
  },
  button: {
    width: 28,
    height: 28,
    border: '3px inset rgba(153, 153, 153, 0.7)',
    borderRadius: 2,
    padding: 2,
    boxShadow: '0 0 0 2px #fff inset',
    cursor: 'pointer',
    position: 'relative',
  },
  buttonBackround2: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  checkBox: {
    display: 'none',
  },
  checkBoxMini: {
    width: 16,
    height: 16,
    padding: 0,
  },
  rootMini: {},
  titleMini: {
    display: 'none',
  },
  buttonMini: {
    width: 16,
    height: 16,
    border: '3px inset rgba(153, 153, 153, 0.7)',
    borderRadius: 2,
    padding: 2,
    boxShadow: '0 0 0 2px #fff inset',
    cursor: 'pointer',
    position: 'relative',
    marginLeft: 12,
  },
  buttonBackround2Mini: {
    width: 16,
    height: 16,
    position: 'absolute',
  },
  buttonMini2: {
    width: 22,
    height: 22,
  },
  text: {
    margin: 12,
    width: 'calc(100% - 24px)',
  },
  stub: {
    width: '100%',
  },
}


const defaultAnimation = 'spin 4s linear infinite'
const defaultKeyframes = `
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`
const defaultFunction = "return `spin ${4 / inData}s linear infinite`";

function getOptions2(enabled) {
  return {
    spacing: 10,
    grid: [
      {
        id: 'p1',
        xs: 12,
        class: 'main',
      },
      {
        id: 'p2',
        xs: 12,
        class: 'main',
        height: "fill",
        calc: -130,
        padding: 4,
      },
    ],
    p1: [
      {
        prop: 'value',
        title: 'Animation',
        type: enabled ? 'text' : 'input'
      },
    ],
    p2: [
      {
        prop: 'keyframes',
        title: '@keyframes',
        type: 'script',
        mode: 'css',
        theme: 'tomorrow',
      },
    ],
  }
}

function Animation(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    core.transfer.sub('form_dialog', handleDialogClick2);
    core.actions.appdialog.data({
      id: 'animation', 
      open: true, 
      transferid: 'form_dialog',
      template: {
        type: 'form',
        title: 'Animation Settings',
        options: getOptions2(props.data.enabled),
        data: { 
          p1: { value: props.data.enabled ? props.data.func : props.data.value ? props.data.value : defaultAnimation }, 
          p2: { keyframes: props.data.keyframes ? props.data.keyframes : defaultKeyframes },
        },
        cache: { p1: {}, p2: {} },
      },
    });
  };

  const handleDialogClick2 = (data) => {
    core.transfer.unsub('form_dialog', handleDialogClick2);
    if (data !== null) {
      if (props.data.enabled) {
        delete data['value'];
      }
      props.onChange(props.id, props.options, null, { ...props.data, ...data })
    }
  }

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAnchorEl(null);
  };

  const handleChange = (e) => {
      props.onChange(props.id, props.options, null, { 
        ...props.data, 
        active: Number(e.target.checked),
        value: props.data.value ? props.data.value : defaultAnimation,
        keyframes: props.data.keyframes ? props.data.keyframes : defaultKeyframes
      })
  }

  const handleClickButton = (value) => {
    if (value === null) {
      props.onChange(props.id, props.options, null, { ...props.data, ...props.data.animation, enabled: false, animation: {} })
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

            const data = { ...props.data, uuid, _bind: id, title, func };
            
            props.onChange(props.id, props.options, null, { ...props.data, active: true, enabled: true, uuid, _bind: id, title, value: v, func, animation: data })
          } catch (e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      }  else {
        core.transfer.unsub('form_dialog', handleDialogClick);
        core.actions.appdialog.close();
        props.onChange(props.id, props.options, null, { ...props.data, ...props.data.animation, enabled: false, _bind: null, title: null, animation: null, func })
      }
    } else {
      core.transfer.unsub('form_dialog', handleDialogClick);
    }
  }
  

  const open = Boolean(anchorEl);
  const s = {};

  if (props.mini) {
    s.root = styles.rootMini;
    s.title = styles.titleMini;
    s.button = styles.buttonMini;
    s.buttonBackround2 = styles.buttonBackround2Mini;
    s.checkbox = styles.checkBoxMini
  } else {
    s.root = styles.root;
    s.title = styles.title;
    s.button = styles.button;
    s.buttonBackround2 = styles.buttonBackround2;
    s.checkbox = styles.checkBox;
  }

  if (props.data.enabled) {
    return (
      <>
        <input
          className="core"
          style={styles.rootMini2} 
          disabled={true}
          value={props.data.title}
        />
        <div style={s.root}>
          <IconButton size="small" onClick={handleClick}>
            <TuneIcon fontSize="inherit" />
          </IconButton>
        </div>
        <ButtonMenu 
          enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
          icon={props.data.enabled} 
          onChange={handleClickButton} 
        />
      </>
    )
  }
  
  return (
    <>
      <CheckboxMui
        size="small"
        color="primary"
        style={s.checkbox}
        checked={Boolean(props.data.active)}
        onChange={handleChange} 
      />
      <div style={styles.stub} />
      <div style={s.root}>
        <div style={{ ...s.title, ...props.getStyle(props)}}>{props.options.title}</div>
        <IconButton size="small" onClick={handleClick}>
          <TuneIcon fontSize="inherit" />
        </IconButton>
      </div>
      <ButtonMenu 
        enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
        icon={props.data.enabled} 
        onChange={handleClickButton} 
      />
    </>
  );
}


export default React.memo(Animation);
