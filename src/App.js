import React, { Component } from 'react';
import json from './design.json';
import { parseJson } from './utils/index.js';
import './App.css';


class App extends Component {
  state = {
    canvas: 0,
    length: 0,
    full_canvas:[]
  }
  componentDidMount() {
    const [canvas,length] = parseJson(json);
    console.log(length);
    this.setState({
      full_canvas: canvas,
      length:length
    });
  }
  left = () => {
    var canvas = this.state.canvas;
    if (((this.state.canvas >= 0))) {
      this.setState({
        canvas: canvas - 1
      });
    }
  }
  right = () => {
    var canvas = this.state.canvas;
    if ((this.state.canvas <= this.state.length)) {
      this.setState({
        canvas: canvas + 1
      });
    }
  }
  render() {
    console.log("rendering");
    return (
      <div className="App">
        <div className="icons left-icon" onClick={this.left} >&#60;</div>
        {this.state.full_canvas[this.state.canvas]}
        <div className="icons right-icon" onClick={this.right} >&#62;</div>
      </div>
    )
  }
}

export default App;