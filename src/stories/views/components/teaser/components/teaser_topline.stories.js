import topline from './teaser_topline.hbs'

const Template = ({ _text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${topline}</span>`;
    return topline({ _text, ...args })
}

export default {
    title: 'Komponenten/Teaser/Komponenten/Topline',

    argTypes: {
        _text: {
            control: 'text',
            description: 'Dachzeilentext',
        },
    },
}

export const Default = {
    render: Template.bind({}),
    name: 'default',

    args: {
        _text: 'Dies ist die Dachzeile',
    },
}
