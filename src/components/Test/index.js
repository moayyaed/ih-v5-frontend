import React, { Component } from 'react';

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const list = Array(100000).fill()

class Test extends Component {

  componentDidMount() {

    const ctx = this.canvas.getContext("2d");

    function render() {
      const t = Date.now();
      ctx.clearRect(0,0,850,650)
      ctx.beginPath();

      let x = 50
      let y = 250;
      
      ctx.moveTo(x, y);
      

      list.forEach(() => {
        y = y + getRandom(-80, 80);
        x =  x + getRandom(1, 10);
        // y = y + ;
        ctx.lineTo(x, y);
      });
   
      // ctx.closePath();
      ctx.stroke();
    }
    render();
    // setInterval(render, 1000 / 60);
   
    
  }

  link = (e) => {
    this.canvas = e;
  }

  render() {
    return (
      <canvas ref={this.link} width="850" height="650"></canvas>
    );
  }
}


export default Test;