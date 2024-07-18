const images = require.context('/src/assets/icons/404/svgmap', true);

let imageList = {}
let file
let svgList404 = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    file = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgList404[file] = file
}

export default svgList404;