import React, { PureComponent } from 'react';

import elemets from 'components/@Elements';


function getScale(item, settings, scaleW, scaleH) {
  console.log(item, settings)
  if (item.fitW.value && item.fitH.value) {
    return Math.min((item.w.value * scaleW) / settings.w.value, (item.h.value * scaleH) / settings.h.value);
  }

  if (settings.fitW.value) {
    return Math.min((item.w.value * scaleW) / settings.w.value, (item.h.value * scaleH) / settings.h.value);
  }

  if (settings.fitH.value) {
    return Math.min((item.w.value * scaleW) / settings.w.value, (item.h.value * scaleH) / settings.h.value);
  }

  return 1;
}


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
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
            overflow: item.overflow && item.overflow.value ? 'hidden' : 'unset',
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
            animation: item.animation && item.animation.active ? item.animation.value : 'unset',
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
          animation: item.animation && item.animation.active ? item.animation.value : 'unset',
        }}
      >
        {elemets(this.props.container.elements[id].type, { mode: this.props.mode, item: this.props.container.elements[id] })}
      </div>
    )
  }

  render() {
    const scale = getScale(this.props.item, this.props.container.settings, this.props.scaleW, this.props.scaleH)
    return (
      <div
        style={{
          width: '100%', 
          height: '100%',
          opacity: this.props.item.opacity.value / 100,
          background: this.props.container.settings.backgroundColor.value,
          backgroundImage: this.props.container.settings.backgroundImage.value === 'unset' ? 'unset' : `url(${this.props.container.settings.backgroundImage.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div 
          style={{
            width: '100%', 
            height: '100%', 
            display: 'flex',
            position: 'absolute',  
            justifyContent: this.props.container.settings.alignW.value.id,
            alignItems: this.props.container.settings.alignH.value.id,
            backgroundColor: this.props.container.settings.overlayColor.value 
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
      </div>
    )
  }
}

export default Container;