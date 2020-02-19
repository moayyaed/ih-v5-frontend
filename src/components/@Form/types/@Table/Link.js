import React from 'react';
import core from 'core';

import Link from '@material-ui/core/Link';

const styles = {

}

function handleClickLink(e) {
  e.preventDefault();
  core.actions.appdialog.data({ open: true })
}

function TableLinkComponent(props) {
  return (
    <Link href="" onClick={handleClickLink}>
      {props.cellData}
    </Link>
  )
}


export default TableLinkComponent; 