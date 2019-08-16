import React from 'react';
import { updatePositionJson } from './index';
import { getColor } from './helper';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';


const CustomImage = ({ isSelected, onSelect, json }) => {
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
    var [imageObj] = useImage(`https://konva.s3.ap-south-1.amazonaws.com/resources/${json.src}.png`);
    // console.log(
    var obj = {
        ComponentKey: json.id,
        key: json.id,
        x: json.frame.x,
        y: json.frame.y,
        height: json.frame.height,
        width: json.frame.width,
        image: imageObj,
    }
    for (let index in json.style.border) {
        obj['stroke'] = getColor(json.style.border[index].color.value);
    }
    // console.log(obj);
    return (
        <React.Fragment>
            <Image {...obj}
                draggable
                ref={shapeRef}
                onDragEnd={(e) => {
                    updatePositionJson(json.id, e.target.attrs.x, e.target.attrs.y);
                    console.log(json);
                }}
                onTransformEnd={(e) => {
                    console.log(e);
                }}
                onClick={(e) => {
                    onSelect();
                    console.log(json.tag, 'selected', isSelected);
                }} />
            {isSelected && <Transformer ref={trRef} />}
        </React.Fragment>
    );
}


export default CustomImage;