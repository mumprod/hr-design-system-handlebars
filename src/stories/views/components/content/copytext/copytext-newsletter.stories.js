import copytext from './copytext.hbs'
import copytext_newsletter_json from './fixtures/copytext_newsletter.json'

const Template = ({ ...args }) => {
    return copytext({ ...args })
}

export default {
    title: 'Komponenten/Content/Copytext',
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
                            status: '',
                        },
                    },
                },
            ],
        },
        layout: 'fullscreen',
        chromatic: { disableSnapshot: true },
    },
}
export const WithNewsletterOK = {
    render: Template.bind({}),
    name: 'Newsletter OK',
    args: copytext_newsletter_json,
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
                },
            ],
        },
    },
}

export const WithNewsletterAlreadyRegistered = {
    render: Template.bind({}),
    name: 'Newsletter Already Registered',
    args: copytext_newsletter_json,
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de',
                    response: {
                        status: 200,
                        body: {
                            status: 'no_valid_newsletters',
                        },
                    },
                },
            ],
        },
    },
}
export const WithNewsletterError = {
    render: Template.bind({}),
    name: 'Newsletter Error',
    args: copytext_newsletter_json,
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de',
                    response: {
                        status: 200,
                        body: {
                            status: '',
                        },
                    },
                },
            ],
        },
    },
}
