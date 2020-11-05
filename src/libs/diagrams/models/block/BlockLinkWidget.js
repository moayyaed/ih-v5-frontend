/* eslint-disable class-methods-use-this */

import * as React from 'react';
import { DefaultLinkWidget, Toolkit, PointModel } from 'storm-react-diagrams';
import * as _ from 'lodash';

function typePoint(type) {
  switch (type) {
    case 'ON':
      return 10;
    case 'OFF':
      return 15;
    default:
      return 5;
  }
}

class $BlockLinkWidget extends DefaultLinkWidget {

  addPointToLink = (event, index): void => {
    if (event.ctrlKey === false) {
      this.props.diagramEngine.diagramModel.selectLinkEvent();
    }

    if (
      event.ctrlKey &&
      !this.props.diagramEngine.isModelLocked(this.props.link) &&
      this.props.link.points.length - 1 <= this.props.diagramEngine.getMaxNumberPointsPerLink()
    ) {
      const point = new PointModel(this.props.link, this.props.diagramEngine.getRelativeMousePoint(event));
      point.setSelected(true);
      this.forceUpdate();
      this.props.link.addPoint(point, index);
      this.props.pointAdded(point, event);
    }
  };

	generateLink(path, extraProps, id) {
		var props = this.props;

		var Bottom = React.cloneElement(
			(props.diagramEngine.getFactoryForLink(this.props.link)).generateLinkSegment(
				this.props.link,
				this,
				this.state.selected || this.props.link.isSelected(),
				path
			),
			{
				ref: ref => ref && this.refPaths.push(ref)
			}
		);

		var Top = React.cloneElement(Bottom, {
			...extraProps,
			strokeLinecap: "round",
			onMouseLeave: () => {
				this.setState({ selected: false });
			},
			onMouseEnter: () => {
				this.setState({ selected: true });
			},
			ref: null,
			"data-linkid": this.props.link.getID(),
			strokeOpacity: this.state.selected ? 0.1 : 0,
			strokeWidth: 20,
			onContextMenu: (e) => {
        let check = true;
				if (!this.props.diagramEngine.isModelLocked(this.props.link)) {
          Object
            .keys(this.props.diagramEngine.diagramModel.nodes)
            .forEach(key => {
                Object
                  .keys(this.props.diagramEngine.diagramModel.nodes[key].ports)
                  .forEach(key2 => {
                     Object
                      .keys(this.props.diagramEngine.diagramModel.nodes[key].ports[key2].links)
                      .forEach(key3 => {
                        if (this.props.link.id === this.props.diagramEngine.diagramModel.nodes[key].ports[key2].links[key3].id) {
                          if (check) {
                            check = false;
                            Object.keys(this.props.diagramEngine.diagramModel.nodes[key].listeners)
                              .forEach(key4 => {
                                if (this.props.diagramEngine.diagramModel.nodes[key].listeners[key4].contextMenu) {
                                  this.props.diagramEngine.diagramModel.nodes[key].listeners[key4].contextMenuLink(e, this.props.link);
                                };
                              });
                          }
                        }
                      })
                  })
              });
					// this.props.link.remove();
				}
			}
		});

		return (
			<g key={"link-" + id}>
				{Bottom}
				{Top}
			</g>
		);
	}

  render() {
    const { diagramEngine } = this.props;
    if (!diagramEngine.nodesRendered) {
      return null;
    }

    // ensure id is present for all points on the path
    var points = this.props.link.points;
    var paths = [];

    if (paths.length === 0) {

      if (points.length === 2) {

        const x1 = points[1].x;
        const y1 = points[1].y;

        const x4 = points[0].x;
        const y4 = points[0].y;

        const dx = Math.abs(x1 - x4) * 0.675;

        const p1x = x1;
        const p1y = y1;

        const p2x = x1 - dx;
        const p2y = y1;

        const p4x = x4;
        const p4y = y4;

        const p3x = x4 + dx;
        const p3y = y4;

        const data = `M${p1x} ${p1y} C ${p2x} ${p2y} ${p3x} ${p3y} ${p4x} ${p4y}`;
        paths.push(
          this.generateLink(
            data,
            {
              onMouseDown: event => {
                this.addPointToLink(event, 1);
              }
            },
            "0"
          )
        );

        //  draw the link as dangeling
        if (this.props.link.targetPort === null) {
          paths.push(this.generatePoint(1));
        }
      } else {
        // draw the multiple anchors and complex line instead
        for (let j = 0; j < points.length - 1; j++) {
          paths.push(
            this.generateLink(
              Toolkit.generateLinePath(points[j], points[j + 1]),
              {
                "data-linkid": this.props.link.id,
                "data-point": j,
                onMouseDown: (event: MouseEvent) => {
                  this.addPointToLink(event, j + 1);
                }
              },
              j
            )
          );
        }

        // render the circles
        for (var i = 1; i < points.length - 1; i++) {
          paths.push(this.generatePoint(i));
        }

        if (this.props.link.targetPort === null) {
          paths.push(this.generatePoint(points.length - 1));
        }
      }
    }

    this.refPaths = [];
    return (
      <g {...this.getProps()}>
        {paths}
        {_.map(this.props.link.labels, labelModel => {
          return this.generateLabel(labelModel);
        })}
      </g>
    );
  }
}

export default $BlockLinkWidget;
