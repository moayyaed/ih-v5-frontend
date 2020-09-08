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

import shortid from 'shortid';

import { createValueFunc, options } from 'components/tools';


const styles = {
  root: {
    margin: 12,
  },
  rootMini: {
    width: '100%',
    height: 22,
  },
  rootMini2: {
  fontSize: 12,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: '#3f51b5',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',

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

const defaultFunction = "return inData;";


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

  handleClickButton = (value) => {
    if (value === null) {
      this.props.onChange(this.props.id, this.props.options, null, { ...this.props.data, enabled: false, droplist: null, value: this.props.data.droplist || '' })
    } else {
      if (this.props.route.type) {
        const store = core.store.getState().apppage.data.p1.template;
        const list = store.listState.map(id => ({ id, title: store.state[id].title, value: store.state[id].curent }));
        const item = list.find(i => i.id === this.props.data._bind);
        
        core.transfer.sub('form_dialog', this.handleDialogClick);
        core.actions.appdialog.data({
          id: 'animation', 
          open: true, 
          transferid: 'form_dialog',
          template: {
            noclose: true,
            type: 'form',
            title: 'Binding Settings',
            options: options(list),
            data: { 
              p1: { bind: { ...item  } }, 
              p2: { func: this.props.data.func || defaultFunction },
            },
            cache: { p1: {}, p2: {} },
          },
        });
      } else {
        core.transfer.sub('form_dialog', this.handleDialogClick3);
        core.actions.appdialog.data({
          id: 'animation', 
          open: true, 
          transferid: 'form_dialog',
          template: {
            noclose: true,
            noscroll: true,
            title: 'Binding Settings',
            type: 'tree',
            id: this.props.route.dialog ? 'elementsAndVistemplates': 'elements',
            selectnodeid: this.props.data.did,
            selectId: this.props.data.prop,
            selectTitle: this.props.data.title,
            func: this.props.data.func || defaultFunction,
          },
        });
      }
    }
  }

  handleDialogClick3 = (data) => {
    if (data !== null && data !== ':exit:') {
      const did = data.did;
      const prop  = data.prop;
      const title = data.title;
      const func = data.func;

      if (prop) {
        const obj = createValueFunc(func);

        if (obj.error) {
          core.actions.app.alertOpen('warning', 'Function error: ' + obj.error.message);
        } else { 
          try {
            const v = obj.body.call(null, 0, {})
            const params = { ...this.props.data, enabled: true, did, prop, title, func, droplist: this.props.data.value };

            core.transfer.unsub('form_dialog', this.handleDialogClick3);
            core.actions.appdialog.close();
      
            this.props.onChange(this.props.id, this.props.options, null, params)
          } catch(e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      } else {
        const params = { ...this.props.data, enabled: null, prop: null, title: null, func, droplist: null };

        core.transfer.unsub('form_dialog', this.handleDialogClick3);
        core.actions.appdialog.close();

        this.props.onChange(this.props.id, this.props.options, null, params)
      }
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick3);
    }
  }

  handleDialogClick = (data) => {
    if (data !== null) {
      const id  = data.bind.id || null;
      const title = data.bind.title; 
      const value = data.bind.value; 
      const func = data.func || defaultFunction;
      const uuid = shortid.generate();

      if (id) {
        const obj = createValueFunc(func, value);
        if (obj.error) {
          core.actions.app.alertOpen('warning', 'Function error: ' + obj.error.message);
        } else {
          try {
            const store = core.store.getState().apppage.data.p1.template;
            const vars = store.listState.reduce((p, c) => ({ ...p, [store.state[c].title]: store.state[c].curent }), {});
            const v = obj.body.call(null, value, vars)
            
            if (core.cache.functions[this.props.data.uuid] !== undefined) {
              delete core.cache.functions[this.props.data.uuid]
            }
            
            core.cache.functions[uuid] = obj.body;
            core.transfer.unsub('form_dialog', this.handleDialogClick);
            core.actions.appdialog.close();
  
            this.props.onChange(this.props.id, this.props.options, null, { enabled: true, uuid, _bind: id, title, value: v, func, droplist: this.props.data.value })
          } catch (e) {
            core.actions.app.alertOpen('warning', 'Function error: ' + e.message);
          }
        }
      }  else {
        core.transfer.unsub('form_dialog', this.handleDialogClick);
        core.actions.appdialog.close();
        this.props.onChange(this.props.id, this.props.options, null, { enabled: false, _bind: null, title: null, droplist: null, func, value: this.props.data.droplist || {} })
      }
    } else {
      core.transfer.unsub('form_dialog', this.handleDialogClick);
    }
  }

  handleClear = (e) => {
    this.props.onChange(this.props.id, this.props.options, null, { enabled: false, _bind: null, did: null, title: null, droplist: null, func: this.props.data.func, value: this.props.data.droplist || {} })
  }

  render({ id, options, global, mini } = this.props) {
    const list = this.state.list.filter(i => i.hide ? !i.hide(global) : true);
    if (this.props.data.enabled ) {
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
            icon={this.props.data.enabled} 
            onChange={this.handleClickButton}
            onClear={this.handleClear}
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
          icon={this.props.data.enabled} 
          onChange={this.handleClickButton}
          onClear={this.handleClear}
        />
      </>
    );
  }
}

export default withStyles(classes)(DroplistLink);