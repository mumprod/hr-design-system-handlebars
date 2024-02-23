import teaser from './teaser_standard.hbs'
import teaserHeroSerifWithLabel from './fixtures/teaser_standard_hero_serif_label.json'
import teaserHeroSerifWithComments from './fixtures/teaser_standard_hero_serif_comments.json'
import teaserHeroLink from './fixtures/teaser_standard_hero_serif_link.json'
import teaserHeroSerif from './fixtures/teaser_standard_hero_serif.json'
import teaser100Serif from './fixtures/teaser_standard_100_serif.json'
import teaser50Serif from './fixtures/teaser_standard_50_serif.json'
import teaser50SerifWithoutTeaserImage from './fixtures/teaser_standard_without_teaserimage_50_serif.json'
import teaser50SerifFeaturedContent from'./fixtures/teaser_standard_50_serif_featured_content'
import teaser33Serif from './fixtures/teaser_standard_33_serif.json'
import teaser25Serif from './fixtures/teaser_standard_25_serif.json'
import teaser25SerifWithoutTeaserimage from './fixtures/teaser_standard_without_teaserimage_25_serif.json'
import teaser100Download from './fixtures/teaser_standard_100_serif_download.json'
import teaser100Link from './fixtures/teaser_standard_100_serif_link.json'
import teaser100Program from './fixtures/teaser_standard_100_serif_program.json'
import teaser50Link from './fixtures/teaser_standard_50_serif_link.json'
import teaser33Link from './fixtures/teaser_standard_33_serif_link.json'
import teaser25Link from './fixtures/teaser_standard_25_serif_link.json'
import teaser33LongGeotag from './fixtures/teaser_standard_33_long_geotag.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaser({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Standard',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 1024],
            diffThreshold: 0.3,
        },
    },

    argTypes: {
        teaserSize: {
            control: {
                type: 'select',
                options: ['hero', '100', '50', '33', '25'],
            },

            description: 'Teaser Größe',

            table: {
                defaultValue: {
                    summary: 'hero',
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

export const StandardHero = {
    render: Template.bind({}),
    name: 'Standard Hero',
    args: teaserHeroSerif.logicItem.includeModel,
}

export const StandardHeroMitLabel = {
    render: Template.bind({}),
    name: 'Standard Hero mit Label',
    args: teaserHeroSerifWithLabel.logicItem.includeModel,
}

export const StandardHeroMitKommentaren = {
    render: Template.bind({}),
    name: 'Standard Hero Mit Kommentaren',
    args: teaserHeroSerifWithComments.logicItem.includeModel,
}

export const StandardHeroMitExternemLink = {
    render: Template.bind({}),
    name: 'Standard Hero mit externem Link',
    args: teaserHeroLink.logicItem.includeModel,
}

export const Standard100 = {
    render: Template.bind({}),
    name: 'Standard 100',
    args: teaser100Serif.logicItem.includeModel,
}

export const Standard100MitExternemLink = {
    render: Template.bind({}),
    name: 'Standard 100 mit externem Link',
    args: teaser100Link.logicItem.includeModel,
}

export const Standard100MitSendungsdokument = {
    render: Template.bind({}),
    name: 'Standard 100 mit Sendungsdokument',
    args: teaser100Program.logicItem.includeModel,
}

export const Standard50 = {
    render: Template.bind({}),
    name: 'Standard 50',
    args: teaser50Serif.logicItem.includeModel,
}

export const Standard50OhneTeaserbild = {
    render: Template.bind({}),
    name: 'Standard 50 ohne Teaserbild',
    args: teaser50SerifWithoutTeaserImage.logicItem.includeModel,
}

export const Standard50MitExternemLink = {
    render: Template.bind({}),
    name: 'Standard 50 mit externem Link',
    args: teaser50Link.logicItem.includeModel,
}

export const Standard50MitFeaturedContent = {
    render: Template.bind({}),
    name: 'Standard 50 mit Zeilenteaser',
    args: teaser50SerifFeaturedContent,
}

export const Standard33 = {
    render: Template.bind({}),
    name: 'Standard 33',
    args: teaser33Serif.logicItem.includeModel,
}

export const Standard33MitExternemLink = {
    render: Template.bind({}),
    name: 'Standard 33 mit externem Link',
    args: teaser33Link.logicItem.includeModel,
}

export const Standard25 = {
    render: Template.bind({}),
    name: 'Standard 25',
    args: teaser25Serif.logicItem.includeModel,
}

export const Standard25OhneTeaserbild = {
    render: Template.bind({}),
    name: 'Standard 25 ohne Teaserbild',
    args: teaser25SerifWithoutTeaserimage.logicItem.includeModel,
}

export const Standard25MitExternemLink = {
    render: Template.bind({}),
    name: 'Standard 25 mit externem Link',
    args: teaser25Link.logicItem.includeModel,
}

export const Standard100MitDownload = {
    render: Template.bind({}),
    name: 'Standard 100 Mit Download',
    args: teaser100Download.logicItem.includeModel,
}

export const Standard33MitLangerOrtsmarke = {
    render: Template.bind({}),
    name: 'Standard 33 mit langer Ortsmarke',
    args: teaser33LongGeotag.logicItem.includeModel,
}
