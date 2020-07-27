import React from 'react';
import core from 'core';

import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonMenu from 'components/@Form/types/@ButtonMenu';

import { SketchPicker } from 'react-color';
import { GradientPicker, AnglePicker } from 'libs/gradient-picker';

import Select from '@material-ui/core/Select';

const PRESET_COLORS = [
  'transparent',
  '#D0021B', '#F5A623', '#F8E71C',
  '#8B572A', '#7ED321', '#417505',
  '#BD10E0', '#9013FE', '#4A90E2',
  '#50E3C2', '#B8E986', '#000000',
  '#4A4A4A', '#9B9B9B', '#FFFFFF',
];

const OPTIONS = [ 
  'Fill', 
  'Linear-gradient', 
  'Radial-gradient',
]

const styles = {
  root: {
    margin: 12,
  },
  rootMini: {},
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
  title: {
    marginBottom: 6,
  },
  titleMini: {
    display: 'none',
  },
  button: {
    width: 28,
    height: 28,
    border: '1px solid #999',
    borderRadius: 2,
    padding: 2,
    boxShadow: '0 0 0 2px #fff inset',
    cursor: 'pointer',
    position: 'relative',
  },
  buttonMini: {
    width: 16,
    height: 16,
    border: '1px solid #999',
    borderRadius: 2,
    cursor: 'pointer',
    position: 'relative',
  },
  buttonBackround: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center center',
  },
  buttonBackroundMini: {
    width: 14,
    height: 14,
    position: 'absolute',
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center center',
  },
  buttonBackround2: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  buttonBackround2Mini: {
    width: 14,
    height: 14,
    position: 'absolute',
  },
  toolbar: {
    display: 'flex',
    height: 28,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonToolbar: {
    width: '100%',
    height: 22,
    textAlign: 'center',
    cursor: 'pointer',
    border: '1px solid #E0E0E0',
    borderRadius: 2,
  },
  gradientContainer: {
    width: 220,
    height: 302,
  },
  angleContainer: {
    display: 'flex',
    width: '100%',
    height: 60,
    borderTop: '1px solid rgb(238, 238, 238)',
    alignItems: 'center',
    padding: '4px 10px',
  },
  angleToolbar: {
    borderRadius: 4,
    background: '#f2f2f2',
    display: 'flex',
    flex: 1,
    margin: '0px 10px',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  angleToolbarInput: {
    border: 'none',
    textAlign: 'center',
    width: 48,
    color: '#0C0C09',
    background: 'inherit'
  },
  angleToolbarSpan: {
    padding: 5,
    cursor: 'pointer',
    userSelect: 'none',
  },
  dropListContainer: {
      display: 'flex',
      width: '100%',
      borderTop: '1px solid rgb(238, 238, 238)',
      alignItems: 'start',
      padding: '4px 10px',
      justifyContent: 'space-around',
  },
  dropListContainer2: {
    display: 'flex',
    width: '100%',
    height: 40,
    alignItems: 'center',
    padding: '4px 10px',
    borderTop: '1px solid rgb(238, 238, 238)',
    justifyContent: 'space-around',
},
  selectContainer: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
  },
  select: { 
    width: '100%', 
    textAlign: 'center',
    fontSize: 14,
    border: '1px solid #BDBDBD',
    height: 24,
  },
  input: {
    width: 50,
    textAlign: 'center',
    marginLeft: 8,
    marginRight: 6,
  }
}


function addOpacityToHex(hex, a = 1){
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+a+')';
  }
  if (/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.test(hex)) { /** RGB color */
    return hex.replace('rgb', 'rgba').replace(')', `, ${a})`);
  }
  throw new Error('Bad Hex');
}

const WrappedSketchPicker = ({ onSelect, ...rest }) => (
  <SketchPicker {...rest}
    presetColors={PRESET_COLORS}
		color={addOpacityToHex(rest.color, rest.opacity)}
		onChange={c => {
			onSelect(c.hex, c.rgb.a);
		}}/>
);

