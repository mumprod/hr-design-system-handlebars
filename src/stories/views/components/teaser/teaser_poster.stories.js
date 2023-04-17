import teaser from './teaser_poster.hbs'
import teserPosterLg from './fixtures/teaser_poster_lg.json'
import teserPosterMd from './fixtures/teaser_poster_md.json'
import teserPosterMdLabel from './fixtures/teaser_poster_md_label.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaser({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Poster',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            diffThreshold: 0.5,
        },
    },

    argTypes: {
        teaserSize: {
            control: {
                type: 'select',
                options: ['50', '33'],
            },

            description: 'Teaser Größe',

            table: {
                defaultValue: {
                    summary: '50',
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

export const Poster50 = {
    render: Template.bind({}),
    name: 'Poster 50',
    args: teserPosterLg.logicItem.includeModel,
}

export const Poster33 = {
    render: Template.bind({}),
    name: 'Poster 33',
    args: teserPosterMd.logicItem.includeModel,
}

export const Poster33MitLabel = {
    render: Template.bind({}),
    name: 'Poster 33 mit Label',
    args: teserPosterMdLabel.logicItem.includeModel,
}
