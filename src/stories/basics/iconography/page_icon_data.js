const images = require.context('/src/assets/icons/icons/svgmap', true);

let imageList = {}
let file
let svgList = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    file = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    let substring = "-ds"
    if(!file.includes(substring)){
    svgList[file] = file
    }
}

export default svgList;