const images = require.context('/src/assets/icons/weather/svgmap', true);

let imageList = {}
let file
let svgListWeather = {}
imageList = images.keys();

for(let i=0; i < imageList.length; i++){
    file = imageList[i].replace(/^.*[\\/]/, '').slice(0,-4)
    svgListWeather[file] = file
}

export default svgListWeather;