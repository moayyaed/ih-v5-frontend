import React, { PureComponent } from 'react';
import core from 'core';

import { Scrollbars } from 'react-custom-scrollbars';

import CompactForm from 'components/@Form/Compact';
import scheme from 'components/schemes/diagram';

const route = {}
const cache = {}



const styles = {
  details: {
    padding: 0,
    flexDirection: 'column',
  },
  summary: {
    borderBottom: '1px solid #e6e9ec',
    height: 31,
    minHeight: 31,
  },
  stub: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    width: '100%',
    height: '100%',
  },
  scroll: { 
    width: '100%', 
    height: '100%' 
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  }
}


class Property extends PureComponent {

  handleChange = (id, options, target, value) => {
    this.props.onChange(id, value);
  }

  render() {
    if (this.props.elementId && this.props.data.type) {
      if (scheme[this.props.data.type] === undefined) {
        return <div style={styles.stub}>Properties not supported</div>;
      }
      return (
        <Scrollbars style={styles.scroll}>
          <div style={styles.container}>
            <CompactForm 
              key="property"
              debug={false} 
              scheme={scheme[this.props.data.type]}
              route={route}
              data={this.props.data}
              cache={cache}
              onChange={this.handleChange}
              getStyle={this.props.getStyle}
            />
          </div>
        </Scrollbars>
      )
    }
    return null;
  }
}


export default Property;
