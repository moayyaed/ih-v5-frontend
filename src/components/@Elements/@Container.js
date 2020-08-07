import React, { PureComponent } from 'react';

import elemets from 'components/@Elements';

class Container extends PureComponent {

  handleRender = (id, item) => {
    if (item.type === 'group') {
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
            opacity: item.opacity.value / 100 ,
            overflow: item.overflow && item.item.overflow.value ? 'hidden' : 'unset',
          }}
        >
          {item.elements.map(cid => this.handleRender(cid, this.props.container.elements[cid]))}
        </div>
      )
    }
    if (item.type === 'template') {
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
          }}
        >
          {elemets(this.props.container.elements[id].type, { mode: this.props.mode, item: this.props.container.elements[id], template: this.props.templates[item.templateId] })}
        </div>
      )
    }
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
        }}
      >
        {elemets(this.props.container.elements[id].type, { mode: this.props.mode, item: this.props.container.elements[id] })}
      </div>
    )
  }

  render() {
    const scale = Math.min((this.props.item.w.value * this.props.scaleW) / this.props.container.settings.w.value, (this.props.item.h.value * this.props.scaleH) / this.props.container.settings.h.value);

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute', 
          width: '100%', 
          height: '100%',
          opacity: this.props.item.opacity.value / 100,
          animation: this.props.item.animation && this.props.item.animation.active ? this.props.item.animation.value : 'unset',
        }}
      >
        <div
          style={{
            position: 'relative', 
            width: this.props.container.settings.w.value, 
            height: this.props.container.settings.h.value,
            zoom: scale,
            overflow: this.props.item.overflow && this.props.item.overflow.value ? 'hidden' : 'unset',
          }}
        >
          {this.props.container.list.map(id => this.handleRender(id, this.props.container.elements[id]))}
        </div>
      </div>
    )
  }
}

export default Container;