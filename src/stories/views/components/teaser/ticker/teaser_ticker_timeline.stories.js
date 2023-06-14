import timelineJson from '../fixtures/teaser_ticker_timeline.json'

const handlebars = require('hrHandlebars')

const timelineOnBlue = (args) => {
    let hbsTemplate = handlebars.compile(`
    <div class="bg-blue-congress pt-5">
        {{> components/teaser/ticker/teaser_ticker_timeline _color="white"}}
    </div>
  `)
    return hbsTemplate({ ...args })
}

const timelineOnWhite = (args) => {
    let hbsTemplate = handlebars.compile(`
    <div class="pt-5">
        {{> components/teaser/ticker/teaser_ticker_timeline }}
    </div>
  `)
    return hbsTemplate({ ...args })
}

export default {
    title: 'Komponenten/Teaser/Ticker/Komponenten',

    argTypes: {
        '_color': {
            description: 'Text- und Linienfarbe',
            control: false,
        },
    }
}

export const TimelineWhite = {
    render: timelineOnBlue.bind({}),
    name: 'Zeitstrahl auf blau',
    args: timelineJson,
}

export const TimelineBlack = {
    render: timelineOnWhite.bind({}),
    name: 'Zeitstrahl auf weiß',
    args: timelineJson,
}
