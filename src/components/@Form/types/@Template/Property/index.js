import React, { PureComponent } from 'react';
import core from 'core';

import SingleForm from 'components/@Form/Single';

import { Scrollbars } from 'react-custom-scrollbars';


const route = {}

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
  },
  group: {},
}

const cache = {
  block: {
    backgroundColor: {},
    borderColor: {},
    borderSize: {},
  },
  text: {
    text: {},
    textSize: {},
    textAlignV: {},
    textAlignH: {},
    backgroundColor: {},
    borderColor: {},
    borderSize: {},
  },
  image: {
    img: {},
    imgSize: {},
    imgRotate: {},
    backgroundColor: {},
    borderColor: {},
    borderSize: {},
  },
  group: {},
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
  }
}


class Property extends PureComponent {

  handleChange = (id, options, target, value) => {
    this.props.onChange(id, value);
  }

  render() {
    if (this.props.selectType === 'one' && this.props.elementData) {
      const map = scheme[this.props.elementData.type][this.props.type];
      if (map === undefined) {
        return <div style={styles.stub}>Properties not supported</div>;
      }
      return (
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <SingleForm 
            key="property"
            debug={false} 
            scheme={map}
            route={route}
            data={this.props.elementData}
            cache={this.props.stateData || {}}
            onChange={this.handleChange}
            getStyle={this.props.getStyle}
          />
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