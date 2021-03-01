import React from 'react';

import { virtualScrollDriver } from 'dynamic-virtual-scroll';
import Scrollbars2 from 'libs/Scrllbars2';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import StepIcon from '@material-ui/core/StepIcon';

import { transform } from './tools';


const styles = {
  root: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  stepper: {
    background: 'unset',
  },
  step: {
    // marginTop: -34,
  },
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

const styles2 = {
  root: {
    position: 'relative', 
    width: '400px'
  },
  scroll: {
    overflowY: 'scroll', 
    height: '400px', 
    width: '400px', 
    overflowAnchor: 'none', 
    outline: 'none'
  }
};

const temp = [
  { title: '31.12.2020 23:59:59.002', message: 'Значение: 2'},
  { title: '31.12.2020 23:59:58.001', message: 'Значение: 1'},
  { title: '31.12.2020 23:59:57.000', message: 'Значение: 0'},
];


function DeviceLog(props) {
  const data = props.mode === 'user' ? props.item.data : temp;
  return (
    <Scrollbars2
scrollX={props.mode === 'user'}
scrollY={props.mode === 'user'}
>
<Stepper style={styles.stepper} activeStep={-1} orientation="vertical">
  {data.map((item, key) =>
    <Step key={key} style={styles.step} active>
      <StepLabel icon={<StepIcon icon=" "/>}  style={{ ...styles.steplabel }}>{item.title}</StepLabel>
      <StepContent style={styles.stepcontent}><p>{item.message}</p></StepContent>
    </Step>
  )}
</Stepper>
</Scrollbars2>
  );
}

export class DynamicVirtualScroll extends React.PureComponent {
  constructor() {
    super();
    const items = [];
    for (let i = 0; i < 100000; i++)
    {
      items[i] = 30 + Math.round(Math.random()*50);
    }
    this.state = { items };
  }

  componentDidUpdate = () => {
    this.driver();
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  getRenderedItemHeight_MemoryExample = (index) => {
    if (
      index >= this.state.firstMiddleItem && 
      index < this.state.firstMiddleItem+this.state.middleItemCount ||
      index >= this.state.items.length - this.state.lastItemCount
    ) {
        return this.state.items[index];
    }
    return 0;
  }

  getRenderedItemHeight_DOMExample = (index) => {
    if (this.itemElements[index]) {
      return this.itemElements[index].getBoundingClientRect().height;
    }
    return 0;
  }

  getRenderedItemHeight = this.getRenderedItemHeight_DOMExample

  renderItems(start, count) {
    return this.state.items
      .slice(start, start+count)
      .map((item, index) => {
        return (
          <div 
          key={'i'+(index+start)}
          ref={e => this.itemElements[index+start] = e}
          >
            <div
              style={{ 
                height: 50+'px', 
                color: 'white', 
                textAlign: 'center', 
                lineHeight: 50+'px', 
                background: 'rgb('+Math.round(50*255/80)+',0,0)'
              }}
            >
              № {index+start}: {item}px
            </div>
          </div>
        );
      });
  }

  render() {
    this.itemElements = [];
    return (
      <div style={styles2.root}>
        <div style={styles2.scroll}
          tabIndex="1"
          ref={e => this.viewport = e}
          onScroll={this.driver}
        >
          <div style={{height: this.state.targetHeight+'px'}}>
            {this.state.topPlaceholderHeight
                ? <div style={{height: this.state.topPlaceholderHeight+'px'}}></div>
                : null}
            {this.state.middleItemCount
                ? this.renderItems(this.state.firstMiddleItem, this.state.middleItemCount)
                : null}
            {this.state.middlePlaceholderHeight
                ? <div style={{height: this.state.middlePlaceholderHeight+'px'}}></div>
                : null}
            {this.state.lastItemCount
                ? this.renderItems(this.state.items.length-this.state.lastItemCount, this.state.lastItemCount)
                : null}
          </div>
          </div>
      </div>
    );
  }

  driver = () => {
    const newState = virtualScrollDriver({
      totalItems: this.state.items.length,
      minRowHeight: 30,
      viewportHeight: this.viewport.clientHeight,
      scrollTop: this.viewport.scrollTop
    }, this.state, this.getRenderedItemHeight);
    
    newState.scrollbarWidth = this.viewport ? this.viewport.offsetWidth-this.viewport.clientWidth : 12;
    this.setStateIfDiffers(newState);
  }

  setStateIfDiffers(state, cb) {
    for (const k in state)
    {
        if (this.state[k] != state[k])
        {
            this.setState(state, cb);
            return true;
        }
    }
    return false;
  }
}


export default DeviceLog;