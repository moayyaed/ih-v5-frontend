import React from 'react';
import core from 'core';

import Popover from '@material-ui/core/Popover';
import ButtonMenu from 'components/@Form/types/@ButtonMenu';

import { SketchPicker } from 'react-color';

import shortid from 'shortid';

import { createValueFunc, options } from 'components/tools';

const PRESET_COLORS = [
  'transparent',
  '#D0021B', '#F5A623', '#F8E71C',
  '#8B572A', '#7ED321', '#417505',
  '#BD10E0', '#9013FE', '#4A90E2',
  '#50E3C2', '#B8E986', '#000000',
  '#4A4A4A', '#9B9B9B', '#FFFFFF',
];

const styles = {
  root: {
    margin: 12,
  },
  rootMini: {},
  title: {
    marginBottom: 6,
  },
  titleMini: {
    display: 'none',
  },
  button: {
    width: 28,
    height: 28,
    border: '1px solid #999',
    borderRadius: 2,
    padding: 2,
    boxShadow: '0 0 0 2px #fff inset',
    cursor: 'pointer',
    position: 'relative',
  },
  buttonBackround: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center center',
  },
  buttonBackroundMini: {
    width: 14,
    height: 14,
    position: 'absolute',
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center center',
  },
  buttonBackround2: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  buttonBackround2Mini: {
    width: 14,
    height: 14,
    position: 'absolute',
  },
  buttonMini: {
    width: 16,
    height: 16,
    border: '1px solid #999',
    borderRadius: 2,
    cursor: 'pointer',
    position: 'relative',
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

const defaultFunction = "return inData === 1 ? 'red' : 'black';";


function Color(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAnchorEl(null);
  };

  const handleChange = (colors, e) => {
    e.preventDefault();
    e.stopPropagation();

    const { r, g, b, a } = colors.rgb;
    const v = props.mini ? props.data.value : props.data;
    
    if (v === 'transparent') {
      const value = props.mini ? { value: `rgba(${r},${g},${b},1)` } : `rgba(${r},${g},${b},1)`;
      props.onChange(props.id, props.options, null, value)
    } else {
      const value = props.mini ? { value: `rgba(${r},${g},${b},${a})` } : `rgba(${r},${g},${b},${a})`;
      props.onChange(props.id, props.options, null, value)
    }
  }

  const handleClickButton = (value) => {
    if (value === null) {
      props.onChange(props.id, props.options, null, { ...props.data, enabled: false, color: null, value: props.data.color || '' })
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
            title: ' Параметры привязки',
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
            title: ' Параметры привязки',
            type: 'tree',
            id: props.route.layout ? 'elements': 'elementsAndAny',
            template: props.data.template,
            selectnodeid: props.data.did || core.cache.dialogDevice,
            selectId: props.data.prop,
            selectTitle: props.data.title,
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
      const template = data.template;
      core.cache.dialogDevice = did;

      if (prop) {
        const obj = createValueFunc(func);

        if (obj.error) {
          core.actions.app.alertOpen('warning', 'Function error: ' + obj.error.message);
        } else { 
          try {
            const v = obj.body.call(null, 0, {})
            const params = { ...props.data, enabled: true, did, prop, title, template, func, color: props.data.value };

            core.transfer.unsub('form_dialog', handleDialogClick3);
            core.actions.appdialog.close();
      
            props.onChange(props.id, props.options, null, params)
          } catch(e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      } else {
        const params = { ...props.data, enabled: null, prop: null, title: null, func, color: {} };

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
        props.onChange(props.id, props.options, null, { enabled: false, _bind: null, title: null, color: null, func, value: props.data.color || '' })
      }
    } else {
      core.transfer.unsub('form_dialog', handleDialogClick);
    }
  }

  const handleClear = (e) => {
    props.onChange(props.id, props.options, null, { enabled: false, _bind: null, title: null, did: null, color: {}, func: props.data.func, value: props.data.color || {} })
  }

  const open = Boolean(anchorEl);
  const s = {};

  if (props.mini) {
    s.root = styles.rootMini;
    s.title = styles.titleMini;
    s.button = styles.buttonMini;
    s.buttonBackround = styles.buttonBackroundMini;
    s.buttonBackround2 = styles.buttonBackround2Mini;
    s.data = props.data.value;
  } else {
    s.root = styles.root;
    s.title = styles.title;
    s.button = styles.button;
    s.buttonBackround = styles.buttonBackround;
    s.buttonBackround2 = styles.buttonBackround2;
    s.data = props.data;
  }

  if (props.data.enabled) {
    return (
      <>
        <input
          className="core"
          style={styles.rootMini2} 
          disabled={true}
          value={props.data.title || ''}
        />
        <ButtonMenu
          enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
          icon={props.data.enabled}
          mode={props.mode} 
          onChange={handleClickButton}
          onClear={handleClear} 
        />
      </>
    )
  }

  return (
    <>
      <div style={s.root}>
        <div style={{ ...s.title, ...props.getStyle(props)}}>{props.options.title}</div>
        <div style={s.button} onClick={handleClick}>
          <div style={s.buttonBackround}/>
          <div style={{ ...s.buttonBackround2, backgroundColor: s.data }}/>
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <SketchPicker
            color={s.data}
            presetColors={PRESET_COLORS}
            onChange={handleChange}
          />
        </Popover>
      </div>
      <ButtonMenu
        enabled={props.mini ? (props.options.bind !== undefined ? props.options.bind : props.route.type) : false} 
        icon={props.data.enabled}
        mode={props.mode} 
        onChange={handleClickButton}
        onClear={handleClear}
      />
    </>
  );
}


export default React.memo(Color);