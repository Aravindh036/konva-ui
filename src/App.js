import React, { Component } from 'react';
import data from './design.json';
import { getJson, assignJSON } from './utils/index.js';
import './App.css';
import { Stage, Group, Layer } from 'react-konva';
import CustomImage from './utils/CustomImage';
import Rectangle from './utils/Rectangle';
import CustomCircle from './utils/CustomCircle';
import CustomPath from './utils/CustomPath';
import CustomText from './utils/CustomText';
import CustomLine from './utils/CustomLine';
import CustomSVG from './utils/CustomSVG';

var json = data, alteredJSON = null, update = null;

class App extends Component {
  state = {
    stageScale: 1,
    stageX: 0,
    stageY: 0,
    canvas: 0,
    length: 0,
    selected: null,
    full_canvas: [{ layer: null, data: { width: null, height: null } }]
  }
  componentDidMount() {
    console.log("in component did mount");
    assignJSON(json);
    const [canvas, length] = this.parseJson(json);
    // console.log(length);
    this.setState({
      full_canvas: canvas,
      length: length
    });

  }
  parseJson = (json) => {
    var result = [], j = 0;
    for (var i of json) {
      j++;
      result.push({
        layer: this.label[i.tag](i),
        data: {
          height: i.frame.height,
          width: i.frame.width
        }
      });
    }
    // console.log(result, j);
    if (alteredJSON == null) {
      alteredJSON = json;
    }
    return [result, j];
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

  setSelected = (value) => {
    console.log(value);
    this.setState({
      selected: value
    });
    update = true;
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
    var json = getJson();
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(json)));
    element.setAttribute('download', "template.json");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  componentDidUpdate() {
    if ((update === true)) {
      console.log("update");
      const [canvas, length] = this.parseJson(json);
      // console.log(length);
      this.setState({
        full_canvas: canvas,
        length: length
      });
    }
    update = false;
  }

  label = {
    'artboard': (json) => {
      var layersArray = [];
      for (var layers of json.layers) {
        layersArray.push(this.label[layers.tag](layers));
      }
      return <Layer
        key={json.frame.id}>
        {layersArray}
      </Layer>;
    },
    'group': (json) => {
      var layersArray = [];
      for (var layers of json.layers) {
        layersArray.push(this.label[layers.tag](layers));
        // console.log("in groupp", layers.tag);
      }
      layersArray = <Group
        key={json.id}
        x={parseInt(json.frame.x.toFixed(2))}
        y={parseInt(json.frame.y.toFixed(2))} >
        {layersArray}
      </Group>;
      // console.log(layersArray);
      return layersArray;
    },
    'rectangle': (json) => {
      return <Rectangle
        isSelected={json.id === this.state.selected}
        onSelect={() => {
          this.setSelected(json.id);
        }}
        json={json} />
    },
    'circle': (json) => {
      return <CustomCircle
        isSelected={json.id === this.state.selected}
        onSelect={() => {
          this.setSelected(json.id);
        }}
        json={json} />
    },
    'path': (json) => {
      return <CustomPath
        isSelected={json.id === this.state.selected}
        onSelect={() => {
          this.setSelected(json.id);
        }}
        json={json} />
    },
    'text': (json) => {
      return <CustomText
        isSelected={json.id === this.state.selected}
        onSelect={() => {
          this.setSelected(json.id);
        }}
        json={json} />
    },
    'image': (json) => {
      return <CustomImage
        key={json.id}
        isSelected={json.id === this.state.selected}
        onSelect={() => {
          this.setSelected(json.id);
        }}
        json={json} />;
    },
    'line': (json) => {
      return <CustomLine
        isSelected={json.id === this.state.selected}
        onSelect={() => {
          this.setSelected(json.id);
        }}
        json={json} />
    },
    'svg': (json) => {
      return <CustomSVG
        isSelected={json.id === this.state.selected}
        onSelect={() => {
          this.setSelected(json.id);
        }}
        json={json} />
    }
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
            onWheel={this.handleWheel}
            onMouseDown={e => {
              // deselect when clicked on empty area
              const clickedOnEmpty = e.target === e.target.getStage();
              if (clickedOnEmpty) {
                this.setSelected(null);
              }
            }} >
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