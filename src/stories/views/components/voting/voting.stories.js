import votingJson from './fixtures/voting.json'
import votingOverJson from './fixtures/voting_over.json'
import votingMultipleChoiceJson from './fixtures/voting_multiple_choice.json'

const handlebars = require('hrHandlebars')

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
}
const Template = (args) => {
    let hbsTemplate = handlebars.compile(`
        {{#>components/forms/components/backgroundBox  }}  
            {{> components/voting/voting }}
        {{/components/forms/components/backgroundBox }}
    `)
    return hbsTemplate({ ...args })
}

export const Default = {
    render: Template.bind({}),
    name: 'Einfachauswahl',
    args: votingJson,
}

export const Voting_Multiple_Choice = {
    render: Template.bind({}),
    name: 'Mehrfachauswahl',
    args: votingMultipleChoiceJson,
}

export const Voting_Over = {
    render: Template.bind({}),
    name: 'Beeendet',
    args: votingOverJson,
}
