import appBanner from './appBanner.hbs'

const Template = ({ ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${appBanner}</div>`;
    return appBanner({ ...args })
}

export default {
    title: 'Komponenten/App Banner',

    argTypes: {
        _text: {
            control: 'text',
            description: 'Beschriftung der Ortsmarke',
        },
    },

    decorators: [
        (Story) => {
            return `${Story()}`
        },
    ],
}

export const AppBanner = {
    render: Template.bind({}),
    name: 'AppBanner',

    args: {
        _text: 'AppBanner',
    },
}
