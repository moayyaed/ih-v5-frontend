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
    width: '100%',
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
    width: '100%',
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
      <div style={styles.root2}>
        <div style={styles.stub2} />
          <IconButton className="nb" size="small" style={styles.button2} onClick={props.onClick} >
            <MoreVertIcon fontSize="small" />
          </IconButton>
      </div>
    </>
  )
}


function Actions2(props) {
  const [state, setState] = React.useState({ anchorEl: null, key: null, type: null });


  const handleClickNewItem = (event) => {
    props.onChange(props.id, props.options, null, props.data.concat({ }))
  };

  const handleClickToolbar = (e, key, i, type) => {
    setState({ key, type: 'menu', anchorEl: e.currentTarget });
  }

  const handleClickMenu = (command, event) => {
    if (command === 'link') {
      hanndleDialog(state.key, props.options);
      handleClose();
      /*
      if (item.command && !(item.command === 'fullscreen' || item.command === 'refresh' || item.command === 'exit' || item.command === 'close' || item.command === 'initdialog' )) {
        hanndleDialog(item.command, type, state.key, item.did || item.id, item.prop, item.func, item.title, item.local);
      } else {
        setState({ type: 'option-' + type, anchorEl, key: state.key });
      }
      */
    }

    if (command === 'unlink') {
      handleClose();
      props.onChange(props.id, props.options, null, props.data.map((i, key) => key === state.key ? ({ }) : i))
    }
    
    if (command === 'delete') {
      handleClose();
      props.onChange(props.id, props.options, null, props.data.filter((i, key) => key !== state.key))
    }

    if (command === 'up') {
      const targetKey = state.key - 1;

      handleClose();
      props.onChange(props.id, props.options, null, props.data
        .filter((i, key) => key !== targetKey)
        .reduce((p, c, key) => {
          if (key === targetKey) {
            return p.concat(c, props.data[targetKey])
          }
          return p.concat(c)
        }, []))
    }

    if (command === 'down') {
      const targetKey = state.key ;

      handleClose();

      if (props.data.length -1 !== targetKey) {
        props.onChange(props.id, props.options, null, props.data
          .filter((i, key) => key !== state.key)
          .reduce((p, c, key) => {
            if (key === targetKey) {
              return p.concat(c, props.data[state.key])
            }
            return p.concat(c)
          }, []));
      }
    }
  }

  const handleClose = () => {
    setState({ anchorEl: null, key: null, type: state.type });
  };


  const hanndleDialog = (key, options) => {
    const template = {
      disabledSave: options.params.save !== undefined ? !options.params.save : false,
      ...options.params,
      type: options.params.variant,
      selectnodeid: props.data[key].id || core.cache.dialogDevice,
      select: props.data.prop,
      data: props.data,
      title: core.lang(options.params),
      key,
    }
    core.transfer.sub('form_dialog', handleDialogClick);
    core.actions.appdialog.data({ 
      open: true,
      transferid: 'form_dialog',
      template: template,
    });
  }

  const handleDialogClick = (data, context) => {
    if (data === ':exit:') {
      core.transfer.unsub('form_dialog', handleDialogClick);
    } else {
      core.transfer.unsub('form_dialog', handleDialogClick);
      core.actions.appdialog.close();
      
      if (data.result) {

      } else {
        const value = { ...data };
        const key = context.template.key;
        delete value.active;
        const payload = {
          id: context.component.id, 
          title: context.component.title,
          value,
        };

        props.onChange(props.id, props.options, null, props.data.map((i, index) => index === key ? (payload) : i))
      }
    } 
  }

  const getMenu = (route) => {
    if (state.type === 'menu') {
      return [
        <MenuItem key="-2" onClick={(e) => handleClickMenu('link', e)}>{core.lang({ lang: 'prop_link'})}</MenuItem>,
        <MenuItem key="-1" onClick={(e) => handleClickMenu('unlink', e)}>{core.lang({ lang: 'prop_unlink'})}</MenuItem>,
        <Divider key="0" />,
        <MenuItem key="1" onClick={(e) => handleClickMenu('up', e)}>{core.lang({ lang: 'prop_up'})}</MenuItem>,
        <MenuItem key="2" onClick={(e) => handleClickMenu('down', e)}>{core.lang({ lang: 'prop_down'})}</MenuItem>,
        <Divider key="3" />,
        <MenuItem key="4" onClick={(e) => handleClickMenu('delete', e)}>{core.lang({ lang: 'prop_del'})}</MenuItem>,
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
          {core.lang({ prop: 'bind' })}
        </div>
        <IconButton className="nb2" style={styles.button} onClick={handleClickNewItem} size="small" >
          <AddIcon fontSize="small" />
        </IconButton>
      </div>
      {props.data.map((i, key) =>
        <div key={'l_'+ key} style={styles.item} >
          <div style={key & 1 ? styles.value2 : styles.value}><ValueItem data={i} onClick={(e) => handleClickToolbar(e, key, i, 'left')} /></div>
        </div>
      )}
    </>
  )
}


export default React.memo(Actions2);