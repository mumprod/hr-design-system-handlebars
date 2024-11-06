import newsletterJson from './fixtures/newsletter.json'

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
const Template = (args) => {
    let hbsTemplate = handlebars.compile(`
        {{#>components/forms/components/backgroundBox  }}  
            {{> components/newsletter/newsletter }}
        {{/components/forms/components/backgroundBox }}
    `)
    return hbsTemplate({ ...args })
}

export const Default = {
    render: Template.bind({}),
    name: 'Newsletter',
    args: newsletterJson,
}


