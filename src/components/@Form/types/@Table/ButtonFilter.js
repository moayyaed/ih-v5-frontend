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
import CloseIcon from '@material-ui/icons/Close';

import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';

import { blueGrey } from '@material-ui/core/colors';
import { DataUsage } from '@material-ui/icons';


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
    background: '#607d8b',
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

function cloneObject(i) {
  if ((!!i) && (i.constructor === Object)) {
    Object
      .keys(i)
      .reduce((p, c) => {
        return { ...p, [c]: cloneObject(i[c]) }
      }, {});
  }
  if (Array.isArray(i)) {
    return i.map(cloneObject);
  }
  return i;
}

function getValue(type, data) {
  switch(type) {
    case 'cb':
      return data === undefined ? '' : data ? 'true' : 'false';
    case 'number':
      return data || '';
    case 'input':
      return data || '';
    case 'link':
      return data.title || '';
    case 'droplist':
      return data.title || '';
    case 'smartbutton':
      return data.title || '';
    case 'smartbutton2':
      return data.title || '';
    case 'color':
      return data || '';
    default:
      return data || '';
  }
}

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
    '&:hover': {
      backgroundColor: blueGrey[700],
    },
  },
}))(Button);

const CustomCheckbox = withStyles({
  root: {
    color: blueGrey[400],
    '&$checked': {
      color: blueGrey[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

class ButtonFilter extends Component {
  state = { 
    active: false,
    open: false, 
    anchorEl: null, 
    selectAll: true, 
    selectAllIndeterminate: false, 
    searchText: '',
    originalData: [],
    data: [],
    selects: {},
  }

  componentWillUnmount() {
    this.cache = null;
  }
  
  handleOpen = (e) => {
    this.cache = cloneObject(this.state);

    const column = this.props.column;
    const data = this.props.data;

    const searchText = this.state.searchText.toLowerCase();
    const selects = {};

    data.forEach(i => {
      const key = getValue(column.type, i[column.prop]);
      selects[key] = this.state.selects[key] === undefined ? true : this.state.selects[key];
    }); 

    const originalData = Object.keys(selects).sort();
    const filterData = this.state.searchText ? originalData.filter(i => i.toLowerCase().indexOf(searchText) !== -1) : originalData;

    this.setState({ 
      open: true, 
      anchorEl: e.currentTarget,
      originalData: originalData, 
      data: filterData,
      selects: selects,
    })
  }

  handleOk = () => {
    this.cache = null;
    const active = !(Object.keys(this.state.selects).filter(i => this.state.selects[i]).length === this.state.originalData.length);
    const temp = {};

    if (this.state.searchText) {
      this.state.data.forEach(key => {
        if (this.state.selects[key]) {
          temp[key] = this.state.selects[key];
        }
      });
      this.props.onFilter(this.props.column, temp);
    } else {
      if (active) {
        Object
          .keys(this.state.selects)
          .forEach(key => {
            if (this.state.selects[key]) {
              temp[key] = this.state.selects[key];
            }
          });
        this.props.onFilter(this.props.column, temp);
      } else {
        this.props.onFilter(this.props.column, null);
      }
    }
    
    this.setState({ 
      active: this.state.searchText ? true : active , 
      open: false, 
      anchorEl: null, 
      data: [], 
      originalData: [] 
    }); 
  }

  handleClose = () => {
    this.setState({ ...this.cache, open: false, anchorEl: null, data: [], originalData: [] })
    this.cache = null;
  }

  handleSelectAll = (e) => {
    const selects = {};

    this.state.data.forEach(key => {
      selects[key] = e.target.checked;
    });

    this.setState({ 
      selectAll: e.target.checked,
      selectAllIndeterminate: false,
      selects: { ...this.state.selects, ...selects },
    })
  }

  handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    if (e.target.value) {
      this.setState({ 
        searchText: e.target.value,
        data: this.state.originalData.filter(i => i.toLowerCase().indexOf(searchText) !== -1),
        selectAllIndeterminate: true,
      })
    } else {
      this.setState({ 
        searchText: e.target.value, 
        data: this.state.originalData, 
        selectAllIndeterminate: !(Object.keys(this.state.selects).filter(i => this.state.selects[i]).length === this.state.originalData.length)
      })
    }
  }

  handleCheckbox = (id, value) => {
    const selects = { ...this.state.selects, [id]: value };
    const selectAllIndeterminate = !(Object.keys(selects).filter(i => selects[i]).length === this.state.originalData.length);
    this.setState({ 
      selectAllIndeterminate: this.state.searchText ? true : selectAllIndeterminate, 
      selects: selects,
    })
  }

  renderRow = ({ index, style, data, onChekbox }) => (
    <ListItem 
      dense 
      button 
      key={index} 
      style={style} 
      role={undefined} 
      onClick={(e) => this.handleCheckbox(data.data[index], !data.selects[data.data[index]])}
    >
      <ListItemIcon>
        <CustomCheckbox
          edge="start"
          checked={Boolean(data.selects[data.data[index]])}
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
        <IconButton 
          size="small" 
          style={{ color: this.state.active ? '#f57c00' : 'rgba(0, 0, 0, 0.54)' }} 
          onClick={this.handleOpen} 
        >
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
                  indeterminate={this.state.selectAllIndeterminate}
                  style={styles.checkboxAll}
                  edge="start"
                  checked={this.state.selectAll}
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
                    placeholder="Поиск..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    value={this.state.searchText}
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
            onChekbox={this.handleCheckbox}
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
            <ColorButton 
              disableElevation
              color="primary"
              variant="contained"
              style={styles.filterButton}
              onClick={this.handleOk}
            >
              ОК
            </ColorButton>
          </div>
        </Popover>
      </div>
    )
  }
} 

export default withStyles(classes)(ButtonFilter);