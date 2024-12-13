import NewNewsletterJson from './fixtures/new_newsletter.json'
import OldNewsletterJson from './fixtures/newsletter.json'

const handlebars = require('hrHandlebars')

export default {
    title: 'Komponenten/Newsletter',
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
const TemplateNewsletterNew = (args) => {
    let hbsTemplate = handlebars.compile(`
        {{#>components/forms/components/backgroundBox  }}  
            {{> components/newsletter/newsletter }}
        {{/components/forms/components/backgroundBox }}
    `)
    return hbsTemplate({ ...args })
}

const TemplateNewsletterOld = (args) => {
    let hbsTemplate = handlebars.compile(`
        {{#>components/forms/components/backgroundBox  }}  
            {{> components/newsletter/newsletter }}
        {{/components/forms/components/backgroundBox }}
    `)
    return hbsTemplate({ ...args })
}

export const Default = {
    render: TemplateNewsletterNew.bind({}),
    name: 'Neuer Newsletter',
    args: NewNewsletterJson,
}

export const Newsletter_old = {
    render: TemplateNewsletterOld.bind({}),
    name: 'Alter Newsletter',
    args: OldNewsletterJson,
}


