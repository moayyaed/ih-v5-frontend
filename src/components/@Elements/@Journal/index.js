import React, { Component } from 'react';
import { sortableContainer, sortableElement, sortableHandle, } from 'react-sortable-hoc';

import BaseTable, { AutoResizer, Column } from 'react-base-table';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';

import Popover from '@material-ui/core/Popover';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import Divider from '@material-ui/core/Divider';

import { fade, withStyles } from '@material-ui/core/styles';

import { FixedSizeList as List, shouldComponentUpdate } from 'react-window';

import { transform } from '../tools';

import { 
  LoadingLayer, 
  LoadingMoreLayer, 
  LoadingMoreText, 
  Loader, 
  Empty,
} from './elements';

import 'react-base-table/styles.css';

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
    // vertical padding + font size from searchIcon
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
  headerContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
  },
  columnContainer: {
    display: 'flex',
    position: 'relative',
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
  dragHandle: {
    position: 'absolute',
    zIndex: 1000,
    height: '100%',
    width: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'grab',
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

const DragHandle = sortableHandle(() => 
  <span className="BaseTable__header-handle" style={styles.dragHandle}>::</span>);

const SortableHeader = sortableElement(({children, column }) => {
  return (
    <div style={styles.columnContainer}>
      <DragHandle />
      {React.cloneElement(children)}
      <ButtonFilter column={column} />
    </div>
  )
});

const SortableHeaderRowRenderer = sortableContainer(
  ({ cells, columns }) => {
    return (
      <div style={styles.headerContainer}>
        {React.Children.map(cells, (column, index) => 
          <SortableHeader index={index} column={columns[index]}>
            {column}
          </SortableHeader>
        )}
      </div>
    )
  }
);

const arrayMoveMutate = (array, from, to) => {
	const startIndex = from < 0 ? array.length + from : from;

	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = to < 0 ? array.length + to : to;

		const [item] = array.splice(from, 1);
		array.splice(endIndex, 0, item);
	}
};

const arrayMove = (array, from, to) => {
	array = [...array];
	arrayMoveMutate(array, from, to);
	return array;
};

const columns = [
  { prop: 'id', width: 200 },
  { prop: 'title', width: 200 },
  { prop: 'value1', width: 200 },
  { prop: 'value2', width: 200 },
];

const data = new Array(1000)
  .fill(0)
  .map((i, k) => ({ id: k, title: 'row'+k, value1: k, value2: '_'+k }))


class _ButtonFilter extends Component {
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

const ButtonFilter = withStyles(classes)(_ButtonFilter);

class Journal extends Component {

  state = { 
    columns: columns, 
    data: [], 
    loading: true, 
    loadingMore: false, 
    loadedAll: false 
  }

  componentDidMount() {
    this.loadData();
  }


  loadData = () => {
    setTimeout(() => {
      this.setState({
        data: data.slice(0, 100),
        loading: false,
        loadedAll: false,
      })
    }, 250);
  }

  loadMore = () => {
    this.setState({ loadingMore: true })

    setTimeout(() => {
      const temp = data.slice(this.state.data.length, this.state.data.length + 100);
    
      this.setState({
        data: this.state.data.concat(temp),
        loadingMore: false,
        loadedAll: temp.length === 0,
      })
    }, 250)
  }

  handleEndReached = (params) => {
    const { loading, loadingMore, loadedAll } = this.state;
    const check = loading || loadingMore || loadedAll;
    if (!check) {
      this.loadMore();
    }
  }

  renderOverlay = () => {
    const { loading, loadingMore } = this.state

    if (loadingMore) {
      return (
        <LoadingMoreLayer>
          <LoadingMoreText>Loading More</LoadingMoreText>
          <Loader small />
        </LoadingMoreLayer>
      )
    }
   
    if (loading) {
      return (
        <LoadingLayer>
          <Loader />
        </LoadingLayer>
      )
    }

    return null
  }

  renderEmpty = () => {
    if (this.state.loading) {
      return null;
    }
    return <Empty>No data available</Empty>
  }

  headerRenderer = ({ cells, columns }) => {
    return (
      <SortableHeaderRowRenderer
        useDragHandle
        axis="x"
        lockAxis="x"
        cells={cells}
        columns={columns}
        helperClass='sortableHelper'
        onSortEnd={this.onSortEnd}
      />
    );
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      columns: arrayMove(this.state.columns, oldIndex, newIndex),
    });
  }

  render(props = this.props) {
    return (
      <div 
        style={{
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          background: props.item.backgroundColor.value,
          border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
          borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
          opacity: props.item.opacity.value / 100,
          boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
          transform: transform(props.item),
          overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
          visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
        }}
      >
        <BaseTable
          fixed
          rowHeight={35}
          width={props.item.w.value - (props.item.borderSize.value * 2)}
          height={props.item.h.value - (props.item.borderSize.value * 2)}
          data={this.state.data}
          disabled={this.state.loading}
          loadingMore={this.state.loadingMore}
          onEndReached={this.handleEndReached}
          overlayRenderer={this.renderOverlay}
          emptyRenderer={this.renderEmpty}
          headerRenderer={this.headerRenderer}
        >
          {this.state.columns.map(i => 
            <Column
              resizable 
              key={i.prop} 
              title={i.prop}
              dataKey={i.prop}
              width={i.width || 150}
            />
          )}
        </BaseTable>
      </div>
    );
  }
}


export default Journal;


