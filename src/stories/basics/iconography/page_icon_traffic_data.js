const images = require.context('/src/assets/icons/traffic/svgmap', true);

let imageList = {}
let fileName
let svgString
let svgListTraffic = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    fileName = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgListTraffic[fileName] = "./icons/traffic/svgmap.min.svg#"+fileName
}

export default svgListTraffic;