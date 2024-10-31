import votingErrorJson from './fixtures/voting_error.json'

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
            {{> components/voting/voting_error }}
        {{/components/forms/components/backgroundBox }}
    `)
    return hbsTemplate({ ...args })
}

export const Voting_Error = {
    render: Template.bind({}),
    name: 'Fehlermeldung',
    args: votingErrorJson,
}
