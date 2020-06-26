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
            left: item.x,
            top: item.y,
            width: item.w,
            height: item.h,
          }}
        >
          {item.elements.map(cid => this.handleRender(cid, this.props.item.elements[id] || this.props.template.elements[cid]))}
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
        }}
      >
        {elemets(this.props.template.elements[id].type, { item: this.props.item.elements[id] || this.props.template.elements[id] })}
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
          zoom: this.props.item.w / this.props.template.settings.w, 
        }}
      >
        {this.props.template.list.map(id => this.handleRender(id, this.props.item.elements[id] || this.props.template.elements[id]))}
      </div>
    )
  }
}

export default Template;