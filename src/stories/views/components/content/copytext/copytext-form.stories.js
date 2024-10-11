import copytext from './copytext.hbs'

import copytext_webform_json from './fixtures/copytext_webform.json'

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
                    "status":"VALIDATION_ERROR","errors":{"vorname":"form_error_required"},
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

