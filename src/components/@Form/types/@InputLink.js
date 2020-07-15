import React, { PureComponent } from 'react';

import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';

import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';

const styles = {
  root: {
    margin: 12,
  }
}

class InputLink extends PureComponent {
  handleChangeText = (e) => {
    this.props.onChange(this.props.id, this.props.options, null, { value: e.target.value })
  }

  handleClickButton = () => {
    if (this.props.data.link) {
      this.props.onChange(this.props.id, this.props.options, null, { link: null, var: null, text: null, value: this.props.data.text || 'Text 1' })
    } else {
      this.props.onChange(this.props.id, this.props.options, null, { link: 'state', var: 'state1', value: 'state', text: this.props.data.value })
    }
  }

  render() {
    return (
      <TextField
        id={this.props.options.id} 
        label={this.props.options.title} 
        style={styles.root}
        disabled={Boolean(this.props.data.link)}
        InputProps={{
          endAdornment: (
            this.props.route.type ? <IconButton onClick={this.handleClickButton} size="small">
             {this.props.data.link ? <LinkOffIcon fontSize="small" /> : <LinkIcon fontSize="small" />}
            </IconButton> : null
          ),
        }}
        InputLabelProps={{ shrink: true, style: this.props.getStyle(this.props) }} 
        value={this.props.data.value}
        error={this.props.cache && this.props.cache.error}
        helperText={this.props.cache && this.props.cache.error}
        onChange={this.handleChangeText}
      />
    )
  }
}

export default InputLink;