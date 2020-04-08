import React, { Component } from 'react';
import core from 'core';

import Link from '@material-ui/core/Link';


class TableLinkComponent extends Component {

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.cellData !== undefined && this.props.cellData.path !== undefined) {
      core.route(this.props.cellData.path);
    }
  }

  render() {
    return (
      <Link href={'/admin/' + this.props.cellData.path} onClick={this.handleClick}>
        {this.props.cellData.title}
      </Link>
    )
  }
}


export default TableLinkComponent; 