import React, { PureComponent } from 'react';
import core from 'core';

import { Button } from "@blueprintjs/core";

import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SingleForm from 'components/@Form/Single';

import { Scrollbars } from 'react-custom-scrollbars';


export const PROPERTY_BUTTONS = [
  <Button key="3" icon="style" minimal />
];

const route = {}

const scheme = [
  {
    title: 'Style 1',
    data: [
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
  },
  {
    title: 'Style 2',
    data: [
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
  },
  {
    title: 'Style 3',
    data: [
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
]

const cache = {
  backgroundColor: {},
  borderColor: {},
  borderSize: {},
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
    if (this.props.type !== 'one') {
      return null;
    }
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
  }
}


/*

   

        */


export default withStyles(classes)(Property);