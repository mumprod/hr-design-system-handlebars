const images = require.context('./icons/ds', true);

let imageList = {}
let fileName
let svgString
let svgListDs = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    fileName = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgListDs[fileName] = "./icons/icons/svgmap.min.svg#"+fileName
}

export default svgListDs;