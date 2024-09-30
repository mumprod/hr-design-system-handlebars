import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/teaser_stage.json'

import teaser from './teaser_stage.hbs'
import stageTeaserData from './fixtures/stage_teaser.json'
import stageTeaserWideData from './fixtures/stage_teaser_wide.json'
import stageTeaserDataWithEventtag from './fixtures/stage_teaser_eventtag.json'
import stageTeaserDataForProgram from './fixtures/stage_teaser_program.json'


const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
    {{> components/teaser/teaser_stage }}   
  `)


const Template = (args) => {
    return hbsTemplates['default']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Stage',

    parameters: {
        layout: 'fullscreen',

        chromatic: {
            viewports: [360, 768, 1024],
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },

    argTypes: {},

    decorators: [
        (Story) => {
            return `<div class="grid grid-page">  
             ${Story()} 
             </div>`
        },
    ],
}

export const StageTeaser = {
    render: Template.bind({}),
    name: 'Stage Teaser',
    decorators: [
        (Story) => {
            return `<div class="col-full gap-x-6 gap-y-6">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.stage.args
}

export const StageTeaserWide = {
    render: Template.bind({}),
    name: 'Stage Teaser Wide',
    decorators: [
        (Story) => {
            return `<div class="col-full gap-x-6 gap-y-6">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.stage_wide.args,
}

export const StageTeaserWithEvent = {
    render: Template.bind({}),
    name: 'Stage Teaser with Event',
    decorators: [
        (Story) => {
            return `<div class="col-full gap-x-6 gap-y-6">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.stage_with_eventtag.args,
}

export const StageTeaserProgram = {
    render: Template.bind({}),
    name: 'Stage Teaser Program',
    decorators: [
        (Story) => {
            return `<div class="col-full gap-x-6 gap-y-6">  
             ${Story()} 
             </div>`
        },
    ],
    args: fixtures.stage_with_program.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',
    decorators: [
        (Story) => {
            return `<div class="col-full gap-x-6 gap-y-6">  
             ${Story()} 
             </div>`
        },
    ],

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
