import React, { PureComponent } from 'react';

import elemets from 'components/@Elements';

class Template extends PureComponent {

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
            overflow: item.overflow && item.item.overflow.value ? 'hidden' : 'unset',
          }}
        >
          {item.elements.map(cid => this.handleRender(cid, this.props.item.elements ? this.props.item.elements[cid] : this.props.template.elements[cid]))}
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
        {elemets(this.props.template.elements[id].type, { id: id, mode: this.props.mode, item: this.props.item.elements ? this.props.item.elements[id] : this.props.template.elements[id], actions: this.props.item.actions })}
      </div>
    )
  }

  render() {
    return (
      <div
        className="parent2"
        style={{
          position: 'absolute', 
          width: '100%', 
          height: '100%',
          zoom: this.props.item.w.value / this.props.template.settings.w.value,
          opacity: this.props.item.opacity.value / 100,
          // animation: this.props.item.animation && this.props.item.animation.active ? this.props.item.animation.value : 'unset',
          overflow: this.props.item.overflow && this.props.item.overflow.value ? 'hidden' : 'unset',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundColor: this.props.template.settings.backgroundColor.value,
          backgroundImage: this.props.template.settings.backgroundImage.value === 'unset' ? 'unset' : `url(${this.props.template.settings.backgroundImage.value})`,
        }}
      >
        <div style={{ width: '100%', height: '100%', backgroundColor: this.props.template.settings.overlayColor.value }}>
          {this.props.template.list.map(id => this.handleRender(id, this.props.item.elements ? this.props.item.elements[id] : this.props.template.elements[id]))}
        </div>
      </div>
    )
  }
}

export default Template;