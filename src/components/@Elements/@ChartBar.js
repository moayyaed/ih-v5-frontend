import React, { Component } from 'react';
import core from 'core';

import Fab from '@material-ui/core/Fab';

import { KeyboardDatePicker } from '@material-ui/pickers';

import IconBefore from '@material-ui/icons/KeyboardArrowLeft';
import IconNext from '@material-ui/icons/KeyboardArrowRight';

import SvgIcon from '@material-ui/core/SvgIcon';

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import { transform } from './tools';

const MIN_DATE = new Date(1451606400 * 1000);
const MAX_DATE = new Date(2524694399 * 1000);

const styles = {
  root: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    width: '100%', 
    height: '100%', 
  },
  buttonSync: {
    position: 'absolute',
    left: 6,
    color: '#fff',
  },
  buttonHome: {
    position: 'absolute',
    right: 6,
    color: '#fff',
  },
  buttonNavNext: {
    position: 'absolute',
    left: 'calc(50% + 30px)',
    color: '#fff',
  },
  buttonNavBefore: {
    position: 'absolute',
    left: 'calc(50% - 70px)',
    color: '#fff',
  },
  buttonDate: {
    position: 'absolute',
    left: 'calc(50% - 20px)',
    color: '#fff',
  },
  buttonsDiscrete: {
    position: 'absolute',
    left: 56,
    color: '#fff',
  },
  datePicker: {
    display: 'none',
  },
  speeddial: {
    position: 'absolute',
    left: 40,
    height: 40,
    width: 40,
  },
};


function EndIcon(props) {
  return (
    <SvgIcon  viewBox="0 0 24 24"  {...props}>
      <path d="M2,22 L18.25,12 L2,2 z" />
      <path d="M18.25,2 L22,2 L22,22 L18.25,22 L18.25,2 z" />
    </SvgIcon>
  )
}

function SyncIcon(props) {
  return (
    <SvgIcon  viewBox="0 0 24 24"  {...props}>
      <path d="M18.231,6 L18.231,10.5 L24,10.5 L24,13.5 L18.231,13.5 L18.231,18 L13,12 L18.231,6 z" />
      <path d="M11,-0 L13,-0 L13,24 L11,24 L11,-0 z" />
      <path d="M5.769,18 L5.769,13.5 L-0,13.5 L-0,10.5 L5.769,10.5 L5.769,6 L11,12 L5.769,18 z" />
    </SvgIcon>
  )
}

function CalendarIcon(props) {
  return (
    <SvgIcon  viewBox="0 0 24 24"  {...props}>
      <path d="M10.759,0 C10.53,0 10.345,0.188 10.345,0.421 C10.345,0.654 10.53,0.842 10.759,0.842 C11.297,0.842 11.753,1.195 11.924,1.684 L12.786,1.684 C12.593,0.725 11.758,0 10.759,0 z" />
      <path d="M13.241,0 C13.013,0 12.828,0.188 12.828,0.421 C12.828,0.654 13.013,0.842 13.241,0.842 C13.78,0.842 14.235,1.195 14.407,1.684 L15.269,1.684 C15.076,0.725 14.24,0 13.241,0 z" />
      <path d="M15.724,0 C15.495,0 15.31,0.188 15.31,0.421 C15.31,0.654 15.495,0.842 15.724,0.842 C16.263,0.842 16.718,1.195 16.889,1.684 L17.751,1.684 C17.559,0.725 16.723,0 15.724,0 z" />
      <path d="M17.751,1.684 C17.779,1.82 17.793,1.961 17.793,2.105 C17.793,3.266 16.865,4.211 15.724,4.211 C15.495,4.211 15.31,4.022 15.31,3.789 C15.31,3.557 15.495,3.368 15.724,3.368 C16.409,3.368 16.966,2.802 16.966,2.105 C16.966,1.957 16.936,1.816 16.889,1.684 L15.269,1.684 C15.296,1.82 15.31,1.961 15.31,2.105 C15.31,3.266 14.382,4.211 13.241,4.211 C13.013,4.211 12.828,4.022 12.828,3.789 C12.828,3.557 13.013,3.368 13.241,3.368 C13.926,3.368 14.483,2.802 14.483,2.105 C14.483,1.957 14.453,1.816 14.407,1.684 L12.786,1.684 C12.813,1.82 12.828,1.961 12.828,2.105 C12.828,3.266 11.899,4.211 10.759,4.211 C10.53,4.211 10.345,4.022 10.345,3.789 C10.345,3.557 10.53,3.368 10.759,3.368 C11.443,3.368 12,2.802 12,2.105 C12,1.957 11.97,1.816 11.924,1.684 L10.303,1.684 C10.33,1.82 10.345,1.961 10.345,2.105 C10.345,3.266 9.417,4.211 8.276,4.211 C8.047,4.211 7.862,4.022 7.862,3.789 C7.862,3.557 8.047,3.368 8.276,3.368 C8.96,3.368 9.517,2.802 9.517,2.105 C9.517,1.957 9.487,1.816 9.441,1.684 L7.448,1.684 L7.111,1.684 C7.282,1.195 7.737,0.842 8.276,0.842 C8.815,0.842 9.27,1.195 9.441,1.684 L10.303,1.684 C10.111,0.725 9.275,0 8.276,0 C7.277,0 6.441,0.725 6.249,1.684 L5.793,1.684 L0,1.684 L0,6.737 L0,7.579 L0,24 L24,24 L24,7.579 L24,6.737 L24,1.684 L17.751,1.684 z M23.172,23.158 L0.828,23.158 L0.828,7.579 L23.172,7.579 L23.172,23.158 z" />
      <path d="M4.706,13.127 L4.706,12.105 Q6.125,11.965 6.685,11.635 Q7.245,11.306 7.521,10.077 L8.554,10.077 L8.554,20.632 L7.158,20.632 L7.158,13.127 z" />
      <path d="M19.356,10.211 L19.356,11.373 Q18.854,11.868 18.021,13.097 Q17.188,14.326 16.548,15.747 Q15.915,17.131 15.588,18.271 Q15.377,19.003 15.042,20.632 L13.595,20.632 Q14.089,17.597 15.777,14.592 Q16.773,12.831 17.872,11.55 L12.111,11.55 L12.111,10.211 z" /> 
    </SvgIcon>
  )
}


