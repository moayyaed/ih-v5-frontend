import React from 'react';

import Box from 'components/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import RestoreIcon from '@material-ui/icons/TableChart';
import FavoriteIcon from '@material-ui/icons/Web';
import LocationOnIcon from '@material-ui/icons/Extension';

const styles = {
  box: {
    width: 70,
    height: '100%',
    backgroundColor: '#607d8b',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px',
    overflow: 'hidden',
    flexShrink: 0,
    paddingTop: 70,
    zIndex: 100,
  },
};

const useStyles = makeStyles({
  root: {
    flexDirection: 'column',
    justifyContent: 'end',
    width: 70,
    height: '100%',
    backgroundColor: 'transparent',
  },
  bottom: {
    padding: '0px!important',
    maxWidth: 70,
    minWidth: 70,
    maxHeight: 70,
  }
});

function AppMenu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <Box style={styles.box}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction className={classes.bottom} label="Project structure" icon={<RestoreIcon />} />
        <BottomNavigationAction className={classes.bottom} label="Layouts" icon={<FavoriteIcon />} />
        <BottomNavigationAction className={classes.bottom} label="Plugins" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}


export default AppMenu;