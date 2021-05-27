import React, { Component } from 'react';

import { virtualScrollDriver } from 'dynamic-virtual-scroll';
import Scrollbars2 from 'libs/Scrllbars2';
import clsx from 'clsx';

import withStyles from '@material-ui/core/styles/withStyles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import StepIcon from '@material-ui/core/StepIcon';

import Paper from '@material-ui/core/Paper';

import { transform } from './tools';


const styles = {
  steplabel: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 600,
  },
  stepcontent: {
    whiteSpace: 'pre-line',
  },
  stepicon: {
    color: 'rgb(158, 158, 158)',
  },
};


const temp = [
  { title: '31.12.2020 23:59:59.002', message: 'Значение: 2'},
  { title: '31.12.2020 23:59:58.001', message: 'Значение: 1'},
  { title: '31.12.2020 23:59:57.000', message: 'Значение: 0'},
];

function DeviceLog(props) {
  const data = props.mode === 'user' ? props.item.data : temp
  return (
    <div 
      style={{
        pointerEvents: props.mode === 'user' ? 'all' : 'none',
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: props.item.backgroundColor.value,
        border: `${props.item.borderSize.value}px ${props.item.borderStyle.value.id} ${props.item.borderColor.value}`,
        borderRadius: (Math.min(props.item.w.value, props.item.h.value) / 2 / 100) * props.item.borderRadius.value,
        opacity: props.item.opacity.value / 100,
        boxShadow: props.item.boxShadow.active ? props.item.boxShadow.value : 'unset',
        transform: transform(props.item),
        overflow: props.item.overflow && props.item.overflow.value ? 'hidden' : 'unset',
        visibility: props.item.visible && props.item.visible.value == false ? 'hidden' : 'unset',
      }}
    >
      <VirtualScroll mode={props.mode} data={data} />
    </div>
  );
}

class VirtualScroll extends Component {

  state = { init: true }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    this.itemElements = null;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.init || prevProps.data !== this.props.data) {
      this.update();
    }
  }

  getRenderedItemHeight = (index) => {
    if (this.itemElements[index]) {
      return this.itemElements[index].getBoundingClientRect().height;
    }
    return 0;
  }

  handleScroll = () => {
    if (this.state.init) {
      this.setState({ init: false });
    }
    this.update();
  }

  update = () => {
    const newState = virtualScrollDriver({
      totalItems: this.props.data.length,
      minRowHeight: 30,
      viewportHeight: this.link.clientHeight,
      scrollTop: this.link.scrollTop
    }, this.state, this.getRenderedItemHeight);
    
    newState.scrollbarWidth = this.link ? this.link.offsetWidth-this.link.clientWidth : 12;

    this.setStateIfDiffers(newState)
  }

  setStateIfDiffers(state, cb) {
    for (const k in state) {
      if (this.state[k] != state[k]) {
        this.setState(state, cb);
        return true;
      }
    }
    return false;
  }

  renderItems = (start, count) => {
    return this.props.data
      .slice(start, start + count)
      .map((item, index) => {
        return (
          <Step 
              key={'i'+(index+start)}
              ref={e => this.linkElement(e, index + start)} 
              style={styles.step} active>
            <StepLabel icon={<StepIcon icon=" "/>}  style={{ ...styles.steplabel }}>{item.title}</StepLabel>
            <StepContent
              icon={1}
              orientation="vertical" 
              style={styles.stepcontent}
            >
              <p>{item.message}</p>
            </StepContent>
          </Step>
        );
      });
  }

  linkElement = (e, index) => {
    if (e) {
      this.itemElements[index] = e
    }
  }

  linked = (e) => {
    if (e) {
      this.link = e.view;
    } else {
      this.link = null;
    }
  }

  render() {
    this.itemElements = [];   
    return (
      <Scrollbars2
        ref={this.linked} 
        scrollX={this.props.mode === 'user'}
        scrollY={this.props.mode === 'user'}
        onScroll={this.handleScroll}
        style={styles.scroll} 
      >
        <div style={{ height: this.state.targetHeight, padding: 24 }}>
          {this.state.topPlaceholderHeight
            ? <div style={{ height: this.state.topPlaceholderHeight }}></div>
            : null}
          {this.state.middleItemCount
            ? this.renderItems(this.state.firstMiddleItem, this.state.middleItemCount)
            : null}
          {this.state.middlePlaceholderHeight
            ? <div style={{ height: this.state.middlePlaceholderHeight }}></div>
            : null}
          {this.state.lastItemCount
            ? this.renderItems( this.props.data.length - this.state.lastItemCount, this.state.lastItemCount)
            : null}
        </div>
      </Scrollbars2>
    )
  }
}


export default DeviceLog;