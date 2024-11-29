import { getSnapshotsTemplate } from '/src/assets/js/utils.js'
import fixtures from './fixtures/voting.json'

const handlebars = require('hrHandlebars')
const hbsTemplates = []
hbsTemplates['default'] = handlebars.compile(`
  {{> components/voting/voting }}   
`)

hbsTemplates['result'] = handlebars.compile(`
    {{#>components/forms/components/backgroundBox  }}  
        {{> components/voting/voting_result this
                _isInline=true 
                _statusDone=true 
                _hideVotingResult=false
                _resultBoxMessageText="Danke für Ihre Abstimmung!"
        }}       
    {{/components/forms/components/backgroundBox }}  
`)

hbsTemplates['success'] = handlebars.compile(`
    {{#>components/forms/components/backgroundBox  }}  
        {{> components/voting/voting_result this  
                _statusDone=true  
                _resultBoxMessageTitle="Vielen Dank für Ihre Stimme." 
                _resultBoxMessageText="Eine E-Mail zur Bestätigung Ihrer Abstimmung wurde Ihnen geschickt. Bitte prüfen Sie gegebenenfalls auch Ihren Spam-Ordner."
        }}    
    {{/components/forms/components/backgroundBox }}  
`)

hbsTemplates['error'] = handlebars.compile(`
    {{#>components/forms/components/backgroundBox  }}  
        {{> components/voting/voting_result this 
                _isInline=true 
                _statusDone=false 
                _hideVotingResult=true 
                _showBackButton=true  
                _resultBoxMessageTitle="Das hat leider nicht geklappt!" 
                _resultBoxMessageText="Ihre Stimme konnte nicht gezählt werden, weil ein Fehler aufgetreten ist. Bitte versuchen Sie es später wieder."
        }}
    {{/components/forms/components/backgroundBox }}  
`)

const TemplateVoting = (args) => {
    return hbsTemplates['default']({ ...args })
}

const TemplateResult = (args) => {
    return hbsTemplates['result']({ ...args })
}

const TemplateSuccess = (args) => {
    return hbsTemplates['success']({ ...args })
}

const TemplateError = (args) => {
    return hbsTemplates['error']({ ...args })
}

const snapshotTemplate = (args) => {
    return getSnapshotsTemplate({ hbsTemplates, args })
}

export default {
    title: 'Komponenten/Voting',
    argTypes: {},
    decorators: [
        (Story) => {
            return `<div class="grid grid-page">
                        <div class="grid bg-white grid-article">
                            ${Story()}
                        </div>
                    </div>`
        },
    ],
    parameters: { 
        layout: 'fullscreen',
        chromatic: { disableSnapshot: true }
    }
}

export const Default = {
    render: TemplateVoting.bind({}),
    name: 'Einfachauswahl',
    args: fixtures.voting.args,
}

export const Voting_horizontal = {
    render: TemplateVoting.bind({}),
    name: 'Einfachauswahl Horizontal',
    args: fixtures.voting_horizontal.args,
}

export const Voting_Email = {
    render: TemplateVoting.bind({}),
    name: 'Einfachauswahl mit E-Mail',
    args: fixtures.voting_email.args,
}

export const Voting_Multiple_Choice = {
    render: TemplateVoting.bind({}),
    name: 'Mehrfachauswahl',
    args: fixtures.voting_multiple_choice.args,
}

export const voting_media_image_vertical = {
    render: TemplateVoting.bind({}),
    name: 'Mehrfachauswahl mit Bild Vertikal',
    args: fixtures.voting_media_image_vertical.args,
}

export const voting_media_image_horizontal = {
    render: TemplateVoting.bind({}),
    name: 'Mehrfachauswahl mit Bild Horizontal',
    args: fixtures.voting_media_image_horizontal.args,
}

export const voting_media_audio_horizontal = {
    render: TemplateVoting.bind({}),
    name: 'Mehrfachauswahl mit Audio Horizontal',
    args: fixtures.voting_media_audio_horizontal.args,
}

export const voting_media_audio_vertical = {
    render: TemplateVoting.bind({}),
    name: 'Mehrfachauswahl mit Audio Vertical',
    args: fixtures.voting_media_audio_vertical.args,
}

export const voting_media_video_vertical = {
    render: TemplateVoting.bind({}),
    name: 'Mehrfachauswahl mit Video Vertical',
    args: fixtures.voting_media_video_vertical.args,
}

export const voting_media_video_horizontal = {
    render: TemplateVoting.bind({}),
    name: 'Mehrfachauswahl mit Video Horizontal',
    args: fixtures.voting_media_video_horizontal.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',
    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}