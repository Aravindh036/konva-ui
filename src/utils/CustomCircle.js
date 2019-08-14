import React from 'react';
import { getColor } from './helper';
import { Circle, Transformer } from 'react-konva';
import { updatePositionJson } from './index';

const CustomCircle = ({ isSelected, onSelect, json }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    React.useEffect(() => {
        console.log("rect", isSelected);
        if (isSelected) {
            // we need to attach transformer manually
            console.log(trRef);
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
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
    return (
        <React.Fragment>
            <Circle {...obj}
                draggable
                ref={shapeRef}
                onDragEnd={(e) => {
                    updatePositionJson(json.id, e.target.attrs.x, e.target.attrs.y);
                    console.log(json);
                }}
                onClick={(e) => {
                    onselect();
                    console.log(json.tag, 'selected');
                }} />
            {isSelected && <Transformer ref={trRef} />}
        </React.Fragment>
    );
}

export default CustomCircle;