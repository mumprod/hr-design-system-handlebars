import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from 'components/teaser/fixtures/teaser_ticker_timeline.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['on_blue'] = handlebars.compile(`
    <div class="bg-blue-congress-hex pt-5">
        {{> components/teaser/ticker/teaser_ticker_timeline _color="white"}}
    </div>  
  `)

hbsTemplates['on_white'] = handlebars.compile(`
    <div class="pt-5">
        {{> components/teaser/ticker/teaser_ticker_timeline }}
    </div> 
  `)





const timelineOnBlue = (args) => {
    return hbsTemplates['on_blue']({ ...args })
}

const timelineOnWhite = (args) => {
    return hbsTemplates['on_white']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Teaser/Ticker/Komponenten',

    parameters: {
        chromatic: {
            diffThreshold: 0.3,
            disableSnapshot: true
        },
    },
    argTypes: {
        _color: {
            description: 'Text- und Linienfarbe',
            control: false,
        },
    },
}

export const TimelineWhite = {
    render: timelineOnBlue.bind({}),
    name: 'Zeitstrahl auf blau',
    args: fixtures.on_blue.args,
}

export const TimelineBlack = {
    render: timelineOnWhite.bind({}),
    name: 'Zeitstrahl auf weiß',
    args: fixtures.on_white.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',

    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}
