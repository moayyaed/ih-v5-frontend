import React, { Component } from 'react';
import core from 'core';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';

import widgets from 'components/@Widgets';


const styles = {
  root: {
    width: '100%',
    height: '100%',
  },
};

const classes = theme => ({

});


class AppLayout extends Component {

  componentDidMount() {
    const params = {
      layoutId: this.props.route.layout || this.props.app.auth.layout,
    };

    core
      .request({ method: 'applayout', params })
      .ok(core.actions.layout.data);
  }

  handleClick = (id) => {

  }

  renderSection = (id) => {
    const section = this.props.state.layout.sections[id];
    return (
      <div 
        key={id} 
        style={{ 
          display: 'flex',
          border: '1px solid red',
          width: '100%', 
          height: this.props.state.layout.sections[id].height,
        }}
      >
        {section.columns.map(columnId => this.renderColumn(id, columnId))}
      </div>
    )
  }

  renderColumn = (sectionId, columnId) => {
    const section = this.props.state.layout.sections[sectionId];
    const column = this.props.state.layout.columns[columnId];

    if (column.type === 'innersection') {
      return (
        <div 
          key={columnId} 
          style={{ 
            border: '1px dashed black',
            width: column.size + '%', 
            height: '100%',
          }}
        >
          {this.props.state.layout.sections[column.sectionId].columns
            .map(columnId => this.renderColumn(column.sectionId, columnId))}
        </div>
      )
    }


    if (section.direction === 'row') {
      return (
        <div 
          key={columnId} 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed black',
            width: column.size + '%', 
            height: '100%',
          }}
        >
          {this.renderContent(columnId, column)}
        </div>
      )
    }

    return (
      <div 
        key={columnId} 
        style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed black',
          width: '100%',
          height: column.size + '%',
        }}
      >
        {this.renderContent(columnId, column)}
      </div>
    )
  }

  renderContent = (id, item) => {
    if (item.type === 'container') {
      item.type = 'container2'
      return widgets(id, item, this.props.state);
    }
    return widgets(id, item);
  }

  render({ id, route, state, auth, classes } = this.props) {
    return (
      <div style={styles.root}>
        {state.layout.list.map(this.renderSection)}
      </div>
    );
  }
}


const mapStateToProps = createSelector(
  state => state.app.route,
  state => state.layout,
  state => state.app,
  (route, state, app) => ({ route, state, app })
)

export default connect(mapStateToProps)(withStyles(classes)(AppLayout));