class ChartBar extends Component {
  state = { enabledsd: null, speeddial: false, realtime: true, calendar: false }

  syncAll = () => {
    var data = null;

    if (this.props.dialogId && core.cache.chart.d) {
      data = core.cache.chart.d;
    } else if (this.props.containerId && core.cache.chart.c[this.props.containerId]) {
      data = core.cache.chart.c[this.props.containerId];
    } else {
      if (core.cache.chart.l) {
        data = core.cache.chart.l
      }
    }
    if (data) {
      core.transfer.send('command_layout', data)
    }
  }

  handleDate = () => {
    this.setState({ calendar: true })
  }

  handleChandeDateClose = () => {
    this.setState({ calendar: false })
  }

  handleChandeDate = (v) => {
    const date = new Date(v.unix() * 1000);
    date.setHours(0, 0, 0, 0);

    this.setState({ realtime: false, calendar: false });
    core.transfer.send('command_layout', { 
      command: this.props.dialogId ? 'synccharts_date_all_dialog' : 'synccharts_date_all',
      layoutId: this.props.layoutId, 
      containerId: this.props.containerId, 
      date: date.getTime(),
    })
  }

  handleSync = () => {
    this.syncAll();
  };

  handleNavBefore = () => {
    /*
    const [s, e] = this.ctx.chart.dateWindow_;
    const i = e - s;
    const ns = s - i;
    const ne = e - i;
    */
    // this.ctx.chart.updateOptions({ dateWindow: [ns, ne] });
  }

  handleNavNext = () => {
    /*
    const [s, e] = this.ctx.chart.dateWindow_;
    const i = e - s;
    const ns = e;
    const ne = e + i;
    */
    // this.ctx.chart.updateOptions({ dateWindow: [ns, ne] });
  }

  handleHome = () => {
    core.transfer.send('command_layout', { 
      command: this.props.dialogId ? 'synccharts_home_all_dialog' : 'synccharts_home_all',
      layoutId: this.props.layoutId, 
      containerId: this.props.containerId, 
    })
  }

  render() {
    const item = this.props.item;
    const buttonSize = item.buttonSize.value / 100;
  
    return (
      <div 
        style={{
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          background: this.props.item.backgroundColor.value,
          border: `${this.props.item.borderSize.value * (this.props.scale || 1)}px ${this.props.item.borderStyle.value.id} ${this.props.item.borderColor.value}`,
          borderRadius: (Math.min(this.props.item.w.value, this.props.item.h.value) / 2 / 100) * this.props.item.borderRadius.value * (this.props.scale || 1),
          opacity: this.props.item.opacity.value / 100,
          boxShadow: this.props.item.boxShadow.active ? this.props.item.boxShadow.value : 'unset',
          transform: transform(this.props.item),
          // animation: this.props.item.animation.active ? this.props.item.animation.value : 'unset',
          overflow: this.props.item.overflow && this.props.item.overflow.value ? 'hidden' : 'unset',
          visibility: this.props.item.visible && this.props.item.visible.value == false ? 'hidden' : 'unset',
        }}
      >
        <div style={{ ...styles.root, zIndex: this.props.mode === 'user' ? 1 : -1 }}>
          {item.buttonSync.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonSync, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleSync}
            >
              <SyncIcon />
            </Fab>
          : null}
          {item.buttonDate.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonDate, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleDate}
            >
              <CalendarIcon />
            </Fab>
          : null}
          {item.buttonNavigate.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonNavBefore, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleNavBefore}
            >
              <IconBefore fontSize="large" />
            </Fab>
          : null}
          {item.buttonNavigate.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonNavNext, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleNavNext}
            >
              <IconNext fontSize="large" />
            </Fab>
          : null}
          {item.buttonHome.value ?
            <Fab
              size="small"
              style={{ ...styles.buttonHome, transform: `scale(${buttonSize})`, backgroundColor: item.buttonsColor.value }}
              onClick={this.handleHome}
            >
              <EndIcon />
            </Fab>
          : null}
          <ThemeProvider theme={createMuiTheme({
              palette: {
                primary: {
                  main: item.buttonsColor.value,
                }
              },
            })}>
            <KeyboardDatePicker
              open={this.state.calendar}
              margin="normal"
              label=""
              minDate={MIN_DATE}
              maxDate={MAX_DATE}
              format="MM/dd/yyyy"
              style={styles.datePicker}
              onChange={this.handleChandeDate}
              onClose={this.handleChandeDateClose}
            />
          </ThemeProvider>
        </div>
      </div>
    );
  }
}


export default ChartBar;