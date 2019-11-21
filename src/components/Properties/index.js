import React, { Component } from 'react';
import context from 'context';

import { withStyles } from '@material-ui/core/styles';

import Drawer from 'components/basic/Drawer';


const styles = {
  box: {
  },
  content: {
    width: '100%',
    height: '100%',
    background: 'white',
    paddingTop: 35,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px',
  }
};

const classes = theme => ({
  root: {
  },
});


class Properties extends Component {

  componentDidMount() {
    // context.event('app:example', this.props.id);
  }
  componentWillUnmount() {
    // context.event('app:example', this.props.id);
  }

  render({ id, state, classes } = this.props) {
    return (
      <Drawer >
        <div style={styles.content}>
        CONTENT
        <br />
        <br />
          CHANGE POSITION
      </div>
      </Drawer>
    );
  }

}


export default context.connect(withStyles(classes)(Properties));
