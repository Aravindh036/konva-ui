function getColor(color) {
    return color.visible ? `rgba(${color.red},${color.green},${color.blue},${color.alpha})` : null;
}

function getPath(data) {
    var result = "",points;
    for(var index in data.path){
        // console.log(data.path[index],"type:",data.path[index].type);
        result+= data.path[index].type;
        points = data.path[index].points.map((i)=>{
            i = i.map(j=>{
                return parseInt(j.toFixed(6));
            })
            return i;
        })
        for(var i in points){
            result += points[i].join(",");
        }
    }
    // console.log(result);
    return result;
}

export { getColor,getPath };