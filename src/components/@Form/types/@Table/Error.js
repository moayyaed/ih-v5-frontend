import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: {
    outline: '1px dashed #F44336',
  }
}

const classes = theme => ({
  tooltip: {
    backgroundColor: 'rgb(253, 236, 234)',
    color: 'rgb(97, 26, 21)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
});


function TableErrorComponent(props) {
  return (
    <Tooltip classes={props.classes} title={props.error}>
      <div style={styles.root} >
        {React.createElement(props.children, props.cellProps)}
      </div>
    </Tooltip>
  )
}


export default withStyles(classes)(TableErrorComponent);