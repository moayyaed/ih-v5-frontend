import React, { Component } from 'react';

import { FixedSizeList as List, shouldComponentUpdate } from 'react-window';

import { fade, withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';

import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';

const data = new Array(1000)
  .fill(0)
  .map((i, k) => ({ id: k, title: 'row'+k, value1: k, value2: '_'+k }))


const classes = (theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 6,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 6,
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
});
  
const styles = {
  toolbar: {
    height: 50,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxAll: {
    color: '#fff',
    marginLeft: 4,
  },
  filterContainer: {
    right: 6,
    position: 'absolute',
    zIndex: 1000,
    height: '100%',
    width: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '12px 24px',
  },
  filterToolbarContainer: {
    width: 300,
  },
  filterButton: {
    marginLeft: 24,
  }
}


class ButtonFilter extends Component {
  state = { 
    open: false, 
    anchorEl: null, 
    selectAll: true, 
    data: data.map(i => i[this.props.column.dataKey]) 
  }
  
  handleOpen = (e) => {
    this.setState({ open: true, anchorEl: e.currentTarget })
  }

  handleClose = () => {
    this.setState({ open: false, anchorEl: null })
  }

  handleSelectAll = (e) => {
    this.setState({ selectAll: e.target.checked })
  }

  handleSearch = (e) => {
    if (e.target.value) {
      this.setState({ 
        data: data
          .map(i => i[this.props.column.dataKey])
          .filter(i => i.indexOf(e.target.value) !== -1)
      })
    } else {
      this.setState({ data: data.map(i => i[this.props.column.dataKey]) })
    }
  }

  renderRow = ({ index, style, data }) => (
    <ListItem key={index} style={style} role={undefined} dense button onClick={() => {}}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={data.selectAll}
          tabIndex={-1}
          disableRipple
          color="primary"
        />
      </ListItemIcon>
      <ListItemText primary={data.data[index]} />
    </ListItem>
  );

  render() {
    const classes = this.props.classes;
    return (
      <div style={styles.filterContainer}>
        <IconButton size="small" onClick={this.handleOpen} >
          <FilterListIcon fontSize="inherit" />
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div style={styles.filterToolbarContainer}>
            <AppBar position="static">
              <Divider orientation="vertical" flexItem  />
              <Toolbar style={styles.toolbar}>
                <Checkbox
                  style={styles.checkboxAll}
                  edge="start"
                  defaultChecked={true}
                  tabIndex={-1}
                  disableRipple
                  color="default"
                  onChange={this.handleSelectAll}
                />
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={this.handleSearch}
                  />
                </div>
              </Toolbar>
            </AppBar>
          </div>
          <Divider />
          <List
            height={450}
            itemCount={this.state.data.length}
            itemSize={50}
            width={300}
            itemData={this.state}
          >
            {this.renderRow}
          </List>
          <Divider />
          <div style={styles.filterButtonsContainer}>
            <Button 
              variant="outlined"
              onClick={this.handleClose}
            >
                Отмена
            </Button>
            <Button 
              disableElevation
              color="primary"
              variant="contained"
              style={styles.filterButton}
              onClick={this.handleClose}
            >
              ОК
            </Button>
          </div>
        </Popover>
      </div>
    )
  }
} 

export default withStyles(classes)(ButtonFilter);