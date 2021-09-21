import React from 'react';
import core from 'core';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Divider from '@material-ui/core/Divider';

import AddIcon from '@material-ui/icons/PostAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TuneIcon from '@material-ui/icons/Tune';
import LinkIcon from '@material-ui/icons/Link';


const styles = {
  root: {
  },
  root2: {
    display: 'flex',
  },
  input: {
  fontSize: 12,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: '#3f51b5',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',

  },
  divider: {
    position: 'relative',
    height: 22,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '1px solid #e9e9e9',
    borderBottom: '1px solid #e9e9e9',
  },
  dividerTitle: {
    display: 'flex',
    width: '100%',
    height: 16,
    background: '#D9E1F2',
    color: '#305496',
    fontSize: 12,
    fontFamily: 'Helvetica,Arial,sans-serif',
    fontWeight: 'bold',
    paddingLeft: 6,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    width: '100%',
    height: 23,
    color: '#707070',
    fontSize: 12,
    fontFamily: 'Helvetica,Arial,sans-serif',
  },
  label: {
    display: 'flex',
    width: '40%',
    alignItems: 'center',
    paddingLeft: 6,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    background: '#FFF',
    marginLeft: 2,
  },
  value: {
    display: 'flex',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    background: '#FFF',
    marginLeft: 2,
    borderLeft: '1px solid #f3f3f3',
  },
  label2: {
    display: 'flex',
    width: '40%',
    alignItems: 'center',
    paddingLeft: 6,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    background: '#F5F5F5',
    marginLeft: 2,
  },
  value2: {
    display: 'flex',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    background: '#F5F5F5',
    marginLeft: 2,
    borderLeft: '1px solid #f3f3f3',
  },
  button: {
    position: 'absolute',
    top: -1,
    right: 8,
    width: 20,
    height: 20,
  },
  button2: {
    width: 22,
    height: 22,
  },
  stub: {
    width: '100%',
  },
  stub2: {
    borderLeft: '1px solid #d8e1e8',
    margin: '4px 6px'
  },
}

const COMMANDS = {
  device: 'devcmd',
  device_any: 'devcmdAndAny',
  setval: 'setitems',
  setval_any: 'setitemsAndAny',
  dialog: 'dialog',
  dialog_any: 'dialogAndAny',
  layout: 'layoutx',
  plugin: 'pluginx',
  script: 'scriptx',
  visscript: 'visscriptx',
}

const COMMANDS_TITLES = {
  device: 'Команда устройства',
  device_any: 'Команда устройства',
  setval_any: 'Установить значение',
  plugin: 'Команда плагина',
  layout: 'Переход на экран',
  script: 'Запуск сценария',
  setval: 'Установить значение',
  dialog: 'Показать диалог',
  visscript: 'Скрипт визуализации'
}

const TITLES = {
  singleClickLeft: 'Одиночный клик',
  doubleClickLeft: 'Двойной клик',
  longClickLeft: 'Долгое нажатие',
  mouseDownLeft: 'Кнопка нажата',
  mouseUpLeft: 'Кнопка отпущена',
  singleClickRight: 'Одиночный клик',
}

const LEFT = [
  'singleClickLeft', 'doubleClickLeft', 'longClickLeft',
  'mouseDownLeft', 'mouseUpLeft'
];

const RIGHT = [ 'singleClickRight' ];


function ValueItem(props) {
  return (
    <>
     <input
       className="core"
       type="text"
       style={styles.input} 
       disabled={true}
       value={props.data.title || ''}
     />
     {props.data.command ? null : <div style={styles.stub} />}
      <div style={styles.root2}>
        <div style={styles.stub2} />
          <IconButton className="nb" size="small" style={styles.button2} onClick={props.onClick} >
            <MoreVertIcon fontSize="small" />
          </IconButton>
      </div>
    </>
  )
}


