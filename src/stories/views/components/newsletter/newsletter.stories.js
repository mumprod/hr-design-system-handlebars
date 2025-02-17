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
    parameters: { 
        fetchMock: {
            mocks: [
                {
                    matcher: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de',
                    response: {
                        status: 200,
                        body: {
                            status: 'success',
                        },
                    },
                }
            ],
        },
        layout: 'fullscreen',
        chromatic: { disableSnapshot: true }
    }
}
const TemplateNewsletter = (args) => {
    let hbsTemplate = handlebars.compile(`
            {{> components/newsletter/newsletter }}
    `)
    return hbsTemplate({ ...args })
}

export const Default = {
    render: TemplateNewsletter.bind({}),
    name: 'Newsletter',
    args: newsletterJson,
    parameters: { 
        fetchMock: {
            mocks: [
                {
                    matcher: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de',
                    response: {
                        status: 200,
                        message: 'success',
                        body: {
                            status: ''
                        },
                    },
                }
            ],
        }
    }
}



