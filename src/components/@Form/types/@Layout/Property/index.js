import React, { PureComponent } from 'react';
import core from 'core';

import CompactForm from 'components/@Form/Compact';

import { Scrollbars } from 'react-custom-scrollbars';

import scheme from 'components/schemes';

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
    if (this.props.selectType === 'one' && this.props.elementData && this.props.elementData.type) {
      let map = scheme[this.props.elementData.type][this.props.type];
      let data = this.props.elementData;
      if (map === undefined) {
        return <div style={styles.stub}>No properties</div>;
      }
      if (this.props.templateData) {
        data = this.props.templateData.listState
          .reduce((p, c) => {
            if (this.props.elementData.links[c]) {
              return { ...p, [c]: this.props.elementData.links[c] }
            }
            return { ...p, [c]: { title: '' } }
          }, {});
        map = this.props.templateData.listState
          .map(key => ({
            prop: key,
            title: this.props.templateData.state[key].title,
            type: 'smartbutton',
            command: 'dialog',
            params: {
              title: 'Привязка к каналу',
              type: 'tree',
              id: 'devices',
              dialog: 'channellink'
            }
          }));
        // map = [{ type: 'button', title: 'link all'}].concat(map);
      }
      if (this.props.elementData.widget && this.props.type === 'link') {
        data = Object
          .keys(this.props.elementData.widgetlinks)
          .reduce((p, c) => {
            if (this.props.elementData.widgetlinks[c]) {
              return { ...p, [c]: this.props.elementData.widgetlinks[c] }
            }
            return { ...p, [c]: { value: {} } }
          }, {});
        map = Object
          .keys(this.props.elementData.widgetlinks)
          .map(key => ({
            prop: key,
            title: key,
            type: 'smartbutton2',
            params: scheme.dynamic[this.props.elementData.type],
          }));
        map = [{ title: 'Data', prop: 'bind', type: 'divider' }]
        .concat(map)
      }
      return (
        <Scrollbars style={styles.scroll}>
          <div style={styles.container}>
            <CompactForm 
              key={this.props.elementId || 'property'}
              debug={false} 
              scheme={map}
              route={route}
              data={data}
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