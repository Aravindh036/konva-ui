import React from 'react';
import { Image, Transformer } from 'react-konva';
import { updatePositionJson } from './index';

const CustomSVG = ({ isSelected, onSelect, json }) => {
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
    return (
        <React.Fragment>
            <Image key={json.id}
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

export default CustomSVG;