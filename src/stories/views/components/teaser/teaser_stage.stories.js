import teaser from './teaser_stage.hbs'
import stageTeaserData from './fixtures/stage_teaser.json'
import stageTeaserWideData from './fixtures/stage_teaser_wide.json'
import stageTeaserDataWithEventtag from './fixtures/stage_teaser_eventtag.json'
import stageTeaserDataForProgram from './fixtures/stage_teaser_program.json'

const Template = (args, { globals: { customConditionalToolbar } }) => {
    // You can either use a function to create DOM elements or use a plain html string!
    // return `<div>${label}</div>`;
    let brand =
        undefined !== customConditionalToolbar ? customConditionalToolbar['brands'] : 'hessenschau'
    return teaser({ brand, ...args })
}

export default {
    title: 'Komponenten/Teaser/Stage',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 768, 1024],
            diffThreshold: 0.5,
        },
    },

    argTypes: {},

    decorators: [
        (Story) => {
            return `<div class="grid grid-page"><div class="col-full gap-x-6 gap-y-6">  
             ${Story()} 
             </div></div>`
        },
    ],
}

export const StageTeaser = {
    render: Template.bind({}),
    name: 'Stage Teaser',
    args: stageTeaserData,
}

export const StageTeaserWide = {
    render: Template.bind({}),
    name: 'Stage Teaser Wide',
    args: stageTeaserWideData,
}

export const StageTeaserWithEvent = {
    render: Template.bind({}),
    name: 'Stage Teaser with Event',
    args: stageTeaserDataWithEventtag,
}

export const StageTeaserProgram = {
    render: Template.bind({}),
    name: 'Stage Teaser Program',
    args: stageTeaserDataForProgram,
}
