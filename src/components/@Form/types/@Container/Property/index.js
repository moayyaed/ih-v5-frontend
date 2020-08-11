import React, { PureComponent } from 'react';
import core from 'core';

import { Scrollbars } from 'react-custom-scrollbars';

import CompactForm from 'components/@Form/Compact';
import scheme from 'components/@Form/types/@Layout/Property/scheme';

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
        return <div style={styles.stub}>Properties not supported</div>;
      }
      if (this.props.templateData && this.props.type === 'link') {
        const list = this.props.templateData.list
          .filter(i => this.props.templateData.elements[i].type === 'action');
        data = this.props.templateData.listState
          .reduce((p, c) => {
            if (this.props.elementData.links[c]) {
              return { ...p, [c]: this.props.elementData.links[c] }
            }
            return { ...p, [c]: { title: '' } }
          }, {});
        const data2 = list
          .reduce((p, c) => {
            const actions = scheme.listActions
              .filter(key => this.props.templateData.elements[c][key] !== '')
              .reduce((p2, c2) => {
                const key = `${c}_${c2}`
                if (this.props.elementData.actions && this.props.elementData.actions[key]) {
                  return { ...p2, [key]: this.props.elementData.actions[key] }
                }
                return { ...p2, [key]: { title: '' } }
              }, {});
            return { ...p, ...actions }
          }, {});
        data = { ...data, ...data2 }

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
        const map2 = list
          .reduce((p, c) => {
            return p
              .concat([{ title: c, prop: c, type: 'divider' }],scheme.listActions
                .filter(key => this.props.templateData.elements[c][key] !== '')
                .map(key =>
                  ({
                    prop: `${c}_${key}`,
                    title: `${key}`,
                    type: 'smartbutton',
                    command: 'dialog',
                    params: {
                      title: 'Привязка к каналу',
                      type: 'tree',
                      id: 'devices',
                    }
                  })
                ))
          }, [])
        map = [{ title: 'Bind', prop: 'bind', type: 'divider' }]
          .concat(map, map2)
      }
      return (
        <Scrollbars style={styles.scroll}>
          <div style={styles.container}>
            <CompactForm 
              key="property"
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




/*

    return (
      <Scrollbars style={{ width: '100%', height: '100%' }}>
        {scheme.map(item =>
          <ExpansionPanel key={item.title} defaultExpanded>
            <ExpansionPanelSummary 
              style={styles.summary} 
              IconButtonProps={{ size: 'small' }}
              expandIcon={<ExpandMoreIcon fontSize="inherit" />} 
            >
              <Typography className={classes.heading}>{item.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={styles.details} >
              <SingleForm 
                key="property"
                debug={false} 
                scheme={item.data}
                route={route}
                data={this.props.elementData}
                cache={cache}
                onChange={this.handleChange}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </Scrollbars>
    )

    */