import teaserHeading from './teaser_heading.hbs'

const Template = ({ _topline, ...args }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    return teaserHeading({ _topline, ...args })
}

export default {
    title: 'Komponenten/Teaser/Komponenten/Teaserheading',

    argTypes: {
        _topline: {
            control: 'text',
            description: 'Text der Dachzeile',
        },

        _title: {
            control: 'text',
            description: 'Text der Überschrift',
        },

        _headlineTag: {
            control: {
                type: 'select',
                options: ['span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            },

            description: 'HTML-Tag der Überschrift',

            table: {
                defaultValue: {
                    summary: 'span',
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
    },
}

export const SerifHero = {
    render: Template.bind({}),
    name: 'Serif Hero',

    parameters: {
        docs: {
            source: {
                code: ``,
            },
        },
    },

    args: {
        _topline: 'Das ist eine wirklich sehr lange Topline',
        _title: 'Das ist eine wirklich sehr lange Headline',
        _extendedTitle: 'Das ist ein erweiterter Titel',
        _headlineTag: 'h1',
        _fontVariant: 'serif',
        _size: 'hero',
        _teaserType: 'standard',
    },
}

export const Serif50 = {
    render: Template.bind({}),
    name: 'Serif 50',

    parameters: {
        docs: {
            source: {
                code: ``,
            },
        },
    },

    args: {
        _topline: 'Das ist eine wirklich sehr lange Topline',
        _title: 'Das ist eine wirklich sehr lange Headline',
        _headlineTag: 'h1',
        _fontVariant: 'serif',
        _size: '50',
        _teaserType: 'standard',
    },
}

export const Serif33 = {
    render: Template.bind({}),
    name: 'Serif 33',

    parameters: {
        docs: {
            source: {
                code: ``,
            },
        },
    },

    args: {
        _topline: 'Das ist eine wirklich sehr lange Topline',
        _title: 'Das ist eine wirklich sehr lange Headline',
        _headlineTag: 'h1',
        _fontVariant: 'serif',
        _size: '33',
        _teaserType: 'standard',
    },
}

export const Serif25 = {
    render: Template.bind({}),
    name: 'Serif 25',

    parameters: {
        docs: {
            source: {
                code: ``,
            },
        },
    },

    args: {
        _topline: 'Das ist eine wirklich sehr lange Topline',
        _title: 'Das ist eine wirklich sehr lange Headline',
        _headlineTag: 'h1',
        _fontVariant: 'serif',
        _size: '25',
        _teaserType: 'standard',
    },
}
