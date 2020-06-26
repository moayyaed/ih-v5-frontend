import React, { PureComponent } from 'react';
import core from 'core';

import SingleForm from 'components/@Form/Single';

import { Scrollbars } from 'react-custom-scrollbars';


const route = {}
const cache = {}

const scheme = {
  block: {
    main: [
      { 
        title: 'Background Color', 
        prop: 'backgroundColor', 
        type: 'color',
      },
      { 
        title: 'Border Color', 
        prop: 'borderColor', 
        type: 'color',
      },
      { 
        title: 'Border Size', 
        prop: 'borderSize', 
        type: 'slider',
      }
    ],
    move: [
      { 
        title: 'Position X', 
        prop: 'x', 
        type: 'number',
      },
      { 
        title: 'Position Y', 
        prop: 'y', 
        type: 'number',
      },
      { 
        title: 'Width', 
        prop: 'w', 
        type: 'number',
      },
      { 
        title: 'Height', 
        prop: 'h', 
        type: 'number',
      },
    ]
  },
  text: {
    main: [
      { 
        title: 'Background Color', 
        prop: 'backgroundColor', 
        type: 'color',
      },
      { 
        title: 'Border Color', 
        prop: 'borderColor', 
        type: 'color',
      },
      { 
        title: 'Border Size', 
        prop: 'borderSize', 
        type: 'slider',
      }
    ],
    text: [
      { 
        title: 'Text', 
        prop: 'text', 
        type: 'input',
      },
      { 
        title: 'Text Size', 
        prop: 'textSize', 
        type: 'input',
      },
      {
        prop: 'textAlignH',
        title: 'Horizontal Alignment',
        type: 'droplist',
        data: [
          {
            id: 'flex-start',
            title: 'Left'
          },
          {
            id: 'center',
            title: 'Center'
          },
          {
            id: 'flex-end',
            title: 'Right'
          }
        ]
      },
      {
        prop: 'textAlignV',
        title: 'Vertical Alignment',
        type: 'droplist',
        data: [
          {
            id: 'flex-start',
            title: 'Top'
          },
          {
            id: 'center',
            title: 'Center'
          },
          {
            id: 'flex-end',
            title: 'Bottom'
          }
        ]
      }
    ],
    move: [
      { 
        title: 'Position X', 
        prop: 'x', 
        type: 'number',
      },
      { 
        title: 'Position Y', 
        prop: 'y', 
        type: 'number',
      },
      { 
        title: 'Width', 
        prop: 'w', 
        type: 'number',
      },
      { 
        title: 'Height', 
        prop: 'h', 
        type: 'number',
      },
    ]
  },
  image: {
    main: [
      { 
        title: 'Background Color', 
        prop: 'backgroundColor', 
        type: 'color',
      },
      { 
        title: 'Border Color', 
        prop: 'borderColor', 
        type: 'color',
      },
      { 
        title: 'Border Size', 
        prop: 'borderSize', 
        type: 'slider',
      }
    ],
    image: [
      { 
        title: 'Image URL', 
        prop: 'img', 
        type: 'url',
      },
      { 
        title: 'Image Size', 
        prop: 'imgSize', 
        type: 'slider',
        min: -100,
        max: 100,
      },
      { 
        title: 'Image Rotate', 
        prop: 'imgRotate', 
        type: 'slider',
        min: 0,
        max: 360,
      }
    ],
    move: [
      { 
        title: 'Position X', 
        prop: 'x', 
        type: 'number',
      },
      { 
        title: 'Position Y', 
        prop: 'y', 
        type: 'number',
      },
      { 
        title: 'Width', 
        prop: 'w', 
        type: 'number',
      },
      { 
        title: 'Height', 
        prop: 'h', 
        type: 'number',
      },
    ]
  },
  group: {},
  template: {
    link: [],
    move: [
      { 
        title: 'Position X', 
        prop: 'x', 
        type: 'number',
      },
      { 
        title: 'Position Y', 
        prop: 'y', 
        type: 'number',
      },
      { 
        title: 'Width', 
        prop: 'w', 
        type: 'number',
      },
      { 
        title: 'Height', 
        prop: 'h', 
        type: 'number',
      },
    ]
  },
  content: {
    move: [
      { 
        title: 'Position X', 
        prop: 'x', 
        type: 'number',
      },
      { 
        title: 'Position Y', 
        prop: 'y', 
        type: 'number',
      },
      { 
        title: 'Width', 
        prop: 'w', 
        type: 'number',
      },
      { 
        title: 'Height', 
        prop: 'h', 
        type: 'number',
      },
    ]
  }
}


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
      return (
        <Scrollbars style={styles.scroll}>
          <div style={styles.container}>
            <SingleForm 
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