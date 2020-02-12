import React, { Component } from 'react';
import context from 'context';

import Skeleton from '@material-ui/lab/Skeleton';

import { withStyles } from '@material-ui/core/styles';

import Drawer from 'components/basic/Drawer';


const styles = {
  box: {
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 35,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px',
  },
  toolbar: {
    width: '100%',
    height: 35,
    backgroundColor: '#90a4ae',
  },
  tabs: {
    width: '100%',
    height: 35,
    backgroundColor: '#b0bec5',
    borderBottom: '2px solid #006064'
  },
  form: {
    width: '100%',
    height: '100%',
    whiteSpace: 'pre',
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

  render({ id, state, classes, isLoading, data } = this.props) {
    if (isLoading) {
      return (
        <Drawer open={this.props.open}>
          <div style={styles.content}>
            <div style={styles.toolbar}></div>
            <div style={styles.tabs}></div>
            <div style={styles.form}>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
              <Skeleton width='100%' height={40}/>
            </div>
          </div>
        </Drawer>
      );
    }
    return (
      <Drawer open={this.props.open}>
        <div style={styles.content}>
          <div style={styles.toolbar}></div>
          <div style={styles.tabs}></div>
          <div style={styles.form}>{JSON.stringify(data, null, 2)}</div>
        </div>
      </Drawer>
    );
  }

}


export default context.connect(withStyles(classes)(Properties));
