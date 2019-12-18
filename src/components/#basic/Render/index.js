import React, { Component } from 'react';

import Draggable from 'react-draggable';
import { Scrollbars } from 'react-custom-scrollbars';

import Paper from '@material-ui/core/Paper';
import { transform } from '@babel/core';

const DELTA_LINE = 25;

const styles = {
  root: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    background: '#9E9E9E',
  },
  paper: {
    width: 550,
    height: 550,
    position: 'absolute',
    borderRadius: 0,
  },
  linex: {
    display: 'none',
    height: '100%',
    width: 1,
    border: '1px dashed #e036f4',
    position: 'absolute',
    zIndex: 9999,
  },
  liney: {
    display: 'none',
    height: 1,
    width: '100%',
    border: '1px dashed #e036f4',
    position: 'absolute',
    zIndex: 9999,
  },
};

/*
var posx = 0;
var posy = 0;
var lastx = 0;
var lasty = 0;
var scale = 0.5;
var target = null;

function onMouseWheel(e) {
  var delta = e.deltaY || e.detail || e.wheelDelta;
  console.log(e.deltaY);
}

function onMouseDown(e) {
  target = e.target;
  posx =  e.clientX - e.target.offsetLeft - lastx;
  posy =  e.clientY - e.target.offsetTop - lasty;
  document.onmousemove = move;
  document.onmouseup = close;
}

function move(e) {
  var x = (e.clientX - e.target.offsetLeft) - posx;
  var y = (e.clientY - e.target.offsetTop) - posy;
  lastx = x; 
  lasty = y; 
  target.style.transform = `translate(${x}px,${y}px)`; 
}

function close(e) {
  document.onmousemove = null;
  document.onmouseup = null;
  target = null;
} 
*/


class Render extends Component {
  state = { scale: 1, parentblock: true, childblock: false, xx: 100, x: 100, yy: 100, y: 100 };

  componentDidMount() {
    console.log(this.list)
    this.plinex = null;
    this.pliney = null;
    this.lx = {'n0': 0, 'n1': 0, 'n2': 0, 'e0': 250, 'e1': 70, 'e2': 150 };
    this.ly = {'n0': 0, 'n1': 0, 'n2': 0, 'e0': 250, 'e1': 70, 'e2': 150 };
    document.addEventListener('keydown', this.mouseDown);
    document.addEventListener('keyup', this.mouseUp);
  }

  mouseWhell = (e) => {
    const userx =  e.clientX - 270;
    const usery = e.clientY - 70;

    
    
    if (e.altKey) {
   
      const delta = e.deltaY || e.detail || e.wheelDelta;
      var scale =  this.state.scale + (delta / 60) / 100;
      if (scale < 0.1) {
        scale = 0.1;
      }

      scale = this.state.scale +  1;
      

      /*
       if (this.state.scale === 1) {
         dx = this.state.x  -  userx * ((scale - this.state.scale) / scale);
         dy = this.state.y  -  usery * ((scale - this.state.scale) / scale);
      } else {
         dx = this.state.x  - ((this.state.x + userx)  * ((scale - this.state.scale) / scale));
         dy = this.state.y  - ((this.state.y + usery)  * ((scale - this.state.scale) / scale));
      }

  
 
      const ux = (userx * scale - userx * this.state.scale) + this.state.x * scale;
      const uy = (usery * scale - usery * this.state.scale) + this.state.y * scale;


      const dx = this.state.x  - ((this.state.x + userx)  * ((scale - this.state.scale) / scale));
      const dy = this.state.y  - ((this.state.y + usery)  * ((scale - this.state.scale) / scale));

      const ddx = this.state.x - (this.state.x * (scale - this.state.scale) / scale);
      const ddy = this.state.y - (this.state.y * (scale - this.state.scale) / scale);
     
      const k =  (this.x * ((scale - this.state.scale) / scale));
      const k2 = (this.y * ((scale - this.state.scale) / scale));



      const x =  ((this.state.x * scale - this.state.x * this.state.scale ) / scale);
      const y =  ((this.state.y * scale - this.state.y * this.state.scale ) / scale);

      const ux = (userx * scale - userx * this.state.scale);
      const uy = (usery * scale - usery * this.state.scale);

      const xx = this.state.x - x - ux;
      const yy = this.state.y - y - uy;

         const rect = this.list.getBoundingClientRect();

      const wdif = rect.width * scale - rect.width * this.state.scale;
      const hdif = rect.height * scale - rect.height * this.state.scale;

      const clientx = e.clientX - rect.left;
      const clienty = e.clientY - rect.top;

      const xf = (clientx - this.state.x) / this.state.scale / rect.width;
      const yf = (clienty - this.state.y) / this.state.scale / rect.height;

      const x = this.state.x - wdif * xf;
      const y = this.state.y - hdif * yf;

      */
      
      

      // const x1 = this.state.x - (((this.state.x * this.state.scale) - userx) / scale);
      // const y2 = this.state.y - (((this.state.y * this.state.scale) - usery) / scale)


      

      // const ux =  (350 / this.state.scale);
      // const uy =  (350 / this.state.scale);



      // const x = this.state.x  - (this.state.x  / scale + (100 / scale));
      
      // const y = this.state.y  - (this.state.y  / scale + (100 / scale));
      var m = 0; 
      if (scale === 2) {
         m = 170
         var xxx = 0  - (m / scale * this.state.scale - this.state.xx);
         var yyy = 0  - (m / scale * this.state.scale - this.state.yy);
       } else {
         m = 250
         
       }

    


      
      this.setState((state, props) => {
        return { scale, x: xxx, y: yyy };
      });
    }
  }

