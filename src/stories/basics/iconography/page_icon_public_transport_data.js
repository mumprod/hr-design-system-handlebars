const images = require.context('/src/assets/icons/publictransport/svgmap', true);

let imageList = {}
let fileName
let svgString
let svgListPublicTransport = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    fileName = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgListPublicTransport[fileName] = "./icons/publictransport/svgmap.min.svg#"+fileName
}

export default svgListPublicTransport;