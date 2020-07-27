import React, { PureComponent } from 'react';

import TextField from '@material-ui/core/TextField';
import ButtonMenu from 'components/@Form/types/@ButtonMenu';


const styles = {
  root: {
    margin: 12,
  },
  rootMini: {
    fontSize: 13,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.87)',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
  },
  rootMini2: {
    fontSize: 13,
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
    fontWeight: 400,
    color: 'rgb(48, 84, 150)',
    width: '100%',
    border: 'unset', 
    height: 21,
    background: 'unset',
    fontWeight: 'bold',
  },
}


class InputLink extends PureComponent {
  handleChangeText = (e) => {
    this.props.onChange(this.props.id, this.props.options, null, { ...this.props.data, value: e.target.value })
  }

  handleClickButton = (title, id, value) => {
    if (title === null) {
      this.props.onChange(this.props.id, this.props.options, null, { _bind: null, title: null, text: null, value: this.props.data.text || 'Text 1' })
    } else {
      this.props.onChange(this.props.id, this.props.options, null, { _bind: id, title, value, text: this.props.data.value })
    }
  }

  render() {
    if (this.props.mini) {
      return (
        <>
          <input
            className="core"
            style={this.props.data._bind ? styles.rootMini2 : styles.rootMini} 
            disabled={Boolean(this.props.data._bind)}
            value={this.props.data._bind ? this.props.data.title : this.props.data.value}
            onChange={this.handleChangeText}
          />
            <ButtonMenu 
              enabled={this.props.route.type} 
              icon={this.props.data._bind} 
              onChange={this.handleClickButton} 
            />
        </>
      )
    }

    return (
      <TextField
        id={this.props.options.id} 
        label={this.props.options.title} 
        style={styles.root}
        disabled={Boolean(this.props.data._bind)}
        InputProps={{
          endAdornment: (
            <ButtonMenu 
              enabled={this.props.route.type} 
              icon={this.props.data._bind} 
              onChange={this.handleClickButton} 
            />
          )
        }}
        InputLabelProps={{ shrink: true, style: this.props.getStyle(this.props) }} 
        value={this.props.data._bind ? this.props.data.title : this.props.data.value}
        error={this.props.cache && this.props.cache.error}
        helperText={this.props.cache && this.props.cache.error}
        onChange={this.handleChangeText}
      />
    )
  }
}

export default InputLink;