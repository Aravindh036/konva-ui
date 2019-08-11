import React from 'react';
import { getColor, getPath } from './helper';
import useImage from 'use-image';
import { Layer, Rect, Circle, Line, Path, Text, Image, Group } from 'react-konva';
var alteredJSON = null;

function getJson() {
    return alteredJSON;
}

function updatePositionJson(id, x, y) {
    console.log("id", id);
    console.log("x", x);
    console.log("y", y);
    console.log(alteredJSON);
    var j = 0;
    for (var i of alteredJSON) {
        alteredJSON[j] = findComponent[i.tag](i, id, x, y);
        j++;
    }
    console.log(alteredJSON);
}

const findComponent = {
    'artboard': function (json, id, x, y) {
        var l = 0;
        if (json.id === id) {
            console.log(json.tag, id, x, y);
        }
        else {
            for (var layers of json.layers) {
                json.layers[l] = findComponent[layers.tag](layers, id, x, y);
                l++;
            }
        }
        return json;
    },
    'group': function (json, id, x, y) {
        var k = 0;
        if (json.id === "afd946e2-7528-4bdf-a574-edd50775f1f5") {
            console.log(json);
        }
        if (json.id === id) {
            console.log(json.tag, id, x, y);
        }
        else {
            for (var layers of json.layers) {
                // console.log(layers)
                json.layers[k] = findComponent[layers.tag](layers, id, x, y);
                k++;
            }
        }
        return json;
    },
    'rectangle': function (json, id, x, y) {
        if (json.id === id) {
            json.frame.x = x;
            json.frame.y = y;
            console.log(json.tag, id, x, y);
        }
        return json;
    },
    'circle': function (json, id, x, y) {
        if (json.id === id) {
            json.frame.x = x;
            json.frame.y = y;
            console.log(json.tag, id, x, y);
        }
        return json;
    },
    'path': function (json, id, x, y) {
        if (json.id === id) {
            json.frame.x = x;
            json.frame.y = y;
            console.log(json.tag, id, x, y);
        }
        return json;
    },
    'text': function (json, id, x, y) {
        if (json.id === id) {
            json.frame.x = x;
            json.frame.y = y;
            console.log(json.tag, id, x, y);
        }
        return json;
    },
    'image': function (json, id, x, y) {
        if (json.id === id) {
            json.frame.x = x;
            json.frame.y = y;
            console.log(json.tag, id, x, y);
        }
        return json;
    },
    'line': function (json, id, x, y) {
        if (json.id === id) {
            json.frame.x = x;
            json.frame.y = y;
            console.log(json.tag, id, x, y);
        }
        return json;
    },
    'svg': function (json, id, x, y) {
        if (json.id === id) {
            json.frame.x = x;
            json.frame.y = y;
            console.log(json.tag, id, x, y);
        }
        return json;
    }
}

