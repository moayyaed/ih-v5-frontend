import React, { Component } from 'react';
import core from 'core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import { useTheme, withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

import { VariableSizeList } from 'react-window';


const styles = {
  root: {
    margin: 12,
  }
}

const classes = theme => ({
  option: {
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

const LISTBOX_PADDING = 8; //px

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


class Droplist extends Component {
  state = { list: [], loading: false }

  componentDidMount() {
    if (typeof this.props.options.data !== 'string') {
      this.setData(this.props.options.data)
    } else {
      this.handleGetData();
    }
  }

  setData = (list) => {
    this.setState((state) => {
      return {
        ...state,
        loading: false,
        list: list || [],
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
          endAdornment: (
            <React.Fragment>
              {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
        label={this.props.options.title} 
        error={this.props.cache.error}
        helperText={this.props.cache.error}
        fullWidth 
      />
    )
  }
  
  handleOptionSelected = (option, { id }) => {
    return option.id === id;
  }
  
  handleOptionLabel = (option) => {
    return option.title;
  }
  
  handleRenderOption = (option, { id }) => {
    return <Typography noWrap>{option.title}</Typography>;
  }

  handleGetData = () => {
    if (typeof this.props.options.data === 'string') {
      core
      .request({ method: 'droplist', params: this.props.options })
      .loading(() => this.setState(state => ({ ...state, loading: true })))
      .ok(this.setData);
    }
  }

  render({ id, options } = this.props) {
    return (
      <Autocomplete
        disableClearable
        disableListWrap
        style={styles.root}
        classes={this.props.classes}
        options={this.state.list}
        onChange={(e, v) => this.props.onChange(id, options, null, v)}
        value={this.props.data}
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

export default withStyles(classes)(Droplist);