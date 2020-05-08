import React, { PureComponent } from 'react';
import core from 'core';

import { Button } from "@blueprintjs/core";

import SingleForm from 'components/@Form/Single';

import { Scrollbars } from 'react-custom-scrollbars';


export const PROPERTY_BUTTONS = [
  <Button key="3" icon="style" minimal />
];

const route = {}

const scheme = {
  block: [
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
    },
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
  image: [
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
  ]
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
    backgroundColor: {},
    borderColor: {},
    borderSize: {},
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
}


const classes = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


class Property extends PureComponent {

  handleChange = (id, options, target, value) => {
    this.props.onChange(id, value);
  }

  render() {
    if (this.props.type === 'one' && this.props.elementData && this.props.elementData.type !== 'group') {
      return (
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <SingleForm 
            key="property"
            debug={false} 
            scheme={scheme[this.props.elementData.type]}
            route={route}
            data={this.props.elementData}
            cache={cache[this.props.elementData.type]}
            onChange={this.handleChange}
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