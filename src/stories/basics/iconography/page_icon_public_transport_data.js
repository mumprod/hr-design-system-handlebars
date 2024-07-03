const images = require.context('./icons/icons', true);

let imageList = {}
let fileName
let svgString
let svgList = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    fileName = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgList[fileName] = "./icons/icons/svgmap.min.svg#"+fileName
}

export default svgList;