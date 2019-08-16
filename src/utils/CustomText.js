import React from 'react';
import { getColor } from './helper';
import { Text, Transformer } from 'react-konva';
import { updatePositionJson } from './index';

const CustomText = ({ isSelected, onSelect, json }) => {
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
        ComponentKey: json.id,
        key: json.id,
        x: parseInt(json.frame.x.toFixed(2)),
        y: parseInt(json.frame.y.toFixed(2))+4,
    }
    // console.log("text", json);
    for (let index in json.style.format) {
        // console.log(json.style.format[index],json.string);
        obj['fontFamily'] = json.style.format[index].fontFamily;
        if (json.style.format[index].fontStyle === "ExtraBold")
            obj['fontStyle'] = 1000;
        else if ((json.style.format[index].fontStyle !== "Light") && ((json.style.format[index].fontStyle !== "Medium")))
            // obj['fontStyle'] = json.style.format[index].fontStyle;
        obj['fontSize'] = json.style.format[index].fontSize;
    }
    obj['fill'] = getColor(json.color[0].value);
    obj['text'] = json.string;
    // console.log(obj,json.string,json);
    return (
        <React.Fragment>
            <Text {...obj}
                ref={shapeRef}
                draggable
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

export default CustomText;