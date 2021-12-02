import React, { Component } from 'react';
import core from 'core';

import { Scrollbars } from 'react-custom-scrollbars';

import Form from 'components/@Form';

const EMPTY = {};

const styles = {
  root: {
    width: '100%', 
    height: '100%', 
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 12,
  }
}


class ContentForm extends Component {

  componentDidMount() {
    this.request(this.props);
  }

  request = (props) => {
    props.onRequest(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.node && this.props.node.id !== prevProps.node.id) {
      this.request(this.props);
    }
  }

  handleChangeForm = (id, component, target, value) => {
    this.props.onChangeForm(id, component, target, value);
  }

  render() {
    return (
      <div style={styles.root}>
        <Scrollbars >
          <div style={styles.container}>
            <Form 
              key='browse_form' 
              debug={false} 
              scheme={this.props.form.scheme} 
              route={EMPTY}
              data={this.props.form.data}
              cache={this.props.form.cache}
              onChange={this.handleChangeForm}
              heightOffset={160}
            />
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default ContentForm;