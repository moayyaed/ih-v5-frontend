import React, { Component } from 'react';
import core from 'core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import CircularProgress from '@material-ui/core/CircularProgress';

import { useTheme, withStyles } from '@material-ui/core/styles';

import { VariableSizeList } from 'react-window';


const styles = {
  root: {
    width: '100%',
    background: '#fff',
    height: 28,
  }
}

const classes = theme => ({
  option: {
    '& p': {
      fontSize: 13,
    },
    '&[aria-selected="true"] p': {
      fontWeight: 600,
    },
  },
  listbox: {
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const LISTBOX_PADDING = 8; //   px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = child => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          key={itemCount}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={index => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});


function createHideFunction(string) {
  return new Function('data', 'return ' + string);
}

function generateList(data) {
  if (data) {
    return data.map(i => {
      if (i.hide !== undefined) {
        return { ...i, hide: createHideFunction(i.hide) };
      }
      return i;
    });
  }
  return [];
}

class TableDroplistComponent extends Component {
  state = { init: true, list: [], loading: false }

  componentDidMount() {
    if (typeof this.props.column.data !== 'string') {
      this.setData(this.props.column.data)
    } else {
      this.handleGetData(true);
    }
  }

  setData = (list) => {
    this.setState((state) => {
      return {
        ...state,
        init: false,
        loading: false,
        list: generateList(list),
      }
    });
  }

  handleRenderInput = (params) => {
    return (
      <TextField 
        {...params}
        InputLabelProps={{ ...params.InputLabelProps, shrink: true}}
        InputProps={{
          ...params.InputProps,
          disableUnderline: true, 
          style: { fontSize: 13, top: 1 },
          endAdornment: (
            <React.Fragment>
              {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
        label="" 
        fullWidth 
      />
    )
  }
  
  handleOptionSelected = (option, { id }) => {
    return option.id === id;
  }
  
  handleOptionLabel = (option) => {
    return option.title || '';
  }
  
  handleRenderOption = (option, { id }) => {
    return <Typography noWrap>{option.title}</Typography>;
  }

  handleChange = (e, value) => {
    const id = this.props.container.props.id;
    const options = this.props.container.props.options;
    const column = this.props.column;
    const row = this.props.rowData;
    this.props.container.props.onChange(id, options, { op: 'edit', column, row }, value)
  }
  
  handleGetData = (isCache) => {
    if (typeof this.props.column.data === 'string') {
      const cache = isCache ? this.props.column.data : false
      const props = { ...this.props.container.props.route, rowid: this.props.rowData.id }
      core
        .request({ cache, method: 'droplist', params: this.props.column, props })
        .loading(() => this.setState(state => ({ ...state, loading: true })))
        .ok(this.setData);
    }
  }

  componentDidUpdate() {
    if (this.state.init === false && this.props.cellData && this.props.cellData.id !== '-') {
      const list = this.state.list.filter(i => i.hide ? !i.hide(this.props.rowData) : true);
      const find = list.find(i => i.id === this.props.cellData.id);
      if (find === undefined) {
        const id = this.props.container.props.id;
        const options = this.props.container.props.options;
        const column = this.props.column;
        const row = this.props.rowData;
        this.props.container.props.onChange(id, options, { op: 'edit', column, row }, { id: '-', title: '-' })
      }
    }
  }


  render() {
    const list = this.state.list.filter(i => i.hide ? !i.hide(this.props.rowData) : true);
    return (
      <Autocomplete
        disableListWrap
        disableClearable
        style={styles.root}
        classes={this.props.classes}
        options={list}
        onChange={this.handleChange}
        value={this.props.cellData}
        renderInput={this.handleRenderInput}
        ListboxComponent={ListboxComponent}
        getOptionSelected={this.handleOptionSelected}
        getOptionLabel={this.handleOptionLabel}
        renderOption={this.handleRenderOption}
        loadingText="Loading..."
        loading={this.state.loading}
        onOpen={this.handleGetData}
      />
    );
  }
}

export default withStyles(classes)(TableDroplistComponent);