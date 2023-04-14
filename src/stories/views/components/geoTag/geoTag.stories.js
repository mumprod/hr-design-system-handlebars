import geoTag from './geoTag.hbs'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${geoTag}</div>`;
    return geoTag({ ...args })
}

export default {
    title: 'Komponenten/Ortsmarke',

    argTypes: {
        _text: {
            control: 'text',
            description: 'Beschriftung der Ortsmarke',
        },
    },

    decorators: [
        (Story) => {
            return `<div class="relative py-8">  
             ${Story()} 
             </div>`
        },
    ],
}

export const Frankfurt = {
    render: Template.bind({}),
    name: 'Frankfurt',

    args: {
        _text: 'Frankfurt',
    },
}
