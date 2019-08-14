import React from 'react';
import { getColor } from './helper';
import { Rect, Transformer } from 'react-konva';
import { updatePositionJson } from './index';

const Rectangle = ({isSelected,onSelect,json}) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    React.useEffect(() => {
        console.log("rect",isSelected);
        if (isSelected) {
            // we need to attach transformer manually
            console.log(trRef);
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
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
    return (
        <React.Fragment>
            <Rect {...obj}
                ref={shapeRef}
                draggable
                onDragEnd={(e) => {
                    updatePositionJson(json.id, e.target.attrs.x, e.target.attrs.y)
                }}
                onTransformEnd={(e) => {
                    console.log(e)
                }}
                onClick={(e) => {
                    onSelect();
                    console.log(json.tag, 'selected',isSelected);
                }}
            />
            {isSelected && <Transformer ref={trRef} />}
        </React.Fragment>);
}

export default Rectangle;