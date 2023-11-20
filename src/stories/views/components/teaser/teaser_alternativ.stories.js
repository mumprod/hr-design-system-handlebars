import { addLabel, removeLabel, changeTeaserSize } from './labelHelper'
import { addCommentLink } from './jsonHelper'
import teaser from './teaser_alternativ.hbs'
import heroTeaser from './fixtures/teaser_alternative_hero_serif.json'
import heroTeaserWithLabel from './fixtures/teaser_alternative_hero_serif_label.json'
import heroTeaserWithComments from './fixtures/teaser_alternative_hero_serif_comments.json'
import heroTeaserLink from './fixtures/teaser_alternative_hero_serif_link.json'
import heroTeaserProgram from './fixtures/teaser_alternative_hero_serif_program.json'
import teaser100Link from './fixtures/teaser_alternative_100_serif_link.json'
import teaser100 from './fixtures/teaser_alternative_100_serif.json'
import teaser100FeaturedContent from './fixtures/teaser_alternative_100_serif_featured_content.json'
import teaser50 from './fixtures/teaser_alternative_50_serif.json'
import teaser50WithoutTeaserImage from './fixtures/teaser_alternative_without_teaserimage_50_serif.json'
import teaser50Link from './fixtures/teaser_alternative_50_serif_link.json'
import teaser50Download from './fixtures/teaser_alternative_50_serif_download.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaser({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Alternativ',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 1024],
            diffThreshold: 0.5,
        },
    },

    argTypes: {
        teaserSize: {
            control: {
                type: 'select',
                options: ['hero', '100', '50'],
            },

            description: 'Teaser Größ',

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

export const AlternativHero = {
    render: Template.bind({}),
    name: 'Alternativ Hero',
    args: heroTeaser.logicItem.includeModel,
}

export const AlternativHeroMitKommentaren = {
    render: Template.bind({}),
    name: 'Alternativ Hero mit Kommentaren',
    args: heroTeaserWithComments.logicItem.includeModel,
}

export const AlternativHeroMitLabel = {
    render: Template.bind({}),
    name: 'Alternativ Hero mit Label',
    args: heroTeaserWithLabel.logicItem.includeModel,
}

export const AlternativHeroMitExternenLinkDokument = {
    render: Template.bind({}),
    name: 'Alternativ Hero mit externen Link Dokument',
    args: heroTeaserLink.logicItem.includeModel,
}

export const AlternativHeroMitSendungsdokument = {
    render: Template.bind({}),
    name: 'Alternativ Hero mit Sendungsdokument',
    args: heroTeaserProgram.logicItem.includeModel,
}

export const Alternativ100 = {
    render: Template.bind({}),
    name: 'Alternativ 100',
    args: teaser100.logicItem.includeModel,
}

export const Alternativ100MitExternemLink = {
    render: Template.bind({}),
    name: 'Alternativ 100 mit externem Link',
    args: teaser100Link.logicItem.includeModel,
}

export const Alternativ100MitFeaturedContent = {
    render: Template.bind({}),
    name: 'Alternativ 100 mit Zeilenteaser',
    args: teaser100FeaturedContent,
}

export const Alternativ50 = {
    render: Template.bind({}),
    name: 'Alternativ 50',
    args: teaser50.logicItem.includeModel,
}

export const Alternativ50OhneTeaserbild = {
    render: Template.bind({}),
    name: 'Alternativ 50 ohne Teaserbild',
    args: teaser50WithoutTeaserImage.logicItem.includeModel,
}

export const Alternativ50MitExternemLink = {
    render: Template.bind({}),
    name: 'Alternativ 50 mit externem Link',
    args: teaser50Link.logicItem.includeModel,
}

export const Alternativ50MitDownload = {
    render: Template.bind({}),
    name: 'Alternativ 50 mit Download',
    args: teaser50Download.logicItem.includeModel,
}
