import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
  'mouseDownLeft', 'mouseUpLeft', 'mouseDownLeft'
];

const RIGHT = [ 'singleClickRight' ];


function ValueItem(props) {
  return (
    <>
     <div style={styles.stub} />
      <IconButton size="small" >
        <TuneIcon fontSize="inherit" />
      </IconButton>
      <div style={styles.root2}>
        <div style={styles.stub2} />
          <IconButton className="nb" style={styles.button2} size="small" >
            <MoreVertIcon fontSize="small" />
          </IconButton>
      </div>
    </>
  )
}


function Actions(props) {
  const [state, setState] = React.useState({ state: null });

  const handleClickLeft = (event) => {
    setState({ type: 'left', anchorEl: event.currentTarget });
  };

  const handleClickRight = (event) => {
    setState({ type: 'right', anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({});
  };


  return (
    <>
      <Menu
        anchorEl={state.anchorEl}
        keepMounted
        open={Boolean(state.anchorEl)}
        onClose={handleClose}
      >
        {state.type === 'left' ? 
          LEFT.map(i => <MenuItem onClick={handleClose}>{TITLES[i]}</MenuItem>) :
          RIGHT.map(i => <MenuItem onClick={handleClose}>{TITLES[i]}</MenuItem>)
        }
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
          <div style={key & 1 ? styles.value2 : styles.value}><ValueItem /></div>
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
          <div style={key & 1 ? styles.value2 : styles.value}><ValueItem /></div>
        </div>
      )}
    </>
  )
}


export default React.memo(Actions);