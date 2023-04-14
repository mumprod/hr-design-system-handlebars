import teaser from './teaser_indextext.hbs'
import dataTeserIndextext100Accented from './fixtures/teaser_indextext_100_accented.json'
import dataTeserIndextext100Boxed from './fixtures/teaser_indextext_100_boxed.json'
import dataTeserIndextext100Highlighted from './fixtures/teaser_indextext_100_highlighted.json'
import dataTeserIndextext50Accented from './fixtures/teaser_indextext_50_accented.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaser({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Indextext',

    parameters: {
        layout: 'fullscreen',
    },

    argTypes: {
        teaserSize: {
            control: {
                type: 'select',
                options: ['50', '100'],
            },

            description: 'Teaser Größe',

            table: {
                defaultValue: {
                    summary: '100',
                },
            },
        },

        teasertype: {
            control: {
                type: 'select',
                options: ['accented', 'boxed', 'highlighted'],
            },

            description: 'Teaser Typ',

            table: {
                defaultValue: {
                    summary: 'accented',
                },
            },
        },
    },

    decorators: [
        (Story) => {
            return `<div class="grid grid-page"><div class="grid grid-cols-12 py-6 col-full gap-x-6 gap-y-6 sm:px-9.5 sm:col-main">  
             ${Story()} 
             </div></div>`
        },
    ],
}

export const TextMitHintergrund100 = {
    render: Template.bind({}),
    name: 'Text mit Hintergrund 100',
    args: dataTeserIndextext100Accented.logicItem.includeModel,
}

export const TextMitBox100 = {
    render: Template.bind({}),
    name: 'Text mit Box 100',
    args: dataTeserIndextext100Boxed.logicItem.includeModel,
}

export const HintergrundOrange100 = {
    render: Template.bind({}),
    name: 'Hintergrund orange 100',
    args: dataTeserIndextext100Highlighted.logicItem.includeModel,
}

export const TextMitHintergrund50 = {
    render: Template.bind({}),
    name: 'Text mit Hintergrund 50',
    args: dataTeserIndextext50Accented.logicItem.includeModel,
}
