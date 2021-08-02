import React, { PureComponent } from 'react';
import core from 'core';

import elemets from 'components/@Elements';
import { transform } from './tools';

const method = window.document.body.style.zoom === undefined;


class TemplateProd extends PureComponent {

  elementRender = (id) => {
    const elements = this.props.elements;
    const item = elements[id];
    return (
      <div
        key={id}
        style={{ 
          position: 'absolute', 
          left: item.x.value,
          top: item.y.value,
          width: item.w.value,
          height: item.h.value,
          zIndex: item.zIndex.value,
          animation: item.animation.active ? item.animation.value : 'unset',
        }}
      >
        {elemets(item.type, { id, layoutId: this.props.layoutId, containerId: this.props.containerId, templateId: this.props.id, mode: this.props.mode, item, actions: this.props.item.actions })}
      </div>
    )
  }

  render() {
    const type = this.props.item.backgroundColor.type;
    const color = type === 'fill' ? '' : ', ' + this.props.item.backgroundColor.value;
    const src =  '';

    const b = this.props.item.borderSize.value * 2;
    const w = this.props.item.w.value * this.props.scale;
    const h = this.props.item.h.value * this.props.scale;
    const scale = (w - b) / (this.props.template.settings.w.value);

    return (
      <div
        style={{
          position: 'absolute', 
          width: '100%', 
          height: '100%',
          border: `${this.props.item.borderSize.value * (this.props.scale || 1)}px ${this.props.item.borderStyle.value.id} ${this.props.item.borderColor.value}`,
          borderRadius: (Math.min(w, h) / 2 / 100) * this.props.item.borderRadius.value * (this.props.scale || 1),
          opacity: this.props.item.opacity.value / 100,
          boxShadow: this.props.item.boxShadow.active ? this.props.item.boxShadow.value : 'unset',
          transform: transform(this.props.item),
          overflow: this.props.item.overflow.value ? 'hidden' : 'unset',
          backgroundColor: this.props.item.backgroundColor.value,
          backgroundImage:  `url(${encodeURI(src)})${color}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          visibility: this.props.item.visible && this.props.item.visible.value == false ? 'hidden' : 'unset',
        }}
      >
        <div style={{ 
          width: '100%', 
          height: '100%',
          transform: method ? `scale(${scale})` : 'unset',
          transformOrigin: method ? '0 0' : 'unset',
          zoom: method ? 'unset' : scale,
          }}
        >
          {this.props.item.list.map(this.elementRender)}
        </div>
      </div>
    )
  }
}

export default TemplateProd;