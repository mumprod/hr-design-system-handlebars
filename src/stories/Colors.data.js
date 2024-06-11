import tailwindConfig from 'tailwindConfig'
const colorGroups = Object.entries(tailwindConfig.theme.extend.colors).filter(
    ([key, value]) => typeof value === 'object'
)
let colorsMap = {}
colorGroups.forEach(([key, value]) => {
    let colors = {}
    Object.entries(value).forEach(([innerKey, value]) => {
        if (typeof value === 'object') {
            colors[innerKey] = value.hex
        } else {
            colors[innerKey] = value
        }
    })
    colorsMap[key] = colors
})

export default colorsMap

