const images = require.context('./images', true);

let imageList = {}
let fileName
let svgString
let svgList = []
imageList = images.keys().map(image => images(image));
for(let i=0; i < imageList.length; i++){
    fileName = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgString = "<svg class='svg-item' viewBox='0 0 100 100' width='100px' height='100px'><use xlink:href='./icons/icons/svgmap.min.svg#"+fileName+"'></use></svg>"
    svgList.push(svgString)
}
console.log(svgList)
export default svgList;