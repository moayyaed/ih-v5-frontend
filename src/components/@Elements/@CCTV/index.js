import React, { Component } from 'react';
import core from 'core';

import uuidv4 from 'uuid/v4';

import { transform } from '../tools';
import { subnotifications, unsubnotifications } from './transport';
import { playerH264, playerJpeg } from './players';

const styles = {
  root: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    zIndex: -1,
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    top: 5,
    right: 10,
    fontWeight: 600,
    fontSize: 14,
  },
  textError: {
    fontWeight: 600,
    fontSize: 14,
    color: '#FFC107',
  },
  containerError: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  }
};


class CCTV extends Component {
  state = { text: '' }

  componentDidMount() {
    if (this.props.mode === 'user') {
      this.nuuid = uuidv4();
      subnotifications(this.nuuid, this.notifications);
      this.getData();
    }
  }

  getData = () => {
    if (this.state.text === '')  {
      this.setState({ text: 'CONNECT', color: '#FFC107', err: null });
    }
    const id = this.props.item.widgetlinks && this.props.item.widgetlinks.link && this.props.item.widgetlinks.link.id;
    
    if (id) {
      core
      .request({ method: 'cctv', params: {} })
      .ok(data => {
        const config = data.find(i => i.id === id);
        if (config) {
          this.createPlayer(config)
        }
      });
    }
  }

  notifications = (type, params) => {
    if (this.config !== undefined && params.camid === this.config.id) {
      if (type ==='close_cam') {
        this.setState({ text: 'RECONNECT', color: '#F44336' });
        this.clearPlayer();
        this.getData();
      }

      if (type ==='error_cam') {
        this.setState({ text: 'ERROR', color: '#F44336', err: params.msg.toUpperCase() });
      }

      if (type ==='connect_cam') {
        this.setState({ text: 'CONNECT', color: '#FFC107', err: null });
      }
      if (type ==='live_cam') {
        this.setState({ text: 'LIVE', color: '#009688', err: null });
      }
    }
  }

  clearPlayer = () => {
    if (this.config !== undefined) {
      if (this.config.type === 'rtsp/h264') {
        if (this.player) {
          this.player.unlink();
          this.player.stop();
          this.player.destroy();
          if (this.link.firstChild) {
            this.link.removeChild(this.link.firstChild)
          }
        }
      } else {
        this.player.close();
        this.player.destroy();
        if (this.link.firstChild) {
          this.link.removeChild(this.link.firstChild)
        }
      }
    }
  }

  createPlayer = (config) => {
    this.config = config;
    if (config.type === 'rtsp/h264') {
      this.player = playerH264(this.link, config)
      this.player.close = this.closePlayer;
    } else {
      this.player = playerJpeg(this.link, config)
    }
  }

  closePlayer = (camid) => {
    this.notifications('close_cam', { camid });
  }

  handleLink = (e) => {
    this.link = e;
  }

  render({ props } = this) {
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
        <div ref={this.handleLink} style={styles.video} />
        <div style={{ ...styles.text, color: this.state.color }}>{this.state.text}</div>
        {this.state.err && <div style={styles.containerError}><div style={styles.textError}>{this.state.err}</div></div>}
      </div>
    );
  }
}


export default CCTV;