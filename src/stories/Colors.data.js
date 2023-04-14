import tailwindConfig from 'tailwindConfig'
const colorGroups = Object.entries(tailwindConfig.theme.extend.colors).filter(
    ([key, value]) => typeof value === 'object'
)
const testColors = ['#f11d11', '#000']
const colorGroupsJson = JSON.stringify(colorGroups)
colorGroups.map((value, index) => {
    value.map((token, i) => {
        console.log(token)
    })
})
let colorsMap = {}
colorGroups.forEach(([key, value]) => {
    let colors = []
    Object.entries(value).forEach(([innerKey, value]) => {
        colors.push(value)
    })
    colorsMap[key] = colors
})

export default colorsMap
