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
            left: item.x,
            top: item.y,
            width: item.w,
            height: item.h,
            zIndex: item.zIndex,
            opacity: item.opacity / 100 ,
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
            left: item.x,
            top: item.y,
            width: item.w,
            height: item.h,
            zIndex: item.zIndex,
            opacity: item.opacity / 100,
          }}
        >
          {elemets(this.props.container.elements[id].type, { item: this.props.container.elements[id], template: this.props.templates[item.templateId] })}
        </div>
      )
    }
    return (
      <div
        key={id}
        style={{ 
          position: 'absolute', 
          left: item.x,
          top: item.y,
          width: item.w,
          height: item.h,
          zIndex: item.zIndex,
        }}
      >
        {elemets(this.props.container.elements[id].type, { item: this.props.container.elements[id] })}
      </div>
    )
  }

  render() {
    const scale = Math.min((this.props.item.w * this.props.scaleW) / this.props.container.settings.w, (this.props.item.h * this.props.scaleH) / this.props.container.settings.h);
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute', 
          width: '100%', 
          height: '100%',
          opacity: this.props.item.opacity / 100, 
        }}
      >
        <div
          style={{
            position: 'relative', 
            width: this.props.container.settings.w, 
            height: this.props.container.settings.h,
            zoom: scale, 
          }}
        >
          {this.props.container.list.map(id => this.handleRender(id, this.props.container.elements[id]))}
        </div>
      </div>
    )
  }
}

export default Container;