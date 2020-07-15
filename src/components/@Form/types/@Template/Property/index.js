import React, { PureComponent } from 'react';
import core from 'core';

import SingleForm from 'components/@Form/Single';

import { Scrollbars } from 'react-custom-scrollbars';
import scheme from 'components/@Form/types/@Layout/Property/scheme';

const route = {
  type: 'template',
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
    if (this.props.disabled) {
      return <div style={styles.stub}>Please create a new variable</div>;
    }
    if (this.props.selectType === 'one' && this.props.elementData && this.props.elementData.type) {
      const map = scheme[this.props.elementData.type][this.props.type];
      if (map === undefined) {
        return <div style={styles.stub}>Properties not supported</div>;
      }
      return (
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          <div style={styles.container}>
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