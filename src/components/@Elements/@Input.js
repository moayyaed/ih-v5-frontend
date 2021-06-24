import React, { useState } from 'react';
import core from 'core';

import shortid from 'shortid';

import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';

import IconButton from '@material-ui/core/IconButton';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

import { withStyles } from '@material-ui/core/styles';

import { transform } from './tools';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root2: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    height: '100%',
  },
};

const classes = theme => {
  return {
    root: {
      height: '100%',
    },
    input: props => ({
      color: props.item.textColor.value,
      fontSize: props.item.textSize.value * (props.scale || 1),
      height: '100%!important'
    }),
    label: props => ({
      '& input': {
        color: props.item.textColor.value,
        fontSize: props.item.textSize.value * (props.scale || 1),
      },
      '& label': {
        color: props.item.normalColor.value,
      },
      '& label.Mui-focused': {
        color: props.item.activeColor.value,
      },
    }),
    labelFilled: props => ({
      '& input': {
        backgroundColor: props.item.backdropColor ? props.item.backdropColor.value : '',
      },
      '& input.Mui-focused': {
        backgroundColor: props.item.activeColor.value,
      },
      '& label': {
        color: props.item.normalColor.value,
      },
      '& label.Mui-focused': {
        color: props.item.activeColor.value,
      },
    }),
    standard: props => ({
      "&:before": {
        borderColor: props.item.normalColor.value,
      },
      "&:hover:before": {
        borderColor: `${props.item.hoverColor.value}!important`
      },
      "&:after": {
        borderColor: props.item.activeColor.value,
      }
    }),
    filled: props => ({
      '& input': {
        color: props.item.textColor.value,
        fontSize: props.item.textSize.value * (props.scale || 1),
      },
      "&:before": {
        borderColor: props.item.normalColor.value,
      },
      "&:hover:before": {
        borderColor: `${props.item.hoverColor.value}!important`
      },
      "&:after": {
        borderColor: props.item.activeColor.value,
      }
    }),
    outlined: props => ({
      '& input': {
        color: props.item.textColor.value,
        fontSize: props.item.textSize.value * (props.scale || 1),
      },
      '& label': {
        color: props.item.normalColor.value,
      },
      '& label.Mui-focused': {
        color: props.item.activeColor.value,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: props.item.normalColor.value,
        },
        '&:hover fieldset': {
          // 
        },
        "&:hover fieldset": {
          borderColor: props.item.hoverColor.value,
        },
        '&.Mui-focused fieldset': {
          borderColor: props.item.activeColor.value,
        },
      },
    }),
    adornment: props => ({
      '& *': {
        color: getColor(props.item.textColor.value),
      },
    }),
  }
};


const temp = { value: 'abc' };

function getColor(str) {
  const temp = str.slice(5, str.length - 1).split(',');
  if (temp.length === 4) {
    temp[3] = '0.54';
    return 'rgba(' + temp.join(',') + ')';
  }
  return str;
}

function getVariant(type) {
  switch (type) {
    case 'input_filled':
      return 'filled';
    case 'input_outlined':
      return 'outlined';
    default:
      return 'standard';
  }
}

function checkValue(mode, value, prevValue) {
  if (mode === 'number') {
    if (value === '0-' || value === '-0') {
      return '-'
    }
    if (value === '-') {
      return 0;
    }
    if (value[value.length - 1] === '.' || value[value.length - 1] === ',') {
      return value;
    }
    if (value === '') {
      return 0;
    }
    const v = parseFloat(value);
    if (isNaN(v)) {
      return prevValue === undefined ? 0 : prevValue;
    }
    return parseFloat(value);
  }
  return value;
}

function sendValue(item, value) {
  if (item.inputMode.value.id === 'number' && typeof value !== 'string') {
    if (item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id) {
      const did = item.widgetlinks.link.id === '__device' ? core.store.getState().layoutDialog.contextId : item.widgetlinks.link.id;
      core.tunnel.command({
        uuid: shortid.generate(),
        method: 'action',
        type:'command',
        command: 'setval',
        did: did,
        prop: item.widgetlinks.link.prop,
        value,
      });
    }
  } else {
    if (item.widgetlinks && item.widgetlinks.link && item.widgetlinks.link.id) {
      const did = item.widgetlinks.link.id === '__device' ? core.store.getState().layoutDialog.contextId : item.widgetlinks.link.id;
      core.tunnel.command({
        uuid: shortid.generate(),
        method: 'action',
        type:'command',
        command: 'setval',
        did: did,
        prop: item.widgetlinks.link.prop,
        value,
      });
    }
  }
}

