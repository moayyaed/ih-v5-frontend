import React, { PureComponent } from 'react';


const styles = {
  root: {
    position: 'absolute',
    width: 5,
    height: '100%',
    top: 0,
    right: -3,
    cursor: 'col-resize',
    zIndex: 1000,
    /// background: '#9e9e9e20',
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
    } = this.getSize(this.link, e.movementX, e.movementY);

    const target = this.link.parentNode;
    const nextElement = target.nextElementSibling;

    target.style.width = targetPercent + '%';
    nextElement.style.width = nextElementPercent + '%';
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
    } = this.getSize(this.link, e.movementX, e.movementY);

    this.props.onStop(targetId, targetPercent, nextElementId, nextElementPercent)
  }

  getSize = (node, x, y) => {
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

  linked = (e) => {
    this.link = e;
  }

  render() {
    return (
      <div
        ref={this.linked} 
        style={styles.root}
        onMouseDown={this.handleDragStart}
      />
    );
  }
}


export default SizeControl;