function parseJson(json) {
    var result = [], j = 0;
    for (var i of json) {
        j++;
        result.push({
            layer: label[i.tag](i),
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

const label = {
    'artboard': function (json) {
        var layersArray = [];
        for (var layers of json.layers) {
            layersArray.push(label[layers.tag](layers));
        }
        return <Layer
            key={json.frame.id}>
            {layersArray}
        </Layer>;
    },
    'group': function (json) {
        var layersArray = [];
        for (var layers of json.layers) {
            layersArray.push(label[layers.tag](layers));
            // console.log("in groupp", layers.tag);
        }
        layersArray = <Group key={json.id} x={parseInt(json.frame.x.toFixed(2))} y={parseInt(json.frame.y.toFixed(2))} >
            {layersArray}
        </Group>;
        // console.log(layersArray);
        return layersArray;
    },
    'rectangle': function (json) {
        var obj = {
            ComponentKey: json.id,
            key: json.id,
            x: parseInt(json.frame.x.toFixed(2)),
            y: parseInt(json.frame.y.toFixed(2)),
            height: json.frame.height,
            width: json.frame.width,
        }
        obj['cornerRadius'] = json.cornerRadius;
        for (let index in json.backgroundColor) {
            if ((json.backgroundColor[index].value.visible === true) && (json.backgroundColor[index].type === "solid"))
                obj['fill'] = getColor(json.backgroundColor[index].value);
        }
        for (let index in json.style.shadow) {
            if (json.style.shadow[index].visible === true) {
                if (json.style.shadow[index].color.visible === true)
                    obj['shadowColor'] = getColor(json.style.shadow[index].color);
                obj['shadowOffsetX'] = json.style.shadow[index].x;
                obj['shadowOffsetY'] = json.style.shadow[index].y;
                obj['shadowBlur'] = json.style.shadow[index].s;
            }
        }
        for (let index in json.style.border) {
            obj['strokeWidth'] = json.style.border[index].thickness;
            obj['stroke'] = getColor(json.style.border[index].color.value);
        }
        // console.log("json::", json.name, json);
        return <Rect {...obj} draggable onDragEnd={(e) => {
            json.frame.hello = "praveen"
            updatePositionJson(json.id, e.target.attrs.x, e.target.attrs.y)
        }} />;
    },
    'circle': function (json) {
        var obj = {
            key: json.id,
            ComponentKey: json.id,
            x: parseInt(json.frame.x.toFixed(2)) + json.radius,
            y: parseInt(json.frame.y.toFixed(2)) + json.radius - 5,
            radius: json.radius
        }
        for (let index in json.style.backgroundColor) {
            obj['fill'] = getColor(json.style.backgroundColor[index].value);
        }
        for (let index in json.style.shadow) {
            if (json.style.shadow[index].visible === true) {
                if (json.style.shadow[index].color.visible === true)
                    obj['shadowColor'] = getColor(json.style.shadow[index].color);
                obj['shadowOffsetX'] = json.style.shadow[index].x;
                obj['shadowOffsetY'] = json.style.shadow[index].y;
                obj['shadowBlur'] = json.style.shadow[index].s;
            }
        }
        for (let index in json.style.border) {
            obj['strokeWidth'] = json.style.border[index].thickness;
            obj['stroke'] = getColor(json.style.border[index].color.value);
        }
        // console.log("in circle",obj);
        return <Circle {...obj} draggable onDragEnd={(e) => {
            updatePositionJson(json.id, e.target.attrs.x, e.target.attrs.y);
            console.log(json);
        }} />;
    },
    'path': function (json) {
        var obj = {
            key: json.id,
            ComponentKey: json.id,
            x: parseInt(json.frame.x.toFixed(2)),
            y: parseInt(json.frame.y.toFixed(2)),
            height: parseInt(json.frame.height.toFixed(2)),
            width: parseInt(json.frame.width.toFixed(2)),
        }
        obj['data'] = getPath(json);
        for (let index in json.style.backgroundColor) {
            obj['fill'] = getColor(json.style.backgroundColor[index].value);
        }
        // console.log(json);
        return <Path {...obj} draggable onDragEnd={(e) => {
            updatePositionJson(json.id, e.target.attrs.x, e.target.attrs.y);
            console.log(json);
        }} />;
    },
    'text': function (json) {
        var obj = {
            ComponentKey: json.id,
            key: json.id,
            x: parseInt(json.frame.x.toFixed(2)),
            y: parseInt(json.frame.y.toFixed(2)),
            height: json.frame.height,
            width: json.frame.width
        }
        // console.log("text", json);
        for (let index in json.style.format) {
            // console.log(json.style.format[index]);
            obj['fontFamily'] = json.style.format[index].fontFamily;
            if (json.style.format[index].fontStyle === "ExtraBold")
                obj['fontStyle'] = 1000;
            else if ((json.style.format[index].fontStyle !== "Light") && ((json.style.format[index].fontStyle !== "Medium")))
                obj['fontStyle'] = json.style.format[index].fontStyle;
            obj['fontSize'] = json.style.format[index].fontSize;
            obj['fontSize'] = json.style.format[index].fontSize;
        }
        obj['fill'] = getColor(json.color[0].value);
        obj['text'] = json.string;

        return <Text {...obj} draggable onDragEnd={(e) => {
            updatePositionJson(json.id, e.target.attrs.x, e.target.attrs.y);
            console.log(json);
        }} />;
    },
    'image': function (json) {
        return <CustomImage key={json.id} json={json} />;
    },
    'line': function (json) {
        var x, y;
        if ((json.frame.rotation !== 0) && (parseInt(json.frame.height.toFixed(2)) === 0)) {
            x = (parseInt(json.frame.x.toFixed(2)) + parseInt(json.frame.width / 2));
            y = (parseInt(json.frame.y.toFixed(2)) + parseInt(json.frame.width / 2));
        }
        else if ((json.frame.rotation !== 0) && (parseInt(json.frame.width.toFixed(2)) === 0)) {
            x = (parseInt(json.frame.x.toFixed(2)) + parseInt(json.frame.height / 2));
            y = (parseInt(json.frame.y.toFixed(2)) + parseInt(json.frame.height / 2));
        }
        else {
            x = parseInt(json.frame.x.toFixed(2));
            y = parseInt(json.frame.y.toFixed(2));
        }
        var obj = {
            ComponentKey: json.id,
            key: json.id,
            x: x,
            y: y,
            rotation: Math.abs(json.frame.rotation),
            points: [json.frame.x1, json.frame.y1, json.frame.x2, json.frame.y2,]
        }
        for (let index in json.style.stroke) {
            obj['strokeWidth'] = json.style.stroke[index].thickness;
            obj['stroke'] = getColor(json.style.stroke[index].color.value);
        }
        // console.log("in line ", obj);
        return <Line {...obj} draggable onDragEnd={(e) => {
            updatePositionJson(json.id, e.target.attrs.x, e.target.attrs.y);
            console.log(json);
        }} />;
    },
    'svg': function (json) {
        return <Image key={json.id} draggable onDragEnd={(e) => {
            updatePositionJson(json.id, e.target.attrs.x, e.target.attrs.y);
            console.log(json);
        }} />
    }
}


const CustomImage = (props) => {
    var [imageObj] = useImage(`https://konva.s3.ap-south-1.amazonaws.com/resources/${props.json.src}.png`);
    // console.log(props)
    var obj = {
        ComponentKey: props.json.id,
        key: props.json.id,
        x: props.json.frame.x,
        y: props.json.frame.y,
        height: props.json.frame.height,
        width: props.json.frame.width,
        image: imageObj,
    }
    for (let index in props.json.style.border) {
        obj['stroke'] = getColor(props.json.style.border[index].color.value);
    }
    // console.log(obj);
    return (<Image {...obj} draggable onDragEnd={(e) => {
        updatePositionJson(props.json.id, e.target.attrs.x, e.target.attrs.y);
        console.log(props.json);
    }} />);
}

export { parseJson, getJson };