function getEndAdornment(item, value, classes) {
  if (item.saveMode.value.id === 'button') {
    return (
      <IconButton style={{ color: item.normalColor.value }} size="small" onClick={() => sendValue(item, value)}>
        <SubdirectoryArrowLeftIcon fontSize="small" />
      </IconButton>
    )
  }
  return item.endAdornment.value !== '' ? <InputAdornment classes={{ positionEnd: classes.adornment }} position="end">{item.endAdornment.value}</InputAdornment> : null
}

function getClasses(item, classes) {
  const temp = {};

  if (item.fullHeight.value) {
    temp.root = classes.root;
    temp.input = classes.input;
  }

  if (item.type === 'input_modern') {
    temp.underline = classes.standard;
  }

  if (item.type === 'input_filled') {
    temp.underline = classes.filled;
  }

  return temp;
}

function getClasses2(item, classes) {

  if (item.type === 'input_outlined') {
    return { root: classes.outlined };
  }

  if (item.type === 'input_filled') {
    return { root: classes.labelFilled };
  }

  return { root: classes.label };
}


function getInput(props, data, onChange) {
  if (props.item.type === 'input' || props.item.type === 'input_classic') {
    return (
      <InputBase
        style={{ ...styles.inputBase, color: props.item.textColor.value, fontSize: props.item.textSize.value * (props.scale || 1) }}
        value={data.value}
        multiline={props.item.fullHeight.value}
        fullWidth={props.item.fullWidth.value}
        placeholder={props.item.placeholder.value }
        startAdornment={props.item.startAdornment.value !== '' ? <InputAdornment classes={{ positionStart: props.classes.adornment }}  position="start">{props.item.startAdornment.value}</InputAdornment> : null}
        endAdornment={getEndAdornment(props.item, data.value, props.classes)}
        onChange={(e) => onChange('change', e.target.value)}
        onBlur={(e) => onChange('blur', e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onChange('press', data.value)}
      />
    )
  }

  return (
    <TextField
      classes={getClasses2(props.item, props.classes)}
      multiline={props.item.fullHeight.value}
      style={props.item.fullHeight.value ? styles.textField : null}
      fullWidth={props.item.fullWidth.value}
      label={props.item.label.value} 
      variant={getVariant(props.item.type)}
      size={props.item.size.value.id}
      value={data.value}
      placeholder={props.item.placeholder.value }
      InputProps={{
        classes: getClasses(props.item, props.classes),
        startAdornment: props.item.startAdornment.value !== '' ? <InputAdornment classes={{ positionStart: props.classes.adornment }}  position="start">{props.item.startAdornment.value}</InputAdornment> : null,
        endAdornment: getEndAdornment(props.item, data.value, props.classes),
      }}
      InputLabelProps={{ shrink: true, }}
      onChange={(e) => onChange('change', e.target.value)}
      onBlur={(e) => onChange('blur', e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && onChange('press', data.value)}
    />
  );
}

function Input(props) {

  const defData = props.mode === 'user' && props.item.data.value !== undefined ? props.item.data : temp;

  const [data, setData] = useState({ ...defData, value: checkValue(props.item.inputMode.value.id, defData.value, 0)});

  const onChange = (type, v) => {
    const value = checkValue(props.item.inputMode.value.id, v, data.value)

    setData({ ...data, value })

    if (props.item.saveMode.value.id === 'permanent' && type === 'change') {
      sendValue(props.item, value)
    }

    if (props.item.saveMode.value.id === 'outfocus' && type === 'blur') {
      sendValue(props.item, value)
    }

    if (type === 'press') {
      sendValue(props.item, value)
    }
  }

  return (
    <div 
      style={{
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value * (props.scale || 1)}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value * (props.scale || 1),
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: transform(props.item),
        overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
        visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
      }}
    >
      <div style={{ 
        ...styles.root, 
        padding: (props.item.type === 'input' || props.item.type === 'input_classic') ? 5 : 10, 
        pointerEvents: props.mode === 'user' ? 'all' : 'none' 
      }}>
        {getInput(props, data, onChange)}
      </div>
    </div>
  );
}

export default withStyles(classes)(React.memo(Input));