function getContent(props, handleChangeFill, handleChangeGradient, handleChangeGradientRadial, handleChangeDropList, handleChangeAngle) {
  if (props.data.type === 'fill') {
    return (
      <SketchPicker
        color={props.data.fill}
        presetColors={PRESET_COLORS}
        onChange={handleChangeFill}
      />
    )
  }

  if (props.data.type === 'line') {
    return (
      <>
        <GradientPicker
          width={190}
          paletteHeight={24}
          palette={props.data.palette}
          onPaletteChange={handleChangeGradient}
          setAngle={() => {}}
        >
          <WrappedSketchPicker  />
        </GradientPicker>
        <div style={styles.angleContainer}>
          <AnglePicker angle={props.data.angle} setAngle={handleChangeAngle}/>
          <div style={styles.angleToolbar}>
            <span style={styles.angleToolbarSpan} onClick={() => handleChangeAngle(props.data.angle - 1)}>&#8722;</span>
            <input style={styles.angleToolbarInput} value={`${props.data.angle}°`} disabled/>
            <span style={styles.angleToolbarSpan} onClick={() => handleChangeAngle(props.data.angle + 1)}>&#43;</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <GradientPicker
        width={190}
        paletteHeight={24}
        palette={props.data.palette}
        onPaletteChange={handleChangeGradientRadial}
        setAngle={() => {}}
      >
        <WrappedSketchPicker  />
      </GradientPicker>
      <div style={styles.dropListContainer2}>
        <div>
          X:
          <input 
            style={styles.input} 
            value={props.data.positionX} 
            onChange={(e) => handleChangeDropList('positionX', e.target.value)} 
          />
          %
        </div>
        <div>
          Y:
          <input 
            style={styles.input} 
            value={props.data.positionY} 
            onChange={(e) => handleChangeDropList('positionY', e.target.value)}
          />
          %
        </div>
      </div>
      <div style={styles.dropListContainer}>
        <Select
          disableUnderline
          value={props.data.shape}
          onChange={(e) => handleChangeDropList('shape', e.target.value)}
          style={styles.select2}
        >
          <MenuItem value="circle">circle</MenuItem>
          <MenuItem value="ellipse">ellipse</MenuItem>
        </Select>
        <Select
          disableUnderline
          value={props.data.extent}
          onChange={(e) => handleChangeDropList('extent', e.target.value)}
          style={styles.select2}
        >
          <MenuItem value="closest-side">closest-side</MenuItem>
          <MenuItem value="closest-corner">closest-corner</MenuItem>
          <MenuItem value="farthest-side">farthest-side</MenuItem>
          <MenuItem value="farthest-corner">farthest-corner</MenuItem>
        </Select>
      </div>
    </>
  )
}

function paletteToString(palette) {
  if (palette.length === 1) {
    const i = palette[0];
    return addOpacityToHex(i.color, i.opacity) + ', ' + addOpacityToHex(i.color, i.opacity);
  }
  return palette
    .map(i => addOpacityToHex(i.color, i.opacity) + ' ' + Math.round(Number(i.offset) * 100 * 1e2 ) / 1e2 + '%')
    .join(',');
}

function getStyleButton(name, type) {
  if (name === type) {
    return { ...styles.buttonToolbar, background: '#3d7afc', color: '#fafafa' };
  }
  return styles.buttonToolbar;
}


function Color2(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setAnchorEl(null);
  };

  const handleChangeFill = (colors) => {
    const { r, g, b, a } = colors.rgb;
  
    if (props.data.fill === 'transparent') {
      const value = `rgba(${r},${g},${b},1)`;
      props.onChange(props.id, props.options, null, { ...props.data, value, fill: value })
    } else {
      const value = `rgba(${r},${g},${b},${a})`;
      props.onChange(props.id, props.options, null, { ...props.data, value, fill: value })
    }
  }

  const handleChangeGradient = (palette) => {
    const value = `linear-gradient(${props.data.angle}deg, ${paletteToString(palette)})`;
    props.onChange(props.id, props.options, null, { ...props.data, value, palette })
  }

  const handleChangeGradientRadial = (palette) => {
    const value = `radial-gradient(${props.data.shape} ${props.data.extent} at ${props.data.positionX}% ${props.data.positionY}%, ${paletteToString(palette)})`;
    props.onChange(props.id, props.options, null, { ...props.data, value, palette })
  }

  const handleChangeAngle = (angle) => {
    angle = angle > 360 ? 0 : angle;
    angle = angle < 0 ? 360 : angle;

    const value = `linear-gradient(${angle}deg, ${paletteToString(props.data.palette)})`;
    props.onChange(props.id, props.options, null, { ...props.data, value, angle })
  }

  const handleChangeType = (e) => {
    const type = e.target.value;
    if (type === 'fill') {
      props.onChange(props.id, props.options, null, { ...props.data, type, value: props.data.fill })
    }
    if (type === 'line') {
      const value = `linear-gradient(${props.data.angle}deg, ${paletteToString(props.data.palette)})`;
      props.onChange(props.id, props.options, null, { ...props.data, type, value })
    }
    if (type === 'radial') {
      const value = `radial-gradient(${props.data.shape} ${props.data.extent} at ${props.data.positionX}% ${props.data.positionY}%, ${paletteToString(props.data.palette)})`;
      props.onChange(props.id, props.options, null, { ...props.data, type, value })
    }
  }

  const handleChangeDropList = (key, value) => {
    const data = { ...props.data }

    if (key === 'shape') {
      data.shape = value;
      data.value = `radial-gradient(${value} ${props.data.extent} at ${props.data.positionX}% ${props.data.positionY}%, ${paletteToString(props.data.palette)})`;
    }
    if (key === 'extent') {
      data.extent = value;
      data.value = `radial-gradient(${props.data.shape} ${value} at ${props.data.positionX}% ${props.data.positionY}%, ${paletteToString(props.data.palette)})`;
    }
    if (key === 'positionX') {
      data.positionX = value;
      data.value = `radial-gradient(${props.data.shape} ${props.data.extent} at ${Number(value)}% ${props.data.positionY}%, ${paletteToString(props.data.palette)})`;
    }
    if (key === 'positionY') {
      data.positionY = value;
      data.value = `radial-gradient(${props.data.shape} ${props.data.extent} at ${props.data.positionX}% ${Number(value)}%, ${paletteToString(props.data.palette)})`;
    }
    props.onChange(props.id, props.options, null, data)
  }

  const handleClickButton = (title, id, value) => {
    if (title === null) {
      props.onChange(props.id, props.options, null, { ...props.data.old, _bind: null, title: null, old: {} })
    } else {
      props.onChange(props.id, props.options, null, { _bind: id, title, value, old: props.data })
    }
  };

  const open = Boolean(anchorEl);
  const s = {};

  if (props.mini) {
    s.root = styles.rootMini;
    s.title = styles.titleMini;
    s.button = styles.buttonMini;
    s.buttonBackround = styles.buttonBackroundMini;
    s.buttonBackround2 = styles.buttonBackround2Mini;
  } else {
    s.root = styles.root;
    s.title = styles.title;
    s.button = styles.button;
    s.buttonBackround = styles.buttonBackround;
    s.buttonBackround2 = styles.buttonBackround2;
  }


  if (props.data._bind) {
    return (
      <>
        <input
          className="core"
          style={styles.rootMini2} 
          disabled={true}
          value={props.data.title}
        />
        <ButtonMenu 
          enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
          icon={props.data._bind} 
          onChange={handleClickButton} 
        />
      </>
    )
  }

  return (
    <>
      <div style={s.root}>
        <div style={{ ...s.title, ...props.getStyle(props)}}>{props.options.title}</div>
        <div style={s.button} onClick={handleClick}>
          <div style={s.buttonBackround}/>
          <div style={{ ...s.buttonBackround2, background: props.data.value }}/>
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <>
            <div style={styles.selectContainer}>
              <Select
                disableUnderline
                value={props.data.type}
                onChange={handleChangeType}
                style={styles.select}
              >
                <MenuItem value="fill">Fill</MenuItem>
                <MenuItem value="line">Linear-gradient</MenuItem>
                <MenuItem value="radial">Radial-gradient</MenuItem>
              </Select>
            </div>
            {getContent(props, handleChangeFill, handleChangeGradient, handleChangeGradientRadial, handleChangeDropList, handleChangeAngle)}
          </>
        </Popover>
      </div>
      <ButtonMenu 
        enabled={props.options.bind !== undefined ? props.options.bind : props.route.type} 
        icon={props.data._bind} 
        onChange={handleClickButton} 
      />
    </>
  );
}


export default React.memo(Color2);