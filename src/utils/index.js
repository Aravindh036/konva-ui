// import React from 'react';
// import { getColor } from './helper';
// import useImage from 'use-image';
// import { Layer, Group } from 'react-konva';
// import CustomImage from './CustomImage';
// import Rectangle from './Rectangle';
// import CustomCircle from './CustomCircle';
// import CustomPath from './CustomPath';
// import CustomText from './CustomText';
// import CustomLine from './CustomLine';
// import CustomSVG from './CustomSVG';
var alteredJSON = null;

function assignJSON(json){
    alteredJSON = json;
}

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

// function parseJson(json) {
//     var result = [], j = 0;
//     for (var i of json) {
//         j++;
//         result.push({
//             layer: label[i.tag](i),
//             data: {
//                 height: i.frame.height,
//                 width: i.frame.width
//             }
//         });
//     }
//     // console.log(result, j);
//     if (alteredJSON == null) {
//         alteredJSON = json;
//     }
//     return [result, j];
// }

// const label = {
//     'artboard': function (json) {
//         var layersArray = [];
//         for (var layers of json.layers) {
//             layersArray.push(label[layers.tag](layers));
//         }
//         return <Layer
//             key={json.frame.id}>
//             {layersArray}
//         </Layer>;
//     },
//     'group': function (json) {
//         var layersArray = [];
//         for (var layers of json.layers) {
//             layersArray.push(label[layers.tag](layers));
//             // console.log("in groupp", layers.tag);
//         }
//         layersArray = <Group key={json.id} x={parseInt(json.frame.x.toFixed(2))} y={parseInt(json.frame.y.toFixed(2))} >
//             {layersArray}
//         </Group>;
//         // console.log(layersArray);
//         return layersArray;
//     },
//     'rectangle': function (json) {
//         return <Rectangle isSelected={true} json={json} />
//     },
//     'circle': function (json) {
//         return <CustomCircle json={json} />
//     },
//     'path': function (json) {
//         return <CustomPath json={json} />
//     },
//     'text': function (json) {
//         return <CustomText json={json} />
//     },
//     'image': function (json) {
//         return <CustomImage key={json.id} json={json} />;
//     },
//     'line': function (json) {
//         return <CustomLine json={json} />
//     },
//     'svg': function (json) {
//         return <CustomSVG  json={json}/>
//     }
// }




export { getJson, updatePositionJson,assignJSON };