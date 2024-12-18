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
    parameters: { 
        fetchMock: {
            mocks: [
                {
                    matcher: 'http://localhost:6006/',
                    response: {
                        status: 200,
                        body: {
                            status: 'no_valid_newsletters'
                        },
                    },
                }
            ],
        }
    }
}
const TemplateNewsletterNew = (args) => {
    let hbsTemplate = handlebars.compile(`
            {{> components/newsletter/newsletter }}
    `)
    return hbsTemplate({ ...args })
}

const TemplateNewsletterOld = (args) => {
    let hbsTemplate = handlebars.compile(`
            {{> components/newsletter/newsletter }}
    `)
    return hbsTemplate({ ...args })
}

export const Default = {
    render: TemplateNewsletterNew.bind({}),
    name: 'Neuer Newsletter',
    args: NewNewsletterJson,
    parameters: { 
        fetchMock: {
            mocks: [
                {
                    matcher: 'http://localhost:6006/',
                    response: {
                        status: 200,
                        body: {
                            status: 'no_valid_newsletters'
                        },
                    },
                }
            ],
        }
    }
}

export const Newsletter_old = {
    render: TemplateNewsletterOld.bind({}),
    name: 'Alter Newsletter',
    args: OldNewsletterJson,
}


