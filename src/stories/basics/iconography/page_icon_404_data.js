const images = require.context('/src/assets/icons/404/svgmap', true);

let imageList = {}
let fileName
let svgString
let svgList404 = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    fileName = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgList404[fileName] = "./icons/404/svgmap.min.svg#"+fileName
}

export default svgList404;