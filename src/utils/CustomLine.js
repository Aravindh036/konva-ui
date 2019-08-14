import React from 'react';
import { getColor } from './helper';
import { Line, Transformer } from 'react-konva';
import { updatePositionJson } from './index';

const CustomLine = ({ isSelected, onSelect, json }) => {
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
    return (
        <React.Fragment>
            <Line {...obj}
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

export default CustomLine;