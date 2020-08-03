import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';

import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    border: '1px solid #F5F5F5',
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 600,
    color: '#394b59',
    boxShadow: '0 1px 1px rgba(16, 22, 26, 0.15)',
    zIndex: 4,
    borderRadius: 3,
  }
}));


function _List(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.title}>{props.options.title}</div>
      <List className={classes.root} >
        {props.options.data.map(item => {
          return (
            <ListItem 
              key={item.id} 
              role={undefined} 
              dense button 
              onClick={() => props.onChange(props.id, props.options, null, props.data.id === item.id ? {} : item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={props.data.id === item.id}
                  color="primary"
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': item.title }}
                />
              </ListItemIcon>
              <ListItemText id={item.title} primary={item.title} />
            </ListItem>
          );
        })}
      </List>
    </>
  )
}


export default React.memo(_List);