function Actions(props) {
  const [state, setState] = React.useState({ anchorEl: null, key: null, type: null });

  const handleClickMenuLeft = (event, key) => {
    setState({ key, type: 'menu-left', anchorEl: event.currentTarget });
  }

  const handleClickMenuRight = (event, key) => {
    setState({ key, type: 'menu-right', anchorEl: event.currentTarget });
  }


  const handleClickLeft = (event) => {
    setState({ type: 'left', anchorEl: event.currentTarget });
  };

  const handleClickRight = (event) => {
    setState({ type: 'right', anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({ anchorEl: null, key: null, type: state.type });
  };

  const handleClickAdd = (id) => {
    handleClose();
    props.onChange(props.id, props.options, null, { 
      ...props.data, [state.type]: props.data[state.type].concat({ action: id, value: {} }), 
    })
  }

  const handleClickClear = (e, type, k) => {
    e.preventDefault();
    e.stopPropagation();

    props.onChange(props.id, props.options, null, { 
      ...props.data, 
      [type]: props.data[type].map((i, key) => {
        if (k === key) {
          return { action: i.action, value: {} };
        }
        return i;
      }), 
    })
  }

  const handleClickMenu = (command, event) => {
    const type = state.type === 'menu-left' ? 'left' : 'right';
    
    if (command === 'link') {
      const anchorEl = state.anchorEl;
      const item =  props.data[type].find((_, key) => key === state.key);

      setState({  anchorEl: null, type: state.type, key: state.key });

      if (item.command && !(item.command === 'fullscreen' || item.command === 'refresh' || item.command === 'exit' || item.command === 'close' || item.command === 'initdialog' )) {
        hanndleDialog(item.command, type, state.key, item.did || item.id, item.prop, item.func, item.title, item.local);
      } else {
        setState({ type: 'option-' + type, anchorEl, key: state.key });
      }
    }

    if (command === 'unlink') {
      handleClose();
      props.onChange(props.id, props.options, null, { 
        ...props.data, [type]: props.data[type].map((i, key) => key === state.key ? ({ action: i.action, value: {} }) : i), 
      })
    }
    
    if (command === 'delete') {
      handleClose();
      props.onChange(props.id, props.options, null, { 
        ...props.data, [type]: props.data[type].filter((i, key) => key !== state.key), 
      })
    }

    if (command === 'up') {
      const targetKey = state.key - 1;

      handleClose();
      props.onChange(props.id, props.options, null, { 
        ...props.data, [type]: props.data[type]
          .filter((i, key) => key !== targetKey)
          .reduce((p, c, key) => {
            if (key === targetKey) {
              return p.concat(c, props.data[type][targetKey])
            }
            return p.concat(c)
          }, []), 
      })
    }

    if (command === 'down') {
      const targetKey = state.key ;

      handleClose();

      if (props.data[type].length -1 !== targetKey) {
        props.onChange(props.id, props.options, null, { 
          ...props.data, [type]: props.data[type]
            .filter((i, key) => key !== state.key)
            .reduce((p, c, key) => {
              if (key === targetKey) {
                return p.concat(c, props.data[type][state.key])
              }
              return p.concat(c)
            }, []), 
        })
      }
    }
  }

  const handleClickOption = (command) => {
    const type = state.type === 'option-left' ? 'left' : 'right';
    
    if (command === 'fullscreen' || command === 'refresh' || command === 'exit' || command === 'close' || command === 'initdialog' ) {
      props.onChange(props.id, props.options, null, { 
        ...props.data, 
        [type]: props.data[type].map((i, key) => {
          if (state.key === key) {
            return { action: i.action, value: {}, title: command, command};
          }
          return i;
        }), 
      })
    } else {
      hanndleDialog(command, type, state.key, props.data[type][state.key].did || props.data[type][state.key].id, props.data[type][state.key].prop, props.data[type][state.key].func, props.data[type][state.key].title, props.data[type][state.key].local);
    }
    handleClose();
  }

  const hanndleDialog = (command, type, key, did, prop, func, title, local) => {
    core.transfer.sub('form_dialog', handleDialogClick);
    core.actions.appdialog.data({
      id: 'action_dialog', 
      open: true, 
      transferid: 'form_dialog',
      template: {
        noscroll: command === 'setval' || command === 'setval_any',
        disabledSave: (command === 'device' || command === 'device_any') ? true : false,
        title: COMMANDS_TITLES[command],
        type: (command === 'device' || command === 'device_any' || command === 'setval' || command === 'setval_any') ? 'tree' : 'options',
        id: COMMANDS[command] || 'null',
        dialog: 'channellink',
        selectnodeid: did || core.cache.dialogDevice,
        selectId: prop,
        selectTitle: title,
        select: prop,
        itemType: type,
        itemIndex: key,
        itemCommand: command,
        data: props.data[type][key],
        func: func || 'return inData + 1;',
        local: local,
      },
    });
  }

  const handleDialogClick = (data, context) => {
    if (data !== null && data !== ':exit:') {
      core.transfer.unsub('form_dialog', handleDialogClick);
      core.actions.appdialog.close();
  
      if (context.template.itemCommand === 'device' || context.template.itemCommand === 'device_any') {
        props.onChange(props.id, props.options, null, { 
          ...props.data, 
          [context.template.itemType]: props.data[context.template.itemType].map((i, key) => {
            if (context.template.itemIndex === key) {
              return { ...i, ...data.result.value, title: data.result.title, command: context.template.itemCommand };
            }
            return i;
          }), 
        })
      } else if (context.template.itemCommand === 'setval' || context.template.itemCommand === 'setval_any') {
        props.onChange(props.id, props.options, null, { 
          ...props.data, 
          [context.template.itemType]: props.data[context.template.itemType].map((i, key) => {
            if (context.template.itemIndex === key) {
              const params = {}
              if (data.prop) {
                params.did = data.did;
                params.prop = data.prop;
                params.title = data.title;
                params.func = data.func;
                params.local = data.local;
                params.command = context.template.itemCommand;
                params.action = i.action;
              } else {
                params.action = i.action;
                params.value = {};
              }
              return params;
            }
            return i;
          }), 
        })
      } else {
        core.transfer.unsub('form_dialog', handleDialogClick);
        core.actions.appdialog.close();
        
        props.onChange(props.id, props.options, null, { 
          ...props.data, 
          [context.template.itemType]: props.data[context.template.itemType].map((i, key) => {
            if (context.template.itemIndex === key) {
              return { 
                ...i, 
                id: context.component.id,
                title: context.component.title, 
                value: data, 
                command: context.template.itemCommand 
              };
            }
            return i;
          }), 
        }) 
      }
      
    }
    core.transfer.unsub('form_dialog', handleDialogClick);
  }

  const handleClickToolbar = (e, key, i, type) => {
    if (type === 'left') {
      handleClickMenuLeft(e, key)
    } else {
      handleClickMenuRight(e, key)
    }
  }


  const getMenu = (route) => {
    if (state.type === 'left') {
      return LEFT
        .map((i, key) => <MenuItem key={key} onClick={() => handleClickAdd(i)}>{TITLES[i]}</MenuItem>);
    }

    if (state.type === 'right') {
      return RIGHT
        .map((i, key) => <MenuItem key={key} onClick={() => handleClickAdd(i)}>{TITLES[i]}</MenuItem>);
    }

    if (state.type === 'menu-left' || state.type === 'menu-right') {
      return [
        <MenuItem key="-2" onClick={(e) => handleClickMenu('link', e)}>Привязать</MenuItem>,
        <MenuItem key="-1" onClick={(e) => handleClickMenu('unlink', e)}>Отвязать</MenuItem>,
        <Divider key="0" />,
        <MenuItem key="1" onClick={(e) => handleClickMenu('up', e)}>Вверх</MenuItem>,
        <MenuItem key="2" onClick={(e) => handleClickMenu('down', e)}>Вниз</MenuItem>,
        <Divider key="3" />,
        <MenuItem key="4" onClick={(e) => handleClickMenu('delete', e)}>Удалить</MenuItem>,
      ]
    }

    if (state.type === 'option-left' || state.type === 'option-right') {
      if (route.dialog) {
        return [
          <MenuItem key="0" onClick={() => handleClickOption('device_any')}>Команда устройства</MenuItem>,
          <MenuItem key="1" onClick={() => handleClickOption('script')}>Запуск сценария</MenuItem>,
          <MenuItem key="2" onClick={() => handleClickOption('setval_any')}>Установить значение</MenuItem>,
          <MenuItem key="3" onClick={() => handleClickOption('dialog')}>Показать диалог</MenuItem>,
          <Divider key="-" />,
          <MenuItem key="4" onClick={() => handleClickOption('initdialog')}>Начальный диалог</MenuItem>,
          <MenuItem key="5" onClick={() => handleClickOption('close')}>Закрыть диалог</MenuItem>,
        ]
      }
      return [
        <MenuItem key="2" onClick={() => handleClickOption(route.container ? 'device_any' : 'device')}>Команда устройства</MenuItem>,
        <MenuItem key="3" onClick={() => handleClickOption('plugin')}>Команда плагина</MenuItem>,
        <MenuItem key="4" onClick={() => handleClickOption('script')}>Запуск сценария</MenuItem>,
        <MenuItem key="5" onClick={() => handleClickOption('layout')}>Переход на экран</MenuItem>,
        <MenuItem key="6" onClick={() => handleClickOption(route.container ? 'setval_any' : 'setval')}>Установить значение</MenuItem>,
        <MenuItem key="7" onClick={() => handleClickOption(route.container ? 'dialog_any' : 'dialog')}>Показать диалог</MenuItem>,
        <MenuItem key="8" onClick={() => handleClickOption('visscript')}>Скрипт визуализации</MenuItem>,
        <Divider key="-" />,
        <MenuItem key="9" onClick={() => handleClickOption('fullscreen')}>Полный экран</MenuItem>,
        <MenuItem key="10" onClick={() => handleClickOption('refresh')}>Обновить экран</MenuItem>,
        <MenuItem key="11" onClick={() => handleClickOption('exit')}>Выход</MenuItem>,
      ]
    }
    return null;
  }

  return (
    <>
      <Menu
        anchorEl={state.anchorEl}
        keepMounted
        open={Boolean(state.anchorEl)}
        onClose={handleClose}
      >
        {getMenu(props.route)}
      </Menu>
      <div style={styles.divider} >
        <div style={styles.dividerTitle} >
          {props.options.title ? `Левая кнопка мыши (${props.options.title})` : 'Левая кнопка мыши'}
        </div>
        <IconButton className="nb2" style={styles.button} onClick={handleClickLeft} size="small" >
          <AddIcon fontSize="small" />
        </IconButton>
      </div>
      {props.data.left.map((i, key) =>
        <div key={'l_'+ key} style={styles.item} >
          <div style={key & 1 ? styles.label2 : styles.label}>{TITLES[i.action]}</div>
          <div style={key & 1 ? styles.value2 : styles.value}><ValueItem data={i} onClick={(e) => handleClickToolbar(e, key, i, 'left')} onClick2={(e) => handleClickMenuLeft(e, key)} onClick3={(e) => handleClickClear(e, 'left', key, i)} /></div>
        </div>
      )}
      <div style={styles.divider} >
        <div style={styles.dividerTitle} >
          {props.options.title ? `Правая кнопка мыши (${props.options.title})` : 'Правая кнопка мыши'}
        </div>
        <IconButton className="nb2" style={styles.button} onClick={handleClickRight} size="small" >
          <AddIcon fontSize="small" />
        </IconButton>
      </div>
      {props.data.right.map((i, key) =>
        <div key={'r_'+ key} style={styles.item} >
          <div style={key & 1 ? styles.label2 : styles.label}>{TITLES[i.action]}</div>
          <div style={key & 1 ? styles.value2 : styles.value}><ValueItem data={i} onClick={(e) => handleClickToolbar(e, key, i, 'right')} onClick2={(e) => handleClickMenuRight(e, key)} onClick3={(e) => handleClickClear(e, 'right', key, i)} /></div>
        </div>
      )}
    </>
  )
}


export default React.memo(Actions);