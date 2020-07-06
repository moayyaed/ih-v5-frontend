import React from 'react';

import Popover from '@material-ui/core/Popover';

import { SketchPicker } from 'react-color';
import { GradientPicker, AnglePicker } from 'react-linear-gradient-picker';

const PRESET_COLORS = [
  'transparent',
  '#D0021B', '#F5A623', '#F8E71C',
  '#8B572A', '#7ED321', '#417505',
  '#BD10E0', '#9013FE', '#4A90E2',
  '#50E3C2', '#B8E986', '#000000',
  '#4A4A4A', '#9B9B9B', '#FFFFFF',
];

const styles = {
  root: {
    margin: 12,
  },
  title: {
    marginBottom: 6,
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
  buttonBackround: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) center center',
  },
  buttonBackround2: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 2,
    left: 2,
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

function getContent(props, handleChangeFill, handleChangeGradient, handleChangeAngle) {
  if (props.data.type === 'fill') {
    return (
      <SketchPicker
        color={props.data.fill}
        presetColors={PRESET_COLORS}
        onChange={handleChangeFill}
      />
    )
  }

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

function paletteToString(palette) {
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


function Color(props) {
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

  const handleChangeAngle = (angle) => {
    angle = angle > 360 ? 0 : angle;
    angle = angle < 0 ? 360 : angle;

    const value = `linear-gradient(${angle}deg, ${paletteToString(props.data.palette)})`;
    props.onChange(props.id, props.options, null, { ...props.data, value, angle })
  }

  const handleChangeType = (type) => {
    if (type === 'fill') {
      props.onChange(props.id, props.options, null, { ...props.data, type, value: props.data.fill })
    } else {
      const value = `linear-gradient(${props.data.angle}deg, ${paletteToString(props.data.palette)})`;
      props.onChange(props.id, props.options, null, { ...props.data, type, value })
    }
  }

  const open = Boolean(anchorEl);

  return (
    <div style={styles.root}>
      <div style={{ ...styles.title, ...props.getStyle(props)}}>{props.options.title}</div>
      <div style={styles.button} onClick={handleClick}>
        <div style={styles.buttonBackround}/>
        <div style={{ ...styles.buttonBackround2, backgroundColor: props.data }}/>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <>
          <div style={styles.toolbar}>
            <div style={getStyleButton('fill', props.data.type)} onClick={() => handleChangeType('fill')}>Fill</div>
            <div style={getStyleButton('gradient', props.data.type)} onClick={() => handleChangeType('gradient')} >Gradient</div>
          </div>
          {getContent(props, handleChangeFill, handleChangeGradient, handleChangeAngle)}
        </>
      </Popover>
    </div>
  );
}


export default React.memo(Color);