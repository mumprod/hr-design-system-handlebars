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
                _hideVotingResult=this.form.hideVotingResult 
                _resultBoxMessageText=this.votingSuccessText.richtext
        }}        
    {{/components/forms/components/backgroundBox }}  
`)

hbsTemplates['success'] = handlebars.compile(`
    {{#>components/forms/components/backgroundBox  }}  
        {{> components/voting/voting_result this  
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
        mockData: [
            {
                url: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de/?rf=inline',
                method: 'POST',
                status: 200,
                response: {
                     "status":""
                },
            },
        ],
        layout: 'fullscreen',
        chromatic: { disableSnapshot: true }
    }
}

export const Default = {
    render: TemplateVoting.bind({}),
    name: 'Einfachauswahl',
    args: fixtures.voting.args,
    parameters: { 
        mockData: [
            {
                url: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de/?rf=inline',
                method: 'POST',
                status: 200,
                response: {
                     "status":"OK"
                },
            },
        ]
    }
}

export const Voting_Email = {
    render: TemplateVoting.bind({}),
    name: 'Einfachauswahl mit E-Mail und Successmeldung',
    args: fixtures.voting_email.args,
    parameters: { 
        mockData: [
            {
                url: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de/?rf=inline',
                method: 'POST',
                status: 200,
                response: {
                     "status":"OK"
                },
            },
        ]
    }
}

export const Voting_Media = {
    render: TemplateVoting.bind({}),
    name: 'Einfachauswahl mit Bild, Audio, Video',
    args: fixtures.voting_media.args,
    parameters: { 
        mockData: [
            {
                url: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de/?rf=inline',
                method: 'POST',
                status: 200,
                response: {
                     "status":"OK"
                },
            },
        ]
    }
}

export const Voting_Multiple_Choice = {
    render: TemplateVoting.bind({}),
    name: 'Mehrfachauswahl mit Fehlermeldung',
    args: fixtures.voting_multiple_choice.args,
}

export const Voting_Over = {
    render: TemplateVoting.bind({}),
    name: 'Beendet',
    args: fixtures.voting_over.args,
}

export const Voting_Result = {
    render: TemplateResult.bind({}),
    name: 'Ergebnis Barchart prozentual',
    args: fixtures.voting.args,
}

export const Voting_Result_Absolute = {
    render: TemplateResult.bind({}),
    name: 'Ergebnis Barchart absolut',
    args: fixtures.voting_result_absolute.args,
}

export const Snapshot = {
    render: snapshotTemplate.bind({}),
    name: 'Snapshot',
    args: fixtures,
    parameters: {
        chromatic: { disableSnapshot: false },
    }
}