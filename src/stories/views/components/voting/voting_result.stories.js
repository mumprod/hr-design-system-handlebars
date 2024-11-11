import votingJson from './fixtures/voting.json'
import votingResultAbsoluteJson from './fixtures/voting_result_absolute.json'

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
        {{> components/voting/voting_result this 
                _isInline=true 
                _statusDone=true 
                _hideVotingResult=this.form.hideVotingResult 
                _resultBoxMessageTitle="Danke für ihre Teilnahme!" 
                _resultBoxMessageText=this.votingSuccessText.richtext
        }}        
    {{/components/forms/components/backgroundBox }}
  `)
    return hbsTemplate({ ...args })
}

export const Voting_Result = {
    render: Template.bind({}),
    name: 'Ergebnis Barchart prozentual',
    args: votingJson,
}

export const Voting_Result_Absolute = {
    render: Template.bind({}),
    name: 'Ergebnis Barchart absolut',
    args: votingResultAbsoluteJson,
}
