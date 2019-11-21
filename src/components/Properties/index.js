import React, { Component } from 'react';
import context from 'context';

import { withStyles } from '@material-ui/core/styles';

import Drawer from 'components/basic/Drawer';


const styles = {
  box: {
  },
  content: {
    padding: 10,
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
