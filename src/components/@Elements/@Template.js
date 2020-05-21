import React, { PureComponent } from 'react';

import Element from 'components/@Form/types/@Template/Element';
import elemets from 'components/@Elements';

class Template extends PureComponent {

  handleStub = () => {

  }

  handleRenderElement = (elementId, item) => {
    if (item.type === 'group') {
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
  render() {
    return (
      <div
        className="parent2"
        style={{
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
        }}
      >
        {this.props.params.list
          .map(id => 
            <Element
              key={id}
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
}

export default Template;