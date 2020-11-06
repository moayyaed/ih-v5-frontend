import React, { PureComponent } from 'react';
import core from 'core';

import { Scrollbars } from 'react-custom-scrollbars';

import CompactForm from 'components/@Form/Compact';
import scheme from 'components/schemes';

const route = {
  dialog: true,
}
const cache = {}

const LEFT = [
  'singleClickLeft', 'doubleClickLeft', 'longClickLeft',
  'mouseDownLeft', 'mouseUpLeft'
];

const RIGHT = [ 'singleClickRight' ];


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
              if (this.props.elementData.actions[c]) {
                return { ...p, [c]: this.props.elementData.actions[c] };
              }
              return { 
                ...p, 
                [c]: { 
                  left: LEFT
                    .reduce((p2, c2) => {
                      if (this.props.templateData.elements[c][c2].value !== '') {
                        return p2.concat({ action: c2, value: {} })
                      }
                      return p2.concat()
                    }, []), 
                  right: RIGHT
                    .reduce((p2, c2) => {
                      if (this.props.templateData.elements[c][c2].value !== '') {
                        return p2.concat({ action: c2, value: {} })
                      }
                      return p2.concat()
                    }, []), 
                }
              };
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
              id: 'visitems',
            }
          }));
        const map2 = list
          .reduce((p, c) => {
            return p
              .concat([{ type: 'actions', prop: c, title: c }])
          }, [])
        map = [{ title: 'Variables', prop: 'bind', type: 'divider' }]
          .concat(map, map2)
      }
      if (this.props.elementData.widget && this.props.type === 'link') {
        data = Object
          .keys(this.props.elementData.widgetlinks)
          .reduce((p, c) => {
            if (this.props.elementData.widgetlinks[c]) {
              return { ...p, [c]: this.props.elementData.widgetlinks[c] }
            }
            return { ...p, [c]: { } }
          }, {});
        map = Object
          .keys(this.props.elementData.widgetlinks)
          .map(key => ({
            prop: key,
            title: key,
            type: 'smartbutton',
            command: 'dialog',
            params: {
              title: 'Привязка к каналу',
              type: 'tree',
              id: 'visitemsAndVistemplates',
            }
          }));
        map = [{ title: 'Data', prop: 'bind', type: 'divider' }]
        .concat(map)
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