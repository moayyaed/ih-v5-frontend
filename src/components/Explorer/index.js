import React, { Component } from 'react';
import core from 'core';

import { withStyles } from '@material-ui/core/styles';


const styles = {
  box: {
    width: '100%',
    height: '100%',
  },
  active: {
    cursor: 'pointer',
    backgroundColor: 'rgba(158, 158, 158, 0.2)',
  },
  noactive: {
    cursor: 'pointer',
  }
};

const classes = theme => ({
  root: {
  },
});

class Explorer extends Component {
  componentDidMount() {
  }

  handleClick = (item) => {
    const { menuid } = core.nav.state;
    core.nav.history.push(`/${menuid}/${item.component}/${item.id}`);
  }

  render({ id, state, classes } = this.props) {
    return (
      <div style={styles.box}>
        EXPLORER
        <ul>
          {state.list
            .map(i => 
              <li 
                key={i.id}
                style={state.selectid === i.id ? styles.active : styles.noactive} 
                onClick={() => this.handleClick(i)}
              >
                {i.id}
              </li>
          )}
        </ul>
      </div>
    );
  }
}



export default core.connect(withStyles(classes)(Explorer));