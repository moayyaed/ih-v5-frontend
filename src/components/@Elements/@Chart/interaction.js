import Dygraph from 'dygraphs';

const ZOOM_MAX = 2678400000; // 31 day
const ZOOM_MAX_PLOTTER = 31104000000; // 360 day
const ZOOM_MIN = 10; // 380 ms
const DRAG_EDGE_MARGIN = 100;

function removeEvent(elem, type, fn) {
  elem.removeEventListener(type, fn, false);
}

function pageX(e) {
  return (!e.pageX || e.pageX < 0) ? 0 : e.pageX;
}

function pageY(e) {
  return (!e.pageY || e.pageY < 0) ? 0 : e.pageY;
}

function findPos(obj) {
  var p = obj.getBoundingClientRect(),
      w = window,
      d = document.documentElement;

  return {
    x: p.left + (w.pageXOffset || d.scrollLeft),
    y: p.top  + (w.pageYOffset || d.scrollTop)
  };
}

function distanceFromInterval(x, left, right) {
  if (x < left) {
    return left - x;
  } else if (x > right) {
    return x - right;
  } else {
    return 0;
  }
}

function distanceFromChart(elem, g) {
  var chartPos = findPos(g.canvas_);
  var box = {
    left: chartPos.x,
    right: chartPos.x + g.canvas_.offsetWidth,
    top: chartPos.y,
    bottom: chartPos.y + g.canvas_.offsetHeight
  };

  var pt = {
    x: pageX(),
    y: pageY()
  };

  var dx = distanceFromInterval(pt.x, box.left, box.right),
      dy = distanceFromInterval(pt.y, box.top, box.bottom);
  return Math.max(dx, dy);
}

function offsetToPercentage(g, offsetX, offsetY) {
  const xOffset = g.toDomCoords(g.xAxisRange()[0], null)[0];
  const yar0 = g.yAxisRange(0);
  const yOffset = g.toDomCoords(null, yar0[1])[1];

  const x = offsetX - xOffset;
  const y = offsetY - yOffset;

  const w = g.toDomCoords(g.xAxisRange()[1], null)[0] - xOffset;
  const h = g.toDomCoords(null, yar0[0])[1] - yOffset;

  const xPct = w === 0 ? 0 : (x / w);
  const yPct = h === 0 ? 0 : (y / h);

  return [xPct, (1 - yPct)];
}

function zoom(g, zoomInPercentage, xBias, yBias) {
  xBias = xBias || 0.5;
  yBias = yBias || 0.5;
  function adjustAxis(axis, zoomInPercentage, bias) {
    const delta = axis[1] - axis[0];
    const increment = delta * zoomInPercentage;
    const foo = [increment * bias, increment * (1 - bias)];
    return [axis[0] + foo[0], axis[1] - foo[1]];
  }
  const yAxes = g.yAxisRanges();
  const newYAxes = [];
  for (let i = 0; i < yAxes.length; i++) {
    newYAxes[i] = adjustAxis(yAxes[i], zoomInPercentage, yBias);
  }

  const range = adjustAxis(g.xAxisRange(), zoomInPercentage, xBias);
  const i = (range[1] - range[0]);
  if (typeof g.getOption('plotter') === 'function') {
      if (i < ZOOM_MAX_PLOTTER && i > ZOOM_MIN) {
        g.updateOptions({ dateWindow: range });
      }
  } else {
    if (i < ZOOM_MAX && i > ZOOM_MIN) {
      g.updateOptions({ dateWindow: range });
    }
  }
}

// --------------------------------------------------

export function mousewheel(event, g, context) {
  const normal = event.detail ? event.detail * -1 : event.wheelDelta / 40;

  const percentage = normal / 50;

  if (!(event.offsetX && event.offsetY)){
    event.offsetX = event.layerX - event.target.offsetLeft;
    event.offsetY = event.layerY - event.target.offsetTop;
  }

  const percentages = offsetToPercentage(g, event.offsetX, event.offsetY);
  const xPct = percentages[0];
  const yPct = percentages[1];

  zoom(g, percentage, xPct, yPct);
  event.preventDefault();
}


export function mousedown(event, g, context, cacheEvent) {
  if (event.button && event.button == 2) return;

  context.initializeMouseDown(event, g, context);

  if (event.altKey || event.shiftKey) {
    Dygraph.startZoom(event, g, context);
  } else {
    Dygraph.startPan(event, g, context);
  }

  const mousemove = function mousemove(event) {
    if (context.isZooming) {
      var d = distanceFromChart(event, g);
      if (d < DRAG_EDGE_MARGIN) {
        Dygraph.moveZoom(event, g, context);
      } else {
        if (context.dragEndX !== null) {
          context.dragEndX = null;
          context.dragEndY = null;
          g.clearZoomRect_();
        }
      }
    } else if (context.isPanning) {
      Dygraph.movePan(event, g, context);
    }
    cacheEvent();
  };

  const mouseup = function mouseup(event) {
    if (context.isZooming) {
      if (context.dragEndX !== null) {
        Dygraph.endZoom(event, g, context);
      } else {
        Dygraph.maybeTreatMouseOpAsClick(event, g, context);
      }
    } else if (context.isPanning) {
      Dygraph.endPan(event, g, context);
    }

    removeEvent(document, 'mousemove', mousemove);
    removeEvent(document, 'mouseup', mouseup);
    context.destroy();
  };

  g.addAndTrackEvent(document, 'mousemove', mousemove);
  g.addAndTrackEvent(document, 'mouseup', mouseup);
}