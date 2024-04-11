import story_template from './social_sharing_compact.hbs'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${topline}</span>`;
    return story_template({ ...args })
}

export default {
    title: 'Komponenten/Social Sharing',
}

export const Default = {
    render: Template.bind({}),
    name: 'Social Sharing Kompakt',
    parameters: {
    },
    decorators: [
        (Story) => {
            return `<div class="w-full mt-40 h-[500rem]">  
             ${Story()} 
             </div>`
        },
    ],
}
