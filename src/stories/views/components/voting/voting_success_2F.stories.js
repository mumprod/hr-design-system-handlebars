import votingJson from './fixtures/voting.json'

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
    parameters: { 
        layout: 'fullscreen',
        chromatic: { disableSnapshot: true }
    }
}

const Template = (args) => {
    let hbsTemplate = handlebars.compile(`
    {{#>components/forms/components/backgroundBox  }}  
        {{> components/voting/voting_success_2F _title=this.title _topline=this.topline}}        
    {{/components/forms/components/backgroundBox }}
  `)
    return hbsTemplate({ ...args })
}

export const Voting_Success_2F = {
    render: Template.bind({}),
    name: 'Successmeldung',
    args: votingJson,
}
