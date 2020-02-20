import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Save';
import RestoreIcon from '@material-ui/icons/Restore';

import SplitButton from './SplitButton';


const styles = {
  root: {
    width: '100%',
    height: 60,
    display: 'flex', 
    alignItems: 'center', 
    paddingLeft: 20, 
    paddingRight: 20, 
    backgroundColor: '#f5f5f5',
  }
}


function Breadcrumbs() {
  return (
    <MuiBreadcrumbs style={{ paddingLeft: 5 }} aria-label="breadcrumb">
      <Link color="inherit" href="/" >
      All places
      </Link>
      <Link color="inherit" href="/getting-started/installation/" >
      АБК - 1 Этаж
      </Link>
      <Typography color="textPrimary">(5) Переговорная</Typography>
    </MuiBreadcrumbs>
  );
}

/*

 
      <IconButton style={{ pading: 8 }} >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <IconButton style={{ pading: 8 }} >
        <RestoreIcon fontSize="small" />
      </IconButton>
*/

function Toolbar(props) {
  return (
    <div style={styles.root}>
      <Breadcrumbs />
      <SplitButton disabled={!props.save} />
    </div>
  )
}


export default Toolbar;