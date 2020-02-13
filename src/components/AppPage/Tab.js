import React  from 'react';

import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';


const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#8da2ac',
      opacity: 1,
    },
    '&$selected': {
      color: '#607d8b',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#8da2ac',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);


export default AntTab;