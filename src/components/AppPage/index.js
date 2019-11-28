import React, { Component } from 'react';
import core from 'core';


const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  }
};


class AppPage extends Component {

  componentDidMount() {
    core.event('app:page', this.props.params.pageid);
  }

  render() {
    return (
      <div style={styles.root}>
        APP_PAGE
      </div>
    );
  }
}

export default AppPage;