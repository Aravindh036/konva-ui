import React from 'react';
import { getColor, getPath } from './helper';
import { Path,Transformer } from 'react-konva';
import { updatePositionJson } from './index';

const CustomPath = ({ isSelected, onSelect, json }) => {
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