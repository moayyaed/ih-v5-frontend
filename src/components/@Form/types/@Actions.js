import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Divider from '@material-ui/core/Divider';

import AddIcon from '@material-ui/icons/PostAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TuneIcon from '@material-ui/icons/Tune';


const styles = {
  root: {
  },
  root2: {
    display: 'flex',
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

const TITLES = {
  singleClickLeft: 'Single Click',
  doubleClickLeft: 'Double Click',
  longClickLeft: 'Long Click',
  mouseDownLeft: 'Mouse Down',
  mouseUpLeft: 'Mouse Up',
  singleClickRight: 'Single Click',
}

const LEFT = [
  'singleClickLeft', 'doubleClickLeft', 'longClickLeft',
  'mouseDownLeft', 'mouseUpLeft'
];

const RIGHT = [ 'singleClickRight' ];


function ValueItem(props) {
  return (
    <>
     <div style={styles.stub} />
      <IconButton size="small" onClick={props.onClick} >
        <TuneIcon fontSize="inherit" />
      </IconButton>
      <div style={styles.root2}>
        <div style={styles.stub2} />
          <IconButton className="nb" size="small" style={styles.button2} onClick={props.onClick2} >
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

  const handleClickOptionLeft = (event, key) => {
    setState({ key, type: 'option-left', anchorEl: event.currentTarget });
  }
  const handleClickOptionRight = (event, key) => {
    setState({ key, type: 'option-right', anchorEl: event.currentTarget });
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
      ...props.data, [state.type]: props.data[state.type].concat({ action: id, value: null }), 
    })
  }

  const handleClickMenu = (command) => {
    const type = state.type === 'menu-left' ? 'left' : 'right';
    
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

    handleClose();
  }


  const getMenu = () => {
    if (state.type === 'left') {
      return LEFT.map((i, key) => <MenuItem key={key} onClick={() => handleClickAdd(i)}>{TITLES[i]}</MenuItem>);
    }

    if (state.type === 'right') {
      return RIGHT.map((i, key) => <MenuItem key={key} onClick={() => handleClickAdd(i)}>{TITLES[i]}</MenuItem>);
    }

    if (state.type === 'menu-left' || state.type === 'menu-right') {
      return [
        <MenuItem key="1" onClick={() => handleClickMenu('up')}>Up</MenuItem>,
        <MenuItem key="2" onClick={() => handleClickMenu('down')}>Down</MenuItem>,
        <Divider key="3" />,
        <MenuItem key="4" onClick={() => handleClickMenu('delete')}>Delete</MenuItem>,
      ]
    }

    if (state.type === 'option-left' || state.type === 'option-right') {
      return [
        <MenuItem key="2" onClick={() => handleClickOption('device')}>Device Command</MenuItem>,
        <MenuItem key="3" onClick={() => handleClickOption('plugin')}>Plugin Command</MenuItem>,
        <MenuItem key="4" onClick={() => handleClickOption('script')}>Run Script</MenuItem>,
        <MenuItem key="5" onClick={() => handleClickOption('layout')}>Go To Layout</MenuItem>,
        <MenuItem key="6" onClick={() => handleClickOption('container')}>Change Container</MenuItem>,
        <Divider key="-" />,
        <MenuItem key="7" onClick={() => handleClickOption('refresh')}>Refresh</MenuItem>,
        <MenuItem key="8" onClick={() => handleClickOption('fullscreen')}>Full Screen</MenuItem>,
        <MenuItem key="9" onClick={() => handleClickOption('exit')}>Exit</MenuItem>,
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
        {getMenu()}
      </Menu>
      <div style={styles.divider} >
        <div style={styles.dividerTitle} >
          Mouse Left
        </div>
        <IconButton className="nb2" style={styles.button} onClick={handleClickLeft} size="small" >
          <AddIcon fontSize="small" />
        </IconButton>
      </div>
      {props.data.left.map((i, key) =>
        <div key={'l_'+ key} style={styles.item} >
          <div style={key & 1 ? styles.label2 : styles.label}>{TITLES[i.action]}</div>
          <div style={key & 1 ? styles.value2 : styles.value}><ValueItem onClick={(e) => handleClickOptionLeft(e, key)} onClick2={(e) => handleClickMenuLeft(e, key)} /></div>
        </div>
      )}
      <div style={styles.divider} >
        <div style={styles.dividerTitle} >
          Mouse Right
        </div>
        <IconButton className="nb2" style={styles.button} onClick={handleClickRight} size="small" >
          <AddIcon fontSize="small" />
        </IconButton>
      </div>
      {props.data.right.map((i, key) =>
        <div key={'r_'+ key} style={styles.item} >
          <div style={key & 1 ? styles.label2 : styles.label}>{TITLES[i.action]}</div>
          <div style={key & 1 ? styles.value2 : styles.value}><ValueItem onClick={(e) => handleClickOptionRight(e, key)} onClick2={(e) => handleClickMenuRight(e, key)} /></div>
        </div>
      )}
    </>
  )
}


export default React.memo(Actions);