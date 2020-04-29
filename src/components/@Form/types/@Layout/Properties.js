import React, { PureComponent } from 'react';
import core from 'core';

import Divider from '@material-ui/core/Divider';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    border: '2px dashed #9E9E9E',
    textAlign: 'center',
    margin: '8px 2px',
    width: 100,
  },
  root2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    position: 'absolute',
    width: '100%',
    height: 'calc(100% - 130px)',
    top: 130,
    padding: 16,
  },
  text: {
    color: '#182026',
    textAlign: 'center',
    marginBottom: 8
  },
  text2: {
    marginTop: 12,
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
  }
}

const BUTTONS = [ 'CONTAINER', 'TEXT', 'SECTION'];


function disabled(v) {
  if (typeof v === 'number') {
    return false;
  }
  return true;
}

class Properties extends PureComponent {

  handleDragStart = (e, id) => {
    e.dataTransfer.setData('text', id);
    core.actions.layout
      .data(this.props.id, this.props.prop, { isDraggingToolbar: true });
  }

  handleDragEnd = () => {
    core.actions.layout
      .data(this.props.id, this.props.prop, {
        isDraggingToolbar: false, 
        drag: { section: null, column: null }  
      });
  }

  handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

   if (e.target.value && e.target.value !== 'none') {
    core.actions.layout
      .editSection(
        this.props.id, this.props.prop, 
        this.props.select, { direction: e.target.value },
      )
   }
  }

  handleChangeSlider = (e, value) => {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.section.height !== value) {
      core.actions.layout
        .editSection(
          this.props.id, this.props.prop, 
          this.props.select, { height: value },
        )
    }
  }

  handleClickSlider = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }
  
  render() {
    return (
      <div style={styles.root} >
        {BUTTONS.map(id =>
          <div 
            draggable 
            key={id} 
            style={styles.button} 
            onDragStart={(e) => this.handleDragStart(e, id)} 
            onDragEnd={this.handleDragEnd}
          >
            {id}
          </div>
        )}
      </div>

    );
  }
}


export default Properties;