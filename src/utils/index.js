import React from 'react';
import { getColor, getPath } from './helper';
import useImage from 'use-image';
// import { View, Group, Rectangle, Circle, Line, Path, PointText, Raster } from 'react-paper-bindings';
import { Layer, Stage, Rect, Circle, Line, Path, Text, Image, Group } from 'react-konva';
function parseJson(json) {
    var result=[], j = 0;
    for (var i of json) {
        j++;
        result.push(label[i.tag](i));
    }
    console.log(result,j);
    return [result,j];
}

const label = {
    'artboard': function (json) {
        var layersArray = [];
        for (var layers of json.layers) {
            layersArray.push(label[layers.tag](layers));
        }

        return <Stage key={json.frame.id} height={json.frame.height} width={json.frame.width} >
            <Layer key={json.frame.id} >
                {layersArray}
            </Layer>
        </Stage>;
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
        console.log("json::", json.name, json);
        return <Rect {...obj} />;
    },
    'circle': function (json) {
        var obj = {
            key: json.id,
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
        return <Circle {...obj} />;
    },
    'path': function (json) {
        var obj = {
            key: json.id,
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
        return <Path {...obj} />;
    },
    'text': function (json) {
        var obj = {
            key: json.id,
            x: parseInt(json.frame.x.toFixed(2)),
            y: parseInt(json.frame.y.toFixed(2)),
            height: json.frame.height,
            width: json.frame.width
        }
        console.log("text", json);
        for (let index in json.style.format) {
            // console.log(json.style.format[index]);
            obj['fontFamily'] = json.style.format[index].fontFamily;
            if(json.style.format[index].fontStyle === "ExtraBold")
            obj['fontStyle'] = 1000;
            else if ((json.style.format[index].fontStyle !== "Light") && ((json.style.format[index].fontStyle !== "Medium")))
                obj['fontStyle'] = json.style.format[index].fontStyle;
            obj['fontSize'] = json.style.format[index].fontSize;
            obj['fontSize'] = json.style.format[index].fontSize;

        }
        obj['fill'] = getColor(json.color[0].value);
        obj['text'] = json.string;

        return <Text {...obj} />;
    },
    'image': function (json) {
        return <CustomImage json={json} />;
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
        return <Line {...obj} />;
    },
    'svg': function (json) {
        console.log(json);
        return <Image />
    }
}


const CustomImage = (props) => {
    var [imageObj] = useImage(`https://konva.s3.ap-south-1.amazonaws.com/resources/${props.json.src}.png`);
    console.log(props)
    var obj = {
        x: props.json.frame.x,
        y: props.json.frame.y,
        height: props.json.frame.height,
        width: props.json.frame.width,
        image: imageObj,
    }
    for (let index in props.json.style.border) {
        obj['stroke'] = getColor(props.json.style.border[index].color.value);
    }
    console.log(obj);
    return (<Image {...obj} />);
}

export { parseJson };