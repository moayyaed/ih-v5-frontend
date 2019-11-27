import React, { Component } from 'react';

import core from 'core';

import { withStyles } from '@material-ui/core/styles';



const styles = {
  box: {
  },
};

const classes = theme => ({
  root: {
  },
});

class AppMenu extends Component {
  componentDidMount() {
    core.actions.appmenu.test(1);
  }

  handleClick = (e, selectid) => {
    // this.props.history.push('/' + selectid);
  }

  render({ id, state, match, classes } = this.props) {
    console.log(state);
    return (
      <div style={styles.box}>
       
      </div>
    );
  }
}



export default core.connect(withStyles(classes)(AppMenu));