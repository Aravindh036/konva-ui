import React from 'react';
import { getColor, getPath } from './helper';
import { Path, Transformer } from 'react-konva';
import { updatePositionJson } from './index';

const CustomPath = ({ isSelected, onSelect, json }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    React.useEffect(() => {
        // console.log("rect", isSelected);
        if (isSelected) {
            // we need to attach transformer manually
            // console.log(trRef);
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
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
        if ((json.style.backgroundColor[index].value.visible === true) && (json.style.backgroundColor[index].type === "solid")) {
            obj['fill'] = getColor(json.style.backgroundColor[index].value);
        }
        else if ((json.style.backgroundColor[index].value.visible === true) && (json.style.backgroundColor[index].type === "gradient")) {
            obj['fillLinearGradientStartPoint'] = {
                x: json.style.backgroundColor[index].value.startX*json.frame.width,
                y: json.style.backgroundColor[index].value.startY*json.frame.height
            };
            obj['fillLinearGradientEndPoint'] = {
                x: json.style.backgroundColor[index].value.stopX*json.frame.width,
                y: json.style.backgroundColor[index].value.stopY*json.frame.height
            };
            var colors =[];
            for(var color of json.style.backgroundColor[index].value.colors){
                colors.push(color.offset);
                colors.push(getColor(color.color));
            }
            // console.log(colors);
            obj['fillLinearGradientColorStops'] = colors;
        }
        // console.log("color",getColor(json.style.backgroundColor[index].value),json.style.backgroundColor[index]);
    }
    for (let index in json.style.shadow) {
        console.log("hello");
        if (json.style.shadow[index].color.visible === true)
            obj['shadowColor'] = getColor(json.style.shadow[index].color);
        obj['shadowOffsetX'] = json.style.shadow[index].x;
        obj['shadowOffsetY'] = json.style.shadow[index].y;
        obj['shadowBlur'] = json.style.shadow[index].s;
        obj['shadowOpacity'] = json.style.shadow[index].opacity;
    }
    if (json.style.shadow.length > 0) {
        console.log(json);
    }
    for (let index in json.style.border) {
        obj['strokeWidth'] = json.style.border[index].thickness;
        obj['stroke'] = getColor(json.style.border[index].color.value);
    }
    obj['opacity'] = parseInt(json.style.opacity);
    return (
        <React.Fragment>
            <Path {...obj}
                draggable
                ref={shapeRef}
                onDragEnd={(e) => {
                    updatePositionJson(json.id, e.target.attrs.x, e.target.attrs.y);
                    console.log(json);
                }}
                onClick={(e) => {
                    onSelect();
                    console.log(json.tag, 'selected');
                }} />
            {isSelected && <Transformer ref={trRef} />}

        </React.Fragment>
    );
}

export default CustomPath;