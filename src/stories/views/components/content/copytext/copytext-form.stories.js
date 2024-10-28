import copytext from './copytext.hbs'

import copytext_webform_json from './fixtures/copytext_webform.json'
import copytext_webform_simple_json from './fixtures/copytext_webform_simple.json'

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

export const WithWebform = {
    render: Template.bind({}),
    name: 'Formular',
    args: copytext_webform_json,
}
export const WithWebformStatusOk = {
    render: Template.bind({}),
    name: 'Formular Status OK',
    args: copytext_webform_simple_json,
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
export const WithWebformStatusNone = {
    render: Template.bind({}),
    name: 'Formular Status None',
    args: copytext_webform_simple_json,
    parameters: { 
        mockData: [
            {
                url: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de',
                method: 'POST',
                status: 200,
                response: {
                    "status":""
                },
            },
        ]
    }
}
export const WithWebformStatusValidationError = {
    render: Template.bind({}),
    name: 'Formular Status Validation Error',
    args: copytext_webform_simple_json,
    parameters: { 
        mockData: [
            {
                url: 'https://ugc-hessenschau.dev-ext.hrcms.gcp.cloud.hr.de',
                method: 'POST',
                status: 200,
                response: {
                     "status":"VALIDATION_ERROR", "errors":{"vorname":"form_error_required"}
                },
            },
        ]
    }
}
