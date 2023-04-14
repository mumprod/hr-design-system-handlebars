import tailwindConfig from 'tailwindConfig'
const colorVariables = Object.entries(tailwindConfig.theme.extend.colors).filter(
    ([key, value]) => typeof value === 'string' && value.match(/^var/)
)
let brands = [
    'hr',
    'hessenschau',
    'hr1',
    'hr2',
    'hr3',
    'hr4',
    'you-fm',
    'hr-inforadio',
    'hr-fernsehen',
    'hr-rundfunkrat',
    'hr-werbung',
    'hr-bigband',
    'hr-sinfonieorchester',
]
let shortcuts = [
    'hr',
    'hs',
    'hr1',
    'hr2',
    'hr3',
    'hr4',
    'youfm',
    'hrInfo',
    'hr-FS',
    'hr-RR',
    'hr-W',
    'hr-BB',
    'hr-SO',
]
let colorsMap = {}
colorVariables.forEach(([key, value]) => {
    let colors = []
    colors.push(value)
    colorsMap[key] = colors
})

export default colorsMap
