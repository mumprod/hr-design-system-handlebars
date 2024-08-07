const images = require.context('/src/assets/icons/epg/svgmap', true);

let imageList = {}
let file
let svgListEpg = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    file = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgListEpg[file] = file
}

export default svgListEpg;