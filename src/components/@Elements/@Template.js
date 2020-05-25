import React, { PureComponent } from 'react';

import Element from 'components/@Form/types/@Template/Element';
import elemets from 'components/@Elements';

class Template extends PureComponent {

  handleStub = () => {

  }

  handleRenderElementOld = (elementId, item) => {
    if (item.type === 'group') {
      const s = this.props.params.w / this.props.params.settings.w;
      return (
        <div
          style={{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            outline: item.groupId ? 'unset' : `1px dashed #6d7882`, 
          }}
        >
          {item.elements.map(id => 
            <Element 
              key={id}
              id={id}
              isGroup
              scale={1}
              item={this.props.params.elements[id]}
              select={null}
              selectType={null}  
              onStartMove={this.handleStub}
              onMove={this.handleStub}
              onStopMove={this.handleStub}
              onChangeSize={this.handleStub}
              onClick={this.handleStub}
              onContextMenu={this.handleStub} 
              onRenderElement={this.handleRenderElement}
            />
          )}
        </div>
      )
    }
    return elemets(elementId, item)
  }

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
          {item.elements.map(cid => this.handleRender(cid, this.props.params.elements[cid]))}
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
        {elemets(id, this.props.params.elements[id])}
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
          zoom: this.props.params.w / this.props.params.settings.w, 
        }}
      >
        {this.props.params.list.map(id => this.handleRender(id, this.props.params.elements[id]))}
      </div>
    )
  }
}

export default Template;



/*

            <Element
              key={id}
              isGroup
              scale={s}
              item={}
              select={null}
              selectType={null} 
              onStartMove={this.handleStub}
              onMove={this.handleStub}
              onStopMove={this.handleStub}
              onChangeSize={this.handleStub}
              onClick={this.handleStub}
              onContextMenu={this.handleStub} 
              onRenderElement={this.handleRenderElement}
            />

*/