import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const styles = {
  root: {
    fontSize: 13,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
    marginLeft: 4,
    marginRight: 4,
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    height: 22,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: 22,
    height: 22,
  }
}

function parseValue(value, oldValue) {
  if (value === '') {
    return 0;
  }
  const v = Number(value);
  if (isNaN(v)) {
    return oldValue || 0;
  }
  return Number(value);
}

function checkValue(value, prevValue, item) {
  let v = parseValue(value, prevValue);

  if (v > item.max) {
    v = item.max;
  }
  if (v < item.min) {
    v = item.min;
  }
  return v;
}


class Button extends Component {

  handleMouseDown = () => {
    this.long = false;
    document.addEventListener('mouseup', this.handleMouseUp)
    this.timer = setTimeout(this.handleLong, 250);
  }

  handleMouseUp = () => {
    if (this.long === false) {
      this.props.onClick(this.props.step || 1);
    }
    
    this.clear();
  }

  handleLong = () => {
    this.long = true;
    this.timer2 = setInterval(() => this.props.onClick(this.props.step || 1), 100)
  }

  clear = () => {
    document.removeEventListener('mouseup', this.handleMouseUp)

    clearTimeout(this.timer);
    clearInterval(this.timer2);

    this.long = null;
    this.timer = null;
    this.timer2 = null;
  }

  render() {
    return (
      <IconButton 
        size="small"
        className="nb" 
        style={styles.button}
        onMouseDown={this.handleMouseDown}
      >
        {this.props.type === 'left' ? <ArrowLeftIcon /> :  <ArrowRightIcon />}
      </IconButton>
    )
  }
}

function getAlign(v) {
  switch(v) {
    case 'left':
      return 'left';
    case 'right':
      return 'right';
    case 'center':
      return 'center';
    default:
      return 'center';
  }
}


function _Number(props) {
  const [value, setValue] = React.useState(props.data);
  const onChange = (type, prop, value) => {
    setValue(value)
    props.onChange(type, prop, value);
  };

  return (
    <div style={styles.container}>
      <div style={{ 
        flexShrink: 0, 
        color: props.item.titleColor, 
        fontSize: props.item.titleSize,
        textAlign: props.item.titleAlign,
        fontWeight: props.item.titleBold ? 600 : 'unset',
        fontStyle: props.item.titleItalic ? 'italic' : 'unset',
        marginTop: props.item.offsetTop,
        marginBottom: props.item.offsetBottom, 
        width: props.item.proportion, 
        ...props.item.style 
      }}>
        {props.item.title}
      </div>
      <Button
        type="left" 
        step={props.item.step}
        onClick={(v) => onChange('number', props.item.prop, checkValue(value - v, value, props.item))}
      />
      <input
        className="core"
        style={{...styles.root, fontSize: props.item.size, textAlign: getAlign(props.item.align), ...props.item.style2 }} 
        value={value}
        onChange={(e) => onChange('number', props.item.prop, checkValue(e.target.value, value, props.item))}
      />
      <Button
        type="right" 
        step={props.item.step}
        onClick={(v) => onChange('number', props.item.prop, checkValue(value + v, value, props.item))}
      />
    </div>
  )
}


export default _Number;