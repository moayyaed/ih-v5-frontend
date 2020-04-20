import React, { PureComponent } from 'react';


const styles = {
  horizont: {
    position: 'absolute',
    width: 5,
    height: '100%',
    top: 0,
    right: -3,
    cursor: 'col-resize',
    zIndex: 1000,
    background: '#9e9e9e20',
  },
  vert: {
    position: 'absolute',
    width: '100%',
    height: 5,
    left: 0,
    bottom: -3,
    cursor: 'row-resize',
    zIndex: 1000,
    background: '#9e9e9e20',
  }
}


class SizeControl extends PureComponent {

  handleDragStart = (e) => {
    e.preventDefault();
  
    window.addEventListener('mouseup', this.handleDragStop, true);
    window.addEventListener('mousemove', this.handleDragMove, true);
    document.body.style.cursor = 'col-resize';
  }
  
  handleDragMove = (e) => {
    const { 
      targetPercent, 
      nextElementPercent, 
    } = this.props.type === 'row' ? 
    this.getSizeWidth(this.link, e.movementX, e.movementY) :
    this.getSizeHeight(this.link, e.movementX, e.movementY)

    const target = this.link.parentNode;
    const nextElement = target.nextElementSibling;

    if (this.props.type === 'row') {
      target.style.width = targetPercent + '%';
      nextElement.style.width = nextElementPercent + '%';
    } else {
      target.style.height = targetPercent + '%';
      nextElement.style.height = nextElementPercent + '%';
    }
  }
  
  handleDragStop = (e) => {
    window.removeEventListener('mousemove', this.handleDragMove, true);
    window.removeEventListener('mouseup', this.handleDragStop, true);
    document.body.style.cursor = 'auto';

    const target = this.link.parentNode;
    const nextElement = target.nextElementSibling;

    const targetId = target.getAttribute('columnid');
    const nextElementId = nextElement.getAttribute('columnid');

    const { 
      targetPercent, 
      nextElementPercent, 
    } = this.props.type === 'row' ? 
      this.getSizeWidth(this.link, e.movementX, e.movementY) :
      this.getSizeHeight(this.link, e.movementX, e.movementY)


    this.props.onStop(targetId, targetPercent, nextElementId, nextElementPercent)
  }

  getSizeWidth = (node, x, y) => {
    const parent = node.parentNode.parentNode;
    const target = node.parentNode;
    const nextElement = target.nextElementSibling;

    let targetWidth = target.offsetWidth + x;
    let nextElementWidth = nextElement.offsetWidth - x;

    const tpl = Number(target.style.paddingLeft.slice(0,target.style.paddingLeft.length - 2));
    const tpr = Number(target.style.paddingRight.slice(0,target.style.paddingRight.length - 2));
    const tbl = Number(target.style.borderLeftWidth.slice(0,target.style.borderLeftWidth.length - 2));
    const tbr = Number(target.style.borderRightWidth.slice(0,target.style.borderRightWidth.length - 2));

    const npl = Number(nextElement.style.paddingLeft.slice(0,nextElement.style.paddingLeft.length - 2));
    const npr = Number(nextElement.style.paddingRight.slice(0,nextElement.style.paddingRight.length - 2));
    const nbl = Number(nextElement.style.borderLeftWidth.slice(0,nextElement.style.borderLeftWidth.length - 2));
    const nbr = Number(nextElement.style.borderRightWidth.slice(0,nextElement.style.borderRightWidth.length - 2));

    if (tpl + tpr + tbl + tbr > targetWidth) {
      targetWidth = target.offsetWidth;
      nextElementWidth = nextElement.offsetWidth;
    }

    if (npl + npr + nbl + nbr > nextElementWidth) {
      targetWidth = target.offsetWidth;
      nextElementWidth = nextElement.offsetWidth;
    }

    const targetPercent = (targetWidth / (parent.offsetWidth / 100)).toFixed(2);
    const nextElementPercent = (nextElementWidth / (parent.offsetWidth / 100)).toFixed(2);

    return { targetPercent, nextElementPercent };
  }

  getSizeHeight = (node, x, y) => {
    const parent = node.parentNode.parentNode;
    const target = node.parentNode;
    const nextElement = target.nextElementSibling;

    let targetHeight = target.offsetHeight + y;
    let nextElementHeight = nextElement.offsetHeight - y;

    const tpl = Number(target.style.paddingTop.slice(0,target.style.paddingTop.length - 2));
    const tpr = Number(target.style.paddingBottom.slice(0,target.style.paddingBottom.length - 2));
    const tbl = Number(target.style.borderTopWidth.slice(0,target.style.borderTopWidth.length - 2));
    const tbr = Number(target.style.borderBottomWidth.slice(0,target.style.borderBottomWidth.length - 2));

    const npl = Number(nextElement.style.paddingTop.slice(0,nextElement.style.paddingTop.length - 2));
    const npr = Number(nextElement.style.paddingBottom.slice(0,nextElement.style.paddingBottom.length - 2));
    const nbl = Number(nextElement.style.borderTopWidth.slice(0,nextElement.style.borderTopWidth.length - 2));
    const nbr = Number(nextElement.style.borderBottomWidth.slice(0,nextElement.style.borderBottomWidth.length - 2));

    if (tpl + tpr + tbl + tbr > targetHeight) {
      targetHeight = target.offsetHeight;
      nextElementHeight = nextElement.offsetHeight;
    }

    if (npl + npr + nbl + nbr > nextElementHeight) {
      targetHeight = target.offsetHeight;
      nextElementHeight = nextElement.offsetHeight;
    }

    const targetPercent = (targetHeight / (parent.offsetHeight / 100)).toFixed(2);
    const nextElementPercent = (nextElementHeight / (parent.offsetHeight / 100)).toFixed(2);

    return { targetPercent, nextElementPercent };
  }

  linked = (e) => {
    this.link = e;
  }

  render() {
    return (
      <div
        ref={this.linked} 
        style={this.props.type === 'row' ? styles.horizont : styles.vert}
        onMouseDown={this.handleDragStart}
      />
    );
  }
}


export default SizeControl;