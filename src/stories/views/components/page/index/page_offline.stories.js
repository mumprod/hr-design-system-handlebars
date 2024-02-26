import page from './page_offline.hbs'

const Template = (args, { globals: { theme } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand = undefined !== theme ? theme : 'hessenschau' 
    return page({ brand, ...args })
}

export default {
    title: 'Seiten/Offline',
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

export const Default = {
    render: Template.bind({}),
    name: 'Offline Page',
    args: {},
}