  mouseDown = (e) => {
    if (e.keyCode === 18) {
      this.setState((state, props) => {
        document.body.style.cursor = 'move';
        return { parentblock: false, childblock: true };
      });
    }
  }

  mouseUp = (e) => {
    if (e.keyCode === 18) {
      this.setState((state, props) => {
        document.body.style.cursor = 'auto';
        return { parentblock: true, childblock: false };
      });
    }
  }

  onMove = (e, data) => {
    if(data.x !== data.lastX) {
      console.log(data.x);
    } else {
    }
    /*
    if (e.shiftKey) {
      if (this.plinex === null) {
        Object.keys(this.lx).forEach(key => {
          console.log(this.lx[key] === data.x);
          if (this.lx[key] === data.x) {
            this.plinex = data.x;
            this.linex.style.display ='block';
            this.linex.style.transform = `translateX(${data.x}px)`;
          }
        });
      } else {
        if (data.x > this.plinex + DELTA_LINE) {
          this.plinex = null;
          this.linex.style.display ='none';
          this.linex.style.transform = `translateX(-100px)`;
        }
        if (data.x < this.plinex - DELTA_LINE) {
          this.plinex = null;
          this.linex.style.display ='none';
          this.linex.style.transform = `translateX(-100px)`;
        }
      }
    }
    */
  }

  onStart = (e, data) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(e, data);
  }

  onStopMain = (e, data) => {
    this.setState((state, props) => {
      return { xx: data.x * this.statescale, x: data.x, y: data.y * this.statescale, y:data.y };
    });
  }

  onStop = (e, data) => {
    this.lx['n' + data.node.id] = data.x;
    this.lx['e' + data.node.id] = data.node.offsetWidth;
    this.ly['n' + data.node.id] = data.y;
    this.ly['e' + data.node.id] = data.node.offsetHeight;
    this.linex.style.display ='none';
    this.linex.style.transform = `translateX(-100px)`;
  }

  refLineX = (e) => {
    this.linex = e;
  }

  refLineY = (e) => {
    this.liney = e;
  }

  refScaleContainer = (e) => {
    this.scontainer = e;
  }

  refList = (e) => {
    this.list = e;
  }

  render() {
    return (
      <div style={styles.root} onWheel={this.mouseWhell} onKeyPress={this.keyPress}>
        <div ref={this.refLineX} style={styles.linex} />
        <div ref={this.refLineY} style={styles.liney} />
        <div style={{ zIndex: 2, height: 50, width: 50, position: 'absolute', background: 'blue', transform: 'translate(170px, 170px)' }} />
        <div style={{ zIndex: 2, height: 50, width: 50, position: 'absolute', background: 'red', transform: 'translate(250px, 250px)' }} />
          <div ref={this.refScaleContainer} className="scalecontainer" style={{ transform: `scale(${this.state.scale})` }}>
            <Draggable onStop={this.onStopMain} position={{ x: this.state.x, y: this.state.y }} disabled={this.state.parentblock} scale={this.state.scale}>
              <Paper
                ref={this.refList}
                elevation={2} 
                className="parent" 
                style={styles.paper}
              >
                <Draggable onStop={this.onStop} onDrag={this.onMove} onStart={this.onStart} bounds=".parent" disabled={this.state.childblock} scale={this.state.scale}>
                  <div id="0" className="parent2"  style={{ position: 'absolute', width: 250, height: 250, background: '#9E9E9E' }} >
                    <Draggable onStop={this.onStop} onDrag={this.onMove} onStart={this.onStart} bounds=".parent2" disabled={this.state.childblock} scale={this.state.scale}>
                      <div id="1" style={{ position: 'absolute', width: 70, height: 70, border: '2px solid blue' }} />
                    </Draggable>
                  </div>
                </Draggable>
                <Draggable  onStop={this.onStop} onDrag={this.onMove} onStart={this.onStart} bounds=".parent" disabled={this.state.childblock} scale={this.state.scale}>
                  <div id="2" className="parent2"  style={{ position: 'absolute', width: 150, height: 150, border: '2px solid yellow' }} />
                </Draggable>
              </Paper>
            </Draggable>
          </div>
  
      </div>
    );
  }
}


export default Render;