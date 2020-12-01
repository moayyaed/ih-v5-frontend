import React, { PureComponent } from 'react';
import core from 'core';

import SingleForm from 'components/@Form/Single';

import { Scrollbars } from 'react-custom-scrollbars';


const route = {}
const cache = {}

const scheme = {
  section: {
    main: [
      { 
        title: 'Height', 
        prop: 'height', 
        type: 'number',
      },
    ]
  },
  column: {

  },
  text: {

  },
  container: {
    main: [
      { 
        title: 'container', 
        prop: 'containerId', 
        type: 'droplist',
        data: 'containerList',
      },
    ]
  },
  innersection: {

  },
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
    if (this.props.selectType && this.props.elementData) {
      const map = scheme[this.props.selectType][this.props.type];
      if (map === undefined) {
        return <div style={styles.stub}>No properties</div>;
      }
      return (
        <Scrollbars style={styles.scroll}>
          <div style={styles.container}>
            <SingleForm 
              key="property"
              debug={false} 
              scheme={map}
              route={route}
              data={this.props.elementData}
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