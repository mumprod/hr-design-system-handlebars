import structureNav from './structureNav.hbs'
import structureNavData from './../fixtures/structureNav.json'

const TemplateStructureNav = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand = undefined !== theme ? theme : 'hessenschau'       
    return structureNav({ brand, ...args })
}

export default {
    title: 'Komponenten/Banner/StructureNav',
    argTypes: {},

    parameters: {
        layout: 'fullscreen',
        docs: {
            inlineStories: false,
            iframeHeight: 400,
        },
    },
}

export const Seitenfooter = {
    render: TemplateStructureNav.bind({}),
    name: 'StructureNav',
    args: structureNavData
  
}