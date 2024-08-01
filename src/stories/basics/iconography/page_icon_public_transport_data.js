const images = require.context('/src/assets/icons/publictransport/svgmap', true);

let imageList = {}
let file
let svgListPublicTransport = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    file = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgListPublicTransport[file] = file
}

export default svgListPublicTransport;