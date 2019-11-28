import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';


const styles = {
  box: {
    width: '100%',
    height: '100%',
  },
};

const classes = theme => ({
  root: {
  },
});

class Explorer extends Component {
  componentDidMount() {
  }

  render({ id, state, match, classes, onClick } = this.props) {
    return (
      <div style={styles.box}>
        EXPLORER
        <ul>
          {state.list
            .map(i => 
              <li onClick={() => onClick(i)}>{i.id}</li>
          )}
        </ul>
      </div>
    );
  }
}



export default core.connect(withStyles(classes)(Explorer));