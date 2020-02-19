import React, { Component } from 'react';
import core from 'core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import { useTheme, withStyles } from '@material-ui/core/styles';

import { VariableSizeList } from 'react-window';


const styles = {
  root: {
    margin: 12,
  }
}

const classes = theme => ({
  option: {
    '&[aria-selected="true"] p': {
      fontWeight: 500,
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

// Adapter for react-window
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

const test = [
  { id: '1', title: 'The Shawshank Redemption' },
  { id: '2', title: 'The Godfather' },
  { id: '3', title: 'The Godfather: Part II' },
  { id: '4', title: 'The Dark Knight' },
  { id: '5', title: '12 Angry Men' },
  { id: '6', title: "Schindler's List" },
  { id: '7', title: 'Pulp Fiction' },
  { id: '8', title: 'The Lord of the Rings: The Return of the King' },
  { id: '9', title: 'The Good, the Bad and the Ugly' },
  { id: '10', title: 'Fight Club' },
  { id: '11', title: 'The Lord of the Rings: The Fellowship of the Ring' },
  { id: '12', title: 'Star Wars: Episode V - The Empire Strikes Back' },
  { id: '13', title: 'Forrest Gump' },
  { id: '14', title: 'Inception' },
  { id: '15', title: 'The Lord of the Rings: The Two Towers' },
  { id: '16', title: "One Flew Over the Cuckoo's Nest" },
  { id: '17', title: 'Goodfellas' },
  { id: '18', title: 'The Matrix' },
  { id: '19', title: 'Seven Samurai' },
  { id: '21', title: 'Star Wars: Episode IV - A New Hope' },
  { id: '22', title: 'City of God' },
  { id: '23', title: 'Se7en' },
  { id: '24', title: 'The Silence of the Lambs' },
  { id: '25', title: "It's a Wonderful Life" },
  { id: '26', title: 'Life Is Beautiful' },
  { id: '27', title: 'The Usual Suspects' },
  { id: '28', title: 'Léon: The Professional' },
  { id: '29', title: 'Spirited Away' },
]


class DropList extends Component {
  state = { list: [] }

  componentDidMount() {
    if (typeof this.props.options.data === 'string') {
      core
      .request({ method: 'droplist', params: this.props.options })
      .ok(this.setData);
    } else {
      this.setData(this.props.options.data)
    }
    
  }

  setData = (list) => {
    this.setState((state) => {
      return {
        ...state,
        list: list || [],
      }
    });
  }

  handleRenderInput = (params) => {
    return (
      <TextField 
        {...params}
        InputLabelProps={{ shrink: true }} 
        label={this.props.options.title} 
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


  render() {
    return (
      <Autocomplete
        disableListWrap
        style={styles.root}
        classes={this.props.classes}
        options={test || this.state.list}
        onChange={(e, v) => {}}
        defaultValue={test[test.length - 1] || this.props.data}
        renderInput={this.handleRenderInput}
        ListboxComponent={this.ListboxComponent}
        getOptionSelected={this.handleOptionSelected}
        getOptionLabel={this.handleOptionLabel}
        renderOption={this.handleRenderOption}
      />
    );
  }
}

export default withStyles(classes)(DropList);