import structureNav from './structure_nav.hbs'
import structureNavData from '../fixtures/structureNav.json'

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
        chromatic: {
            viewports: [360, 768, 1024],
        },
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