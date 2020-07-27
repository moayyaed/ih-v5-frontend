import React, { PureComponent } from 'react';
import core from 'core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import ButtonMenu from 'components/@Form/types/@ButtonMenu';

import { useTheme, withStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

import { VariableSizeList } from 'react-window';


const styles = {
  root: {
    margin: 12,
  },
  rootMini: {
    width: '100%',
    height: 22,
  },
  rootMini2: {
    fontSize: 13,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: 'rgb(48, 84, 150)',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
    fontWeight: 'bold',
  },
  text: {},
  textMini: { fontSize: 13, top: -3 },
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


class DroplistLink extends PureComponent {
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
        list: generateList(list),
      }
    });
  }

  handleRenderInput = (params) => {
    return (
      <TextField 
        {...params}
        InputLabelProps={{ ...params.InputLabelProps, shrink: true, style: this.props.getStyle(this.props) }}
        InputProps={{
          ...params.InputProps,
          disableUnderline: this.props.mini, 
          style: this.props.mini ? styles.textMini : styles.text,
          endAdornment: (
            <React.Fragment>
              {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
        label={this.props.mini ? "" : this.props.options.title} 
        error={this.props.cache && this.props.cache.error}
        helperText={this.props.cache && this.props.cache.error}
        fullWidth 
      />
    )
  }
  
  handleOptionSelected = (option, { id }) => {
    return option.id === id;
  }
  
  handleOptionLabel = (option) => {
    if (option === '') {
      return '-';
    }
    return option.title;
  }
  
  handleRenderOption = (option, { id }) => {
    return <Typography noWrap>{option.title}</Typography>;
  }

  handleGetData = () => {
    if (typeof this.props.options.data === 'string') {
      const props = { ...this.props.route, rowid: null }
      core
      .request({ method: 'droplist', params: this.props.options, props })
      .loading(() => this.setState(state => ({ ...state, loading: true })))
      .ok(this.setData);
    }
  }

  componentDidUpdate() {
    if (!this.props.data._bind && this.props.data.value && this.props.data.value.id !== '-') {
      const list = this.state.list.filter(i => i.hide ? !i.hide(this.props.global) : true);
      const find = list.find(i => i.id === this.props.data.value.id);
      if (find === undefined) {
        this.props.onChange(this.props.id, this.props.options, null, { ...this.props.data, value: { id: '-', title: '-' } })
      }
    }
  }

  handleClickButton = (title, id, value) => {
    if (title === null) {
      this.props.onChange(this.props.id, this.props.options, null, { _bind: null, title: null, droplist: null, value: this.props.data.droplist || 0 })
    } else {
      this.props.onChange(this.props.id, this.props.options, null, { _bind: id, title, value, droplist: this.props.data.value })
    }
  };

  render({ id, options, global, mini } = this.props) {
    const list = this.state.list.filter(i => i.hide ? !i.hide(global) : true);
    if (this.props.data._bind ) {
      return (
        <>
          <input
            className="core"
            style={styles.rootMini2} 
            disabled={true}
            value={this.props.data.title}
          />
          <ButtonMenu 
            enabled={this.props.options.bind !== undefined ? this.props.options.bind : this.props.route.type} 
            icon={this.props.data._bind} 
            onChange={this.handleClickButton} 
          />
        </>
      )
    }
    return (
      <>
        <Autocomplete
          disabled={this.props.disabled}
          disableClearable
          disableListWrap
          style={mini ? styles.rootMini : styles.root}
          classes={this.props.classes}
          options={list}
          onChange={(e, value) => this.props.onChange(id, options, null, { ...this.props.data, value })}
          value={this.props.data.value}
          renderInput={this.handleRenderInput}
          ListboxComponent={ListboxComponent}
          getOptionSelected={this.handleOptionSelected}
          getOptionLabel={this.handleOptionLabel}
          renderOption={this.handleRenderOption}
          loadingText="Loading..."
          loading={this.state.loading}
          onOpen={this.handleGetData}
        />
        <ButtonMenu 
          enabled={this.props.options.bind !== undefined ? this.props.options.bind : this.props.route.type} 
          icon={this.props.data._bind} 
          onChange={this.handleClickButton} 
        />
      </>
    );
  }
}

export default withStyles(classes)(DroplistLink);