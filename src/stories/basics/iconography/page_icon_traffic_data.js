const images = require.context('/src/assets/icons/traffic/svgmap', true);

let imageList = {}
let file
let svgListTraffic = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    file = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgListTraffic[file] = file
}

export default svgListTraffic;