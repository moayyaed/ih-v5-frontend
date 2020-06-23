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
          }}
        >
          {item.elements.map(cid => this.handleRender(cid, this.props.template.elements[cid]))}
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
        {elemets(id, this.props.template.elements[id], null)}
      </div>
    )
  }

  render() {
    const scale = Math.min((this.props.params.w) / this.props.template.settings.w, (this.props.params.h) / this.props.template.settings.h);
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
        }}
      >
        <div
          style={{
            position: 'relative', 
            width: this.props.template.settings.w, 
            height: this.props.template.settings.h,
            zoom: scale, 
          }}
        >
          {this.props.template.list.map(id => this.handleRender(id, this.props.template.elements[id]))}
        </div>
      </div>
    )
  }
}

export default Container;