import React, { Component } from 'react';
import core from 'core';

import css from './main.module.css';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 15px',
  },
  section: {
    position: 'relative',
    width: '100%',
    marginTop: 1,
    marginBottom: 1,
  },
  sectionBody: {
    display: 'flex',
    width: '100%',
    height: '100%',
    // outline: '1px dashed #6d7882',
    // border: '1px solid #3eaaf5',
  },
  column: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  columnBody: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px dashed #d5dadf',
  },
  toolbar: {
    color: '#fff',
    display: 'flex',
    position: 'absolute',
    width: 75,
    height: 25,
    boxShadow: '0 -2px 8px rgba(0,0,0,.05)',
    backgroundColor: '#03A9F4',
    top: -26,
    left: 'calc(50% - 37.5px)',
  },
  toolbarButton: {
    textAlign: 'center',
    width: 25,
    height: 25,
  },

}

function Toolbar(props) {
  return (
    <div 
      style={{
        ...styles.toolbar,
        display: props.enabled ? 'flex' : 'none',
      }}
    >
      <div 
        style={styles.toolbarButton} 
        className={css.toolbarButton} 
      />
      <div 
        style={styles.toolbarButton} 
        className={css.toolbarButton} 
        onClick={() => props.onClick('b2', props.sectionId)}
      />
      <div 
        style={styles.toolbarButton} 
        className={css.toolbarButton} 
      />
    </div>
  );
}

function Section(props) {
  const active = props.item.hover || props.select.section === props.id;
  return (
    <div 
      style={{ ...styles.section, height: props.item.height }} 
      onMouseLeave={() => props.onHoverOut(props.id)}
    >
      <Toolbar enabled={active} sectionId={props.id} onClick={props.onClickToolbar} />
      <div 
        style={{ 
          ...styles.sectionBody, 
          outline: active ? '1px solid #3eaaf5' : 'unset' 
        }}
      >
        {props.item.columns
          .map(id =>
            <Column 
              key={id}
              id={id}
              sectionId={props.id} 
              item={props.columns[id]}
              onHoverEnter={props.onHoverEnter}
            />
        )}
      </div>
    </div>
  );
}

function Column(props) {
  return (
    <div 
      style={{ ...styles.column, border: props.item.hover ? '1px dashed #6d7882' : '1px dashed transparent' }} 
      onMouseEnter={() => props.onHoverEnter(props.sectionId, props.id)}
    >
      <div style={styles.columnBody}>
        {props.id}
      </div>
    </div>
  );
}


class Canvas extends Component {

  handleHoverEnter = (sectionId, columnId) => {
    core.actions.layout
      .hoverSection(
        this.props.id, this.props.prop, 
        sectionId, columnId, true
      )
  }

  handleHoverOut = (sectionId) => {
    core.actions.layout
    .hoverSection(
      this.props.id, this.props.prop, 
      sectionId, false
    )
  }

  handleClickToolbar = (button, sectionId) => {
    if (button === 'b2') {
      this.handleClickSection(sectionId);
    }
  }

  handleClickSection = (sectionId) => {
    core.actions.layout
    .select(
      this.props.id, this.props.prop, 
      'section', sectionId,
    )
  }

  render() {
    return (
      <div style={styles.root}>
        {this.props.list
          .map(id =>
            <Section 
              key={id} 
              id={id}
              select={this.props.select}
              item={this.props.sections[id]}
              columns={this.props.columns[id]}
              onClickToolbar={this.handleClickToolbar}
              onHoverEnter={this.handleHoverEnter}
              onHoverOut={this.handleHoverOut}
            />
        )}
      </div>
    );
  }

}


export default Canvas;