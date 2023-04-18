import titleComponent from './teaser_title.hbs'

const Template = ({ _text, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<span>${title}</span>`;
    return titleComponent({ _text, ...args })
}

export default {
    title: 'Komponenten/Teaser/Komponenten/Titel',

    argTypes: {
        _text: {
            control: 'text',
            description: 'Titel',
        },

        _size: {
            options: ['hero', '100', '50', '33', '25'],

            control: {
                type: 'select',
            },

            description: 'Größe der Überschrift',

            table: {
                defaultValue: {
                    summary: 'hero',
                },
            },
        },

        _fontVariant: {
            description: 'Schriftvariante',

            control: {
                type: 'inline-radio',
                options: ['serif', 'sans-serif'],
            },

            table: {
                defaultValue: {
                    summary: 'serif',
                },
            },
        },
    },
}

export const TitelSerifHero = {
    render: Template.bind({}),
    name: 'Titel Serif - Hero',

    args: {
        _text: 'Dies ist der Titel eines 100%-Teasers',
        _size: 'hero',
        _fontVariant: 'serif',
        _teaserType: 'standard',
    },
}

export const TitelSerifNormal = {
    render: Template.bind({}),
    name: 'Titel Serif - normal',

    args: {
        _text: 'Dies ist der Titel eines 66%-, 50%- oder 33%-Teasers',
        _size: '33',
        _fontVariant: 'serif',
        _teaserType: 'standard',
    },
}

export const TitelSerifSmall = {
    render: Template.bind({}),
    name: 'Titel Serif - small',

    args: {
        _text: 'Dies ist der Titel eines 25%-Teasers',
        _size: '25',
        _fontVariant: 'serif',
        _teaserType: 'standard',
    },
}
