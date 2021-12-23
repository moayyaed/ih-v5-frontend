import React from 'react';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/PostAdd';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import CompactForm from 'components/@Form/Compact'
import { keys } from '@material-ui/core/styles/createBreakpoints';
import core from 'core';


const styles = {
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
  button: {
    position: 'absolute',
    top: -1,
    right: 8,
    width: 20,
    height: 20,
  },
  button2: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 20,
    height: 20,
  },
  item0: {
    padding: 12,
  },
  item1: {
    padding: 12,
    paddingTop: 0,
  }
}

const EMPTY_STYLE = {};

const cache = {}
const route = {}

function checkId(data, index) {
  if (data[index] === undefined) {
    return index
  }
  return checkId(data, index + 1)
}

function getId(list) {
  const temp = {};

  list.forEach(i => {
    temp[i.id] = true;
  });

  return checkId(temp, 1);
}

function handleClickAdd(props) {
  const data = { ...props.options.itemDefault, id: getId(props.data) }
  props.onChange(props.id, props.options, null, props.data.concat(data))
}

function handleClickDelete(props, id) {
  props.onChange(props.id, props.options, null, props.data.filter(i => i.id !== id))
}

function handleChange(props, id, key, options, target, value) {
  const data = props.data.map(i => {
    if (i.id === id) {
      return { ...i, [key]: value };
    }
    return i;
  });
  props.onChange(props.id, props.options, null, data)
}

function getStyle() {
  return EMPTY_STYLE;
}

function Combine(props) {
  return (
    <>
      <div style={styles.divider} >
        <div style={styles.dividerTitle} >
          {core.lang(props.options)}
        </div>
        <IconButton className="nb2" style={styles.button} onClick={() => handleClickAdd(props)} size="small" >
          <AddIcon fontSize="small" />
        </IconButton>
      </div>
      {props.data.map((i, key) =>
        <div key={key} style={key === 0 ? styles.item0 : styles.item1}>
          <div style={styles.divider} >
            <div style={styles.dividerTitle} >
              {`${props.options.itemTitle} ${i.id}`}
            </div>
            <IconButton className="nb2" style={styles.button2} onClick={() => handleClickDelete(props, i.id)} size="small" >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </div>
          <Paper >
            <CompactForm 
              scheme={props.options.itemScheme} 
              data={i} 
              cache={cache} 
              route={route} 
              onChange={(a, b, c, d) => handleChange(props, i.id, a, b, c, d)} 
              getStyle={getStyle} 
            />
          </Paper>
        </div>
      )}
    </>
  )
}


export default React.memo(Combine);