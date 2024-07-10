const images = require.context('/src/assets/icons/weather/svgmap', true);

let imageList = {}
let fileName
let svgString
let svgListWeather = {}
imageList = images.keys().map(image => images(image));

for(let i=0; i < imageList.length; i++){
    fileName = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgListWeather[fileName] = "./icons/weather/svgmap.min.svg#"+fileName
}

export default svgListWeather;