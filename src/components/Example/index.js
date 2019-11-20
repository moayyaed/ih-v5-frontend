import React from 'react';
import context from 'context';

import { withStyles } from '@material-ui/core/styles';


const styles = {
  box: {
  },
};

const classes = theme => ({
  root: {
  },
});


class Example extends Component {

  componentDidMount() {
    // context.event('app:example', this.props.id);
  }
  componentWillUnmount() {
    // context.event('app:example', this.props.id);
  }

  render({ id, state, classes } = this.props) {
    return (
      <div style={styles.box}>
        Example
      </div>
    );
  }

}

// export default context.connect(withStyles(classes)(Example));
export default context.connect(Example);