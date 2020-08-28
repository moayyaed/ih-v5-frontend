import React, { Component }from 'react';
import core from 'core';

import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';


const styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#616163',
  },
  img: {
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },
  img2: {
    position: 'relative',
    maxHeight: '100%',
    maxWidth: '100%',
  }
}


class _Image extends Component {
  state = { enabled: false, w: 0, h: 0 }

  Viewer = null

  componentDidMount() {
    this.img = new Image();
    this.img.onload = this.handleLoadImage;
    this.img.src = `/images/${this.props.data}`;
  }

  componentWillUnmount() {
    this.img = null;
    this.Viewer = null
  }
  

  linked = (e) => {
    this.link = e;
  }
  linked2 = (e) => {
   if (e) {
    e.pan((this.state.w - this.state.iw) / 2, (this.state.h - this.state.ih) / 2);
   }
  }

  handleLoadImage = () => {
    this.setState(state => {
      return { 
        ...state, 
        enabled: true, 
        w: this.link.offsetWidth, 
        h: this.link.offsetHeight,
        iw: this.img.width,
        ih: this.img.height,
      }
    })
  }

  renderImg = () => {
    if (this.state.enabled === false) {
      return null;
    }
    return (
      <UncontrolledReactSVGPanZoom
        width={this.state.w} height={this.state.h}
        detectAutoPan={false}
        defaultTool='pan'
        toolbarProps={{ activeToolColor: '#5f7c8a' }}
        ref={this.linked2}
      >
        <svg width={this.state.iw} height={this.state.ih}>
          <image xlinkHref={`/images/${this.props.data}`} x="0" y="0" width={this.state.iw} height={this.state.ih} />  
        </svg>
      </UncontrolledReactSVGPanZoom>
    )
  }

  render() {
    return (
      <div ref={this.linked} style={styles.root}>
        {this.renderImg()}
      </div>
    )
  }
}


export default _Image;