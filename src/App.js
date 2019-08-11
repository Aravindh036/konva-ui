import React, { Component } from 'react';
import data from './design.json';
import { parseJson, getJson } from './utils/index.js';
import './App.css';
import { Stage } from 'react-konva';

var json = data;

class App extends Component {
  state = {
    stageScale: 1,
    stageX: 0,
    stageY: 0,
    canvas: 0,
    length: 0,
    full_canvas: [{ layer: null, data: { width: null, height: null } }]
  }
  componentDidMount() {
    const [canvas, length] = parseJson(json);
    // console.log(length);
    this.setState({
      full_canvas: canvas,
      length: length
    });

  }
  left = () => {
    var canvas = this.state.canvas;
    if (((this.state.canvas > 0))) {
      this.setState({
        canvas: canvas - 1
      });
    }
  }
  right = () => {
    var canvas = this.state.canvas;
    if ((this.state.canvas < this.state.length - 1)) {
      this.setState({
        canvas: canvas + 1
      });
    }
  }

  handleWheel = e => {
    e.evt.preventDefault();
    // console.log(this.state.full_canvas)
    const scaleBy = 1.05;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });
    this.setState({
      stageScale: newScale,
      stageX: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    }, () => {
      // console.log(this.state.full_canvas)
    });
    // console.log(json);
  }
  downloadJson = () => {
    var element = document.createElement('a');
    var json = getJson() ;
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(json)));
    element.setAttribute('download', "template.yaml");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  render() {
    // console.log("rendering", this.state.full_canvas);
    return (
      <div className="App">
        <div className="icons left-icon" onClick={this.left} >&#60;</div>
        <div className="canvas-display">
          <Stage
            x={this.state.stageX}
            y={this.state.stageY}
            key={this.state.full_canvas}
            width={this.state.full_canvas[this.state.canvas].data.width}
            height={this.state.full_canvas[this.state.canvas].data.height}
            onWheel={this.handleWheel} >
            {this.state.full_canvas[this.state.canvas].layer}
          </Stage>
        </div>
        <div className="icons right-icon" onClick={this.right} >&#62;</div>
        <div>
          <button className="download" onClick={this.downloadJson} >Download</button>
        </div>
      </div>
    )
  }
}

export default App;