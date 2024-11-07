import voting from './voting.hbs'
import votingJson from './fixtures/voting.json'
import votingOverJson from './fixtures/voting_over.json'
import votingMultipleChoiceJson from './fixtures/voting_multiple_choice.json'
import votingEmailJson from './fixtures/voting_email.json'
import votingMediaJson from './fixtures/voting_media.json'

const Template = ({ ...args }) => {
    return voting({ ...args })
}

export default {
    title: 'Komponenten/Voting',
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
                url: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de',
                method: 'POST',
                status: 200,
                response: {
                     "status":""
                    // "status":"OK"
                    // "status":"VALIDATION_ERROR", "errors":{"vorname":"form_error_required"}
                },
            },
        ],
        layout: 'fullscreen',
        chromatic: { disableSnapshot: true }
    }
}

export const Default = {
    render: Template.bind({}),
    name: 'Einfachauswahl',
    args: votingJson,
    parameters: { 
        mockData: [
            {
                url: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de',
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
    render: Template.bind({}),
    name: 'Einfachauswahl mit E-Mail',
    args: votingEmailJson,
    parameters: { 
        mockData: [
            {
                url: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de',
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
    render: Template.bind({}),
    name: 'Einfachauswahl mit Bild, Audio, Video',
    args: votingMediaJson,
}

export const Voting_Multiple_Choice = {
    render: Template.bind({}),
    name: 'Mehrfachauswahl',
    args: votingMultipleChoiceJson,
}

export const Voting_Over = {
    render: Template.bind({}),
    name: 'Beendet',
    args: votingOverJson,
}
