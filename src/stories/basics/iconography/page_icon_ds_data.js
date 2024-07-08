const images = require.context('/src/assets/icons/icons/svgmap', true);

let imageList = {}
let fileName
let svgString
let svgListDs = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    fileName = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    let substring = "-ds"
    if(fileName.includes(substring)){
    svgListDs[fileName] = "./icons/icons/svgmap.min.svg#"+fileName
    }
}

export default svgListDs;