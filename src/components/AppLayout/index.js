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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}


class AppLayout extends Component {

  componentDidMount() {
    const params = {
      layoutId: this.props.route.layout || this.props.app.auth.layout,
    };

    core
      .request({ method: 'applayout', params })
      .ok(data => {
        core.actions.layout.data(data);
        // this.emulator();
    });
  }

  emulator = () => {
    const id = 'vt005';
    setInterval(() => {
      const values = this.props.state.templates[id].listState
      .reduce((p, c) => {
        return { ...p, [c]: getRandomIntInclusive(0, 1) }
      }, {})

     this.realtime({
       [id]: values,
     })
    }, 1500)

  }

  realtime = (value) => {
    core.actions.layout.updateTemplates(value);
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
    if (item.type === 'container' || item.type === 'container2') {
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
