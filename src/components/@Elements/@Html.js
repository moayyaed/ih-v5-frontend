import React, { Component } from 'react';
import { transform } from './tools';

const styles = {
  root: {
    width: '100%', 
    height: '100%', 
  },
}

class Html extends Component {
  componentDidMount() {
    this.link.innerHTML = this.props.item.code.value;
    const codes = this.link.getElementsByTagName('script');
    for (let i = 0; i < codes.length; i++) {
      window.eval(codes[i].text);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.item.code.value !== prevProps.item.code.value) {
      this.link.innerHTML = this.props.item.code.value;
      const codes = this.link.getElementsByTagName('script');
      for (let i = 0; i < codes.length; i++) {
        window.eval(codes[i].text);
      }
    }
  }

  linked = (e) => {
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
        <div ref={this.linked} style={{ ...styles.root, pointerEvents: props.mode === 'user' ? 'all' : 'none' }} />
      </div>
    );
  }
}


